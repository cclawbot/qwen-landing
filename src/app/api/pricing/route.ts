import { NextResponse } from 'next/server';
import type { PricingResponse } from '@/types/pricing';

export const dynamic = 'force-static';

const pricingData: PricingResponse = {
  lastUpdated: new Date().toISOString(),
  models: [
    // Flagship / Thinking Models
    {
      id: 'gpt-5.4-pro',
      name: 'GPT-5.4 Pro',
      category: 'flagship',
      inputPrice: 30.00,
      outputPrice: 180.00,
      status: 'standard',
      competitorInput: 30.00,
      competitorOutput: 180.00,
      competitorName: 'OpenAI',
    },
    {
      id: 'claude-opus-4.6',
      name: 'Claude Opus 4.6',
      category: 'flagship',
      inputPrice: 5.00,
      outputPrice: 25.00,
      status: 'standard',
      competitorInput: 5.00,
      competitorOutput: 25.00,
      competitorName: 'Anthropic',
    },
    {
      id: 'qwen-plus-0728',
      name: 'Qwen Plus (0728)',
      category: 'flagship',
      inputPrice: 0.26,
      outputPrice: 0.78,
      status: 'available',
      competitorInput: 30.00,
      competitorOutput: 180.00,
      competitorName: 'OpenAI',
    },
    // Standard / Mid-tier
    {
      id: 'claude-sonnet-4.6',
      name: 'Claude Sonnet 4.6',
      category: 'standard',
      inputPrice: 3.00,
      outputPrice: 15.00,
      status: 'standard',
      competitorInput: 3.00,
      competitorOutput: 15.00,
      competitorName: 'Anthropic',
    },
    {
      id: 'gpt-5.1',
      name: 'GPT-5.1',
      category: 'standard',
      inputPrice: 1.25,
      outputPrice: 10.00,
      status: 'standard',
      competitorInput: 1.25,
      competitorOutput: 10.00,
      competitorName: 'OpenAI',
    },
    {
      id: 'qwen-turbo',
      name: 'Qwen Turbo',
      category: 'standard',
      inputPrice: 0.30,
      outputPrice: 0.60,
      status: 'available',
      competitorInput: 1.25,
      competitorOutput: 10.00,
      competitorName: 'OpenAI',
    },
    // Lightweight / Fast
    {
      id: 'claude-haiku-4.5',
      name: 'Claude Haiku 4.5',
      category: 'lightweight',
      inputPrice: 1.00,
      outputPrice: 5.00,
      status: 'standard',
      competitorInput: 1.00,
      competitorOutput: 5.00,
      competitorName: 'Anthropic',
    },
    {
      id: 'gpt-5-nano',
      name: 'GPT-5 Nano',
      category: 'lightweight',
      inputPrice: 0.05,
      outputPrice: 0.40,
      status: 'standard',
      competitorInput: 0.05,
      competitorOutput: 0.40,
      competitorName: 'OpenAI',
    },
    {
      id: 'qwen-flash',
      name: 'Qwen Flash',
      category: 'lightweight',
      inputPrice: 0.10,
      outputPrice: 0.40,
      status: 'available',
      competitorInput: 0.05,
      competitorOutput: 0.40,
      competitorName: 'OpenAI',
    },
  ],
};

export async function GET() {
  // Simulate network delay for realistic loading state
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(pricingData, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
