export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates a URL string for use in website auditing.
 * Checks for valid protocol, domain format, and rejects localhost/private addresses.
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required' };
  }

  const trimmed = url.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'URL is required' };
  }

  // Add protocol if missing for validation purposes
  let urlWithProtocol = trimmed;
  if (!urlWithProtocol.startsWith('http://') && !urlWithProtocol.startsWith('https://')) {
    urlWithProtocol = 'https://' + urlWithProtocol;
  }

  // Only allow http and https
  if (!urlWithProtocol.startsWith('http://') && !urlWithProtocol.startsWith('https://')) {
    return { valid: false, error: 'URL must use http or https protocol' };
  }

  let parsed: URL;
  try {
    parsed = new URL(urlWithProtocol);
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }

  // Reject localhost and private addresses
  const hostname = parsed.hostname.toLowerCase();
  const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
  if (blockedHosts.includes(hostname)) {
    return { valid: false, error: 'Localhost URLs are not allowed' };
  }

  // Reject private IP ranges
  const privateIpPatterns = [
    /^10\./,
    /^172\.(1[6-9]|2\d|3[01])\./,
    /^192\.168\./,
  ];
  if (privateIpPatterns.some(pattern => pattern.test(hostname))) {
    return { valid: false, error: 'Private network URLs are not allowed' };
  }

  // Must have a valid domain with at least one dot (e.g., example.com)
  if (!hostname.includes('.')) {
    return { valid: false, error: 'URL must have a valid domain (e.g., example.com)' };
  }

  return { valid: true };
}

/**
 * Validates an email address using RFC 5322 compliant regex.
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const trimmed = email.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Email is required' };
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true };
}

/**
 * Normalizes a URL by adding https:// if missing, removing trailing slashes,
 * and lowercasing the domain.
 */
export function normalizeUrl(url: string): string {
  let normalized = url.trim();

  // Add https:// if no protocol
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = 'https://' + normalized;
  }

  // Parse and rebuild to normalize
  try {
    const parsed = new URL(normalized);
    // Lowercase the hostname
    parsed.hostname = parsed.hostname.toLowerCase();
    // Rebuild: URL constructor handles normalization
    normalized = parsed.toString();
  } catch {
    // If parsing fails, just do basic normalization
    normalized = normalized.toLowerCase();
  }

  // Remove trailing slash
  if (normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}
