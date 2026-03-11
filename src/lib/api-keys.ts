import { randomBytes, createHash } from 'crypto';

/**
 * Generate a secure random API key
 * Format: qk_ prefix followed by 24 char keyId and 32 char keySecret
 */
export function generateApiKey(): { keyId: string; keySecret: string } {
  const keyId = `qk_${randomBytes(12).toString('hex')}`;
  const keySecret = randomBytes(16).toString('hex');
  
  return { keyId, keySecret };
}

/**
 * Hash an API key secret for storage
 */
export function hashApiKeySecret(secret: string): string {
  return createHash('sha256').update(secret).digest('hex');
}

/**
 * Verify an API key secret against a hash
 */
export function verifyApiKeySecret(secret: string, hash: string): boolean {
  return hashApiKeySecret(secret) === hash;
}

/**
 * Format API key for display (shows full key once to user)
 * Format: {keyId}_{keySecret}
 */
export function formatApiKey(keyId: string, keySecret: string): string {
  return `${keyId}_${keySecret}`;
}

/**
 * Parse API key from Authorization header
 * Expected format: X-API-Key: qk_xxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 */
export function parseApiKeyHeader(authHeader: string | null | undefined): { keyId: string; keySecret: string } | null {
  if (!authHeader) return null;
  
  // Support both "X-API-Key" header format and "Bearer" format
  const key = (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader);
  
  const parts = key.split('_');
  if (parts.length < 3) return null;
  
  // Format: qk_xxxxxxxxxxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  // We need to find where keyId ends and keySecret begins
  // keyId starts with "qk_" and is 26 chars total (qk_ + 24 hex)
  if (parts[0] !== 'qk' || parts[1].length !== 24) return null;
  
  const keyId = `qk_${parts[1]}`;
  const keySecret = parts.slice(2).join('_');
  
  if (keySecret.length !== 32) return null;
  
  return { keyId, keySecret };
}
