import { NextResponse } from 'next/server';
import type { PricingResponse } from '@/types/pricing';

export const dynamic = 'force-static';

const pricingData: PricingResponse = {
  lastUpdated: new Date().toISOString(),
  models: [
    // Flagship / Thinking Models
    {
      id: 'qwen-max',
      name: 'Qwen Max',
      category: 'flagship',
      inputPrice: 2.00,
      outputPrice: 8.00,
      status: 'available',
      competitorInput: 30.00,
      competitorOutput: 180.00,
      competitorName: 'GPT-5.4 Pro',
    },
    {
      id: 'qwen-reasoning-r1',
      name: 'Qwen Reasoning (r1)',
      category: 'flagship',
      inputPrice: 0.70,
      outputPrice: 2.80,
      status: 'available',
      competitorInput: 5.00,
      competitorOutput: 25.00,
      competitorName: 'Claude Opus 4.6',
    },
    // Standard / Mid-tier
    {
      id: 'qwen-plus',
      name: 'Qwen Plus',
      category: 'standard',
      inputPrice: 0.40,
      outputPrice: 1.60,
      status: 'available',
      competitorInput: 1.25,
      competitorOutput: 10.00,
      competitorName: 'GPT-5.1',
    },
    // Lightweight / Fast
    {
      id: 'qwen-turbo',
      name: 'Qwen Turbo',
      category: 'lightweight',
      inputPrice: 0.15,
      outputPrice: 0.60,
      status: 'available',
      competitorInput: 0.25,
      competitorOutput: 2.00,
      competitorName: 'GPT-5 Mini',
    },
  ],
};

export async function GET() {
  return NextResponse.json(pricingData, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
