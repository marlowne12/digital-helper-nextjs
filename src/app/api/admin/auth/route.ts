import { NextRequest, NextResponse } from 'next/server';
import {
  createSessionToken,
  createSessionCookie,
  createClearSessionCookie,
  hashAdminPassword,
  validateSessionToken,
  parseSessionToken,
} from '@/lib/admin-auth';

// The admin password from environment variable
const ADMIN_PASSWORD = process.env.CONTENT_ADMIN_PASSWORD || '';

// Cached hash of the admin password (computed once)
let cachedPasswordHash: string | null = null;

/**
 * Gets the stored password hash, computing and caching it if necessary
 */
async function getPasswordHash(): Promise<string> {
  if (cachedPasswordHash) {
    return cachedPasswordHash;
  }

  if (!ADMIN_PASSWORD) {
    throw new Error('CONTENT_ADMIN_PASSWORD environment variable is not set');
  }

  cachedPasswordHash = await hashAdminPassword(ADMIN_PASSWORD);
  return cachedPasswordHash;
}

/**
 * POST /api/admin/auth/login
 * Authenticates the user and creates a session
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, action } = body;

    // Handle logout
    if (action === 'logout') {
      return NextResponse.json(
        { success: true, message: 'Logged out successfully' },
        {
          headers: {
            'Set-Cookie': createClearSessionCookie(),
          },
        }
      );
    }

    // Handle login
    if (action === 'login') {
      if (!password || typeof password !== 'string') {
        return NextResponse.json(
          { success: false, error: 'Password is required' },
          { status: 400 }
        );
      }

      // Check for empty password in env
      if (!ADMIN_PASSWORD) {
        console.error('[Admin Auth] CONTENT_ADMIN_PASSWORD is not set');
        return NextResponse.json(
          { success: false, error: 'Server configuration error' },
          { status: 500 }
        );
      }

      const storedHash = await getPasswordHash();

      // Verify password
      const { verifyPassword } = await import('@/lib/admin-auth');
      const isValid = await verifyPassword(password, storedHash);

      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'Invalid password' },
          { status: 401 }
        );
      }

      // Create session token
      const sessionToken = await createSessionToken(storedHash);

      return NextResponse.json(
        { success: true, message: 'Login successful' },
        {
          headers: {
            'Set-Cookie': createSessionCookie(sessionToken),
          },
        }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[Admin Auth] Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/auth/verify
 * Verifies the current session is valid
 */
export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { valid: false, error: 'No session found' },
        { status: 401 }
      );
    }

    // Parse session token to check basic validity
    const sessionData = parseSessionToken(sessionToken);

    if (!sessionData) {
      return NextResponse.json(
        { valid: false, error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Full validation against password hash
    const storedHash = await getPasswordHash();
    const isValid = await validateSessionToken(sessionToken, storedHash);

    if (!isValid) {
      return NextResponse.json(
        { valid: false, error: 'Session expired or invalid' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      expires: sessionData.expires,
    });
  } catch (error) {
    console.error('[Admin Auth] Verify error:', error);
    return NextResponse.json(
      { valid: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/auth/logout
 * Logs out the user by clearing the session cookie
 */
export async function DELETE() {
  return NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    {
      headers: {
        'Set-Cookie': createClearSessionCookie(),
      },
    }
  );
}
