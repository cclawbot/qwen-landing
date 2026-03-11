import { NextRequest, NextResponse } from 'next/server';
import { getUserId } from '@/lib/auth/middleware';
import { revokeApiKey, getApiKeyByKeyId } from '@/lib/db/api-keys';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id: keyId } = await params;

    // First check if the key exists and belongs to the user
    const existingKey = await getApiKeyByKeyId(keyId);
    if (!existingKey) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    if (existingKey.userId !== userId) {
      return NextResponse.json(
        { error: 'Not authorized to revoke this API key' },
        { status: 403 }
      );
    }

    // Revoke the key
    const revoked = await revokeApiKey(keyId, userId);
    
    if (!revoked) {
      return NextResponse.json(
        { error: 'API key already revoked or does not exist' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'API key revoked successfully',
      keyId: existingKey.keyId,
    });
  } catch (error) {
    console.error('Error revoking API key:', error);
    return NextResponse.json(
      { error: 'Failed to revoke API key' },
      { status: 500 }
    );
  }
}
