import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, getAuthCookies } from '@/lib/auth';

export async function authMiddleware(request: NextRequest) {
  const { accessToken } = await getAuthCookies();
  
  if (!accessToken) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  try {
    const payload = verifyAccessToken(accessToken);
    // Attach user to request headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-email', payload.email);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}

// Helper to get user ID from request in routes
export function getUserId(request: NextRequest): string | null {
  return request.headers.get('x-user-id');
}
