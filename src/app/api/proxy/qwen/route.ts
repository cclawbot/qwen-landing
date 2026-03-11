import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/db/api-keys';
import { logUsage } from '@/lib/db/usage';
import { parseApiKeyHeader } from '@/lib/api-keys';

// Qwen API configuration
const QWEN_API_BASE = process.env.QWEN_API_BASE || 'https://dashscope.aliyuncs.com/api/v1';
const QWEN_API_KEY = process.env.QWEN_API_KEY;

// POST /api/proxy/qwen - Proxy requests to Qwen API
export async function POST(request: NextRequest) {
  try {
    // Validate API key from header
    const apiKeyHeader = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
    const parsedKey = parseApiKeyHeader(apiKeyHeader);
    
    if (!parsedKey) {
      return NextResponse.json(
        { error: 'Invalid API key format. Use X-API-Key header with format qk_xxxxxxxx_xxxxxxxx' },
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

    // Check user is active
    if (validation.user.status !== 'active') {
      return NextResponse.json(
        { error: 'Account is suspended' },
        { status: 403 }
      );
    }

    // Get the request body
    const body = await request.json();
    
    // Extract model from request (support both formats)
    const model = body.model || body.model_name || 'qwen-max';
    
    // Extract tokens for usage tracking
    const inputTokens = body.input?.length ? body.input.length : 
                        (body.messages?.reduce((acc: number, m: { content: string | number }) => acc + String(m.content).length, 0) || 0);
    const outputTokens = 0; // Will be updated if stream or response has usage

    // Forward request to Qwen API
    const startTime = Date.now();
    
    const qwenResponse = await fetch(`${QWEN_API_BASE}/services/aigc/text-generation/generation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${QWEN_API_KEY}`,
        'Content-Type': 'application/json',
        'X-DashScope-Async': 'disable', // Synchronous for simplicity
      },
      body: JSON.stringify({
        model,
        input: body.input,
        parameters: body.parameters || body.gen_config || {},
      }),
    });

    const latencyMs = Date.now() - startTime;

    if (!qwenResponse.ok) {
      const errorText = await qwenResponse.text();
      console.error('Qwen API error:', qwenResponse.status, errorText);
      
      // Log failed request
      await logUsage(validation.key.id, model, inputTokens, 0, latencyMs);
      
      return NextResponse.json(
        { error: 'Upstream API error', details: errorText },
        { status: qwenResponse.status }
      );
    }

    const responseData = await qwenResponse.json();
    
    // Extract output tokens from response
    const responseOutputTokens = responseData.output?.text?.length || 
                                 responseData.output?.choices?.[0]?.message?.content?.length || 0;
    
    // Log successful usage
    await logUsage(
      validation.key.id,
      model,
      Math.ceil(inputTokens / 4), // Rough token estimate
      Math.ceil(responseOutputTokens / 4),
      latencyMs
    );

    // Return response to client
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error in Qwen proxy:', error);
    return NextResponse.json(
      { error: 'Proxy error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET /api/proxy/qwen - Health check / model list
export async function GET(request: NextRequest) {
  try {
    // Validate API key (optional for health check)
    const apiKeyHeader = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
    let isAuthenticated = false;
    
    if (apiKeyHeader) {
      const parsedKey = parseApiKeyHeader(apiKeyHeader);
      if (parsedKey) {
        const validation = await validateApiKey(parsedKey.keyId);
        if (validation) {
          const { verifyApiKeySecret } = await import('@/lib/api-keys');
          isAuthenticated = verifyApiKeySecret(parsedKey.keySecret, validation.key.keySecretHash);
        }
      }
    }

    // Return available models
    const models = [
      { id: 'qwen-max', name: 'Qwen Max', context: 32 * 1024, description: 'Most capable model' },
      { id: 'qwen-plus', name: 'Qwen Plus', context: 32 * 1024, description: 'Balanced performance' },
      { id: 'qwen-turbo', name: 'Qwen Turbo', context: 8 * 1024, description: 'Fastest response' },
    ];

    return NextResponse.json({
      models,
      authenticated: isAuthenticated,
      apiVersion: 'v1',
    });
  } catch (error) {
    console.error('Error in Qwen proxy GET:', error);
    return NextResponse.json(
      { error: 'Proxy error' },
      { status: 500 }
    );
  }
}
