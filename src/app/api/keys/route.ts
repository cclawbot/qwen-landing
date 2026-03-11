import { NextRequest, NextResponse } from 'next/server';
import { getUserId } from '@/lib/auth/middleware';
import { getApiKeysByUserId, createApiKey } from '@/lib/db/api-keys';
import { generateApiKey, hashApiKeySecret, formatApiKey } from '@/lib/api-keys';
import { createApiKeySchema, validateRequest } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const keys = await getApiKeysByUserId(userId);
    
    return NextResponse.json({ keys });
  } catch (error) {
    console.error('Error listing API keys:', error);
    return NextResponse.json(
      { error: 'Failed to list API keys' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = validateRequest(createApiKeySchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { name } = validation.data;

    // Generate new API key
    const { keyId, keySecret } = generateApiKey();
    const keySecretHash = hashApiKeySecret(keySecret);

    // Store in database
    const newKey = await createApiKey(userId, name || null, keyId, keySecretHash);

    // Return the full key to the user (only once!)
    const fullKey = formatApiKey(keyId, keySecret);
    
    return NextResponse.json({
      key: {
        id: newKey.id,
        keyId: newKey.keyId,
        name: newKey.name,
        createdAt: newKey.createdAt,
        expiresAt: newKey.expiresAt,
      },
      secret: fullKey,
      message: 'Store this secret securely. You will not be able to see it again.',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}
