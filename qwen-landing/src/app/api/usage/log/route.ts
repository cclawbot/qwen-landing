import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/db/api-keys';
import { logUsage } from '@/lib/db/usage';
import { parseApiKeyHeader } from '@/lib/api-keys';
import { validateRequest, logUsageSchema } from '@/lib/validation';

// POST /api/usage/log - Log API usage (internal, called by proxy)
export async function POST(request: NextRequest) {
  try {
    // Validate API key from header
    const apiKeyHeader = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
    const parsedKey = parseApiKeyHeader(apiKeyHeader);
    
    if (!parsedKey) {
      return NextResponse.json(
        { error: 'Invalid API key format' },
        { status: 401 }
      );
    }

    // Validate the key and get the user
    const validation = await validateApiKey(parsedKey.keyId);
    if (!validation) {
      return NextResponse.json(
        { error: 'Invalid or revoked API key' },
        { status: 401 }
      );
    }

    // Verify the secret matches
    const { verifyApiKeySecret } = await import('@/lib/api-keys');
    const isValid = verifyApiKeySecret(parsedKey.keySecret, validation.key.keySecretHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    // Parse and validate usage data
    const body = await request.json();
    const validationResult = validateRequest(logUsageSchema, body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error },
        { status: 400 }
      );
    }

    const { model, tokens, latency } = validationResult.data;
    const inputTokens = body.inputTokens || tokens || 0;
    const outputTokens = body.outputTokens || 0;
    const latencyMs = latency || body.latencyMs;

    // Log the usage
    const log = await logUsage(
      validation.key.id,
      model,
      inputTokens,
      outputTokens,
      latencyMs
    );

    return NextResponse.json({
      success: true,
      logId: log.id,
    }, { status: 201 });
  } catch (error) {
    console.error('Error logging usage:', error);
    return NextResponse.json(
      { error: 'Failed to log usage' },
      { status: 500 }
    );
  }
}
