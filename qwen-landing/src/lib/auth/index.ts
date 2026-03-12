import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';
const SALT_ROUNDS = 12;

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate access and refresh tokens
 */
export function generateTokens(payload: TokenPayload): AuthTokens {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
  return { accessToken, refreshToken };
}

/**
 * Verify an access token
 */
export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

/**
 * Verify a refresh token
 */
export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

/**
 * Set auth cookies (access + refresh)
 */
export async function setAuthCookies(tokens: AuthTokens): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.set('access_token', tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60, // 15 minutes
    path: '/qwen-landing/',
  });
  
  cookieStore.set('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/qwen-landing/',
  });
}

/**
 * Clear auth cookies
 */
export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}

/**
 * Get auth tokens from cookies
 */
export async function getAuthCookies(): Promise<{ accessToken?: string; refreshToken?: string }> {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get('access_token')?.value,
    refreshToken: cookieStore.get('refresh_token')?.value,
  };
}

/**
 * Get current user from cookies (for use in Server Components)
 */
export async function getCurrentUser(): Promise<TokenPayload | null> {
  const { accessToken } = await getAuthCookies();
  
  if (!accessToken) {
    return null;
  }
  
  try {
    return verifyAccessToken(accessToken);
  } catch {
    return null;
  }
}
