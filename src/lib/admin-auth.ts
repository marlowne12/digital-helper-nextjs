/**
 * Admin Authentication Library
 *
 * Provides secure password hashing and session management using Web Crypto API.
 * Uses PBKDF2 for password hashing with HMAC-SHA-256.
 */

// Session configuration
export const SESSION_COOKIE_NAME = 'admin_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds
const PBKDF2_ITERATIONS = 100000;
const SALT_LENGTH = 16;
const HASH_LENGTH = 32;

/**
 * Session data structure
 */
export interface SessionData {
  hash: string; // Hex-encoded hash of password + salt
  expires: number; // Unix timestamp
  salt: string; // Hex-encoded salt
}

/**
 * Generates a random salt for password hashing
 */
async function generateSalt(): Promise<string> {
  const saltBuffer = new Uint8Array(SALT_LENGTH);
  crypto.getRandomValues(saltBuffer);
  return bufferToHex(saltBuffer);
}

/**
 * Converts a buffer to a hex string
 */
function bufferToHex(buffer: Uint8Array): string {
  return Array.from(buffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converts a hex string to a buffer
 */
function hexToBuffer(hex: string): Uint8Array {
  const pairs = hex.match(/.{1,2}/g) || [];
  return new Uint8Array(pairs.map(pair => parseInt(pair, 16)));
}

/**
 * Hashes a password with the given salt using PBKDF2
 */
async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = hexToBuffer(salt);

  const importedKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    importedKey,
    HASH_LENGTH * 8 // Output length in bits
  ) as ArrayBuffer;

  return bufferToHex(new Uint8Array(derivedBits));
}

/**
 * Creates a session token from a password hash
 */
export async function createSessionToken(passwordHash: string): Promise<string> {
  const salt = await generateSalt();
  const sessionHash = await hashPassword(passwordHash, salt);
  const expires = Date.now() + SESSION_MAX_AGE * 1000;

  const sessionData: SessionData = {
    hash: sessionHash,
    expires,
    salt,
  };

  // Encode as base64 for cookie storage
  const json = JSON.stringify(sessionData);
  return btoa(json);
}

/**
 * Validates a session token against the stored password hash
 */
export async function validateSessionToken(
  token: string,
  passwordHash: string
): Promise<boolean> {
  try {
    const decoded = atob(token);
    const sessionData: SessionData = JSON.parse(decoded);

    // Check expiration
    if (Date.now() > sessionData.expires) {
      return false;
    }

    // Re-hash the stored password hash with the session's salt
    const expectedHash = await hashPassword(passwordHash, sessionData.salt);

    // Constant-time comparison to prevent timing attacks
    return constantTimeCompare(expectedHash, sessionData.hash);
  } catch {
    return false;
  }
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Hashes the admin password for storage/comparison
 * Uses a static salt for the stored hash (different from session salt)
 */
export async function hashAdminPassword(password: string): Promise<string> {
  // Use a static salt for the stored password hash
  // This is combined with the password to create a consistent hash
  const staticSalt = 'digital-helper-admin-salt-v1';
  return hashPassword(password, staticSalt);
}

/**
 * Verifies a password against the stored hash
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  const passwordHash = await hashAdminPassword(password);
  return constantTimeCompare(passwordHash, storedHash);
}

/**
 * Parses and validates a session token
 * Returns the session data if valid, null otherwise
 */
export function parseSessionToken(token: string): SessionData | null {
  try {
    const decoded = atob(token);
    const sessionData: SessionData = JSON.parse(decoded);

    // Validate structure
    if (!sessionData.hash || !sessionData.expires || !sessionData.salt) {
      return null;
    }

    // Check expiration
    if (Date.now() > sessionData.expires) {
      return null;
    }

    return sessionData;
  } catch {
    return null;
  }
}

/**
 * Creates a Set-Cookie header value for the session
 */
export function createSessionCookie(token: string): string {
  const expires = new Date(Date.now() + SESSION_MAX_AGE * 1000);
  return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=${expires.toUTCString()}`;
}

/**
 * Creates a Set-Cookie header value to clear the session
 */
export function createClearSessionCookie(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
