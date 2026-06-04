import { NextRequest, NextResponse } from 'next/server';

// Paths that require admin authentication
const PROTECTED_ADMIN_PATHS = ['/admin/content-generator'];

// Public admin paths (no auth required)
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

// Session cookie configuration
const SESSION_COOKIE_NAME = 'admin_session';

/**
 * Validates a session token against the expected format
 * Session tokens are base64-encoded JSON objects with: { hash, expires, salt }
 */
function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const decoded = atob(token);
    const session = JSON.parse(decoded);

    // Check required fields
    if (!session.hash || !session.expires || !session.salt) return false;

    // Check expiration
    if (Date.now() > session.expires) return false;

    return true;
  } catch {
    return false;
  }
}

/**
 * Middleware to protect admin routes
 * - Redirects unauthenticated users to /admin/login
 * - Redirects authenticated users away from login page
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is an admin route
  const isAdminRoute = pathname.startsWith('/admin');
  const isProtectedRoute = PROTECTED_ADMIN_PATHS.some(path =>
    pathname.startsWith(path)
  );
  const isPublicAdminRoute = PUBLIC_ADMIN_PATHS.some(path =>
    pathname.startsWith(path)
  );

  // Skip non-admin routes
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Get session cookie
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = isValidSessionToken(sessionToken);

  // Redirect authenticated users away from login page
  if (isAuthenticated && isPublicAdminRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/content-generator';
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/**
 * Configure which paths the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
