import { NextResponse } from 'next/server';
import type { PricingResponse, PricingModel } from '@/types/pricing';

// Fallback static data (current accurate competitor pricing)
const FALLBACK_DATA: PricingResponse = {
  lastUpdated: new Date().toISOString(),
  models: [
    {
      id: 'qwen-max',
      name: 'Qwen Max',
      category: 'flagship',
      inputPrice: 2.00,
      outputPrice: 8.00,
      status: 'available',
      competitorInput: 2.50,
      competitorOutput: 15.00,
      competitorName: 'GPT-5.4',
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
    {
      id: 'qwen-plus',
      name: 'Qwen Plus',
      category: 'standard',
      inputPrice: 0.40,
      outputPrice: 1.60,
      status: 'available',
      competitorInput: 2.50,
      competitorOutput: 15.00,
      competitorName: 'GPT-5.4',
    },
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

// Parse price from text like "$2.50 / 1M tokens" -> 2.50
function parsePrice(text: string): number | null {
  const match = text.match(/\$?([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
}

async function fetchOpenAIPricing(): Promise<Record<string, { input: number; output: number }>> {
  try {
    const res = await fetch('https://openai.com/api/pricing/', { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const html = await res.text();
    
    const pricing: Record<string, { input: number; output: number }> = {};
    
    // GPT-5.4
    const gpt54Match = html.match(/GPT-5\.4[\s\S]*?Input.*?\$([\d.]+).*?Output.*?\$([\d.]+)/);
    if (gpt54Match) {
      pricing['GPT-5.4'] = { input: parseFloat(gpt54Match[1]), output: parseFloat(gpt54Match[2]) };
      pricing['GPT-5.4 Pro'] = { input: parseFloat(gpt54Match[1]), output: parseFloat(gpt54Match[2]) };
    }
    
    // GPT-5 mini
    const miniMatch = html.match(/GPT-5 mini[\s\S]*?Input.*?\$([\d.]+).*?Output.*?\$([\d.]+)/);
    if (miniMatch) {
      pricing['GPT-5 Mini'] = { input: parseFloat(miniMatch[1]), output: parseFloat(miniMatch[2]) };
    }
    
    // GPT-5.1 (if exists)
    const gpt51Match = html.match(/GPT-5[\d.]*[\s\S]*?Input.*?\$([\d.]+).*?Output.*?\$([\d.]+)/g);
    if (gpt51Match && gpt51Match.length > 1) {
      const match = gpt51Match[1].match(/\$?([\d.]+).*?\$?([\d.]+)/);
      if (match) {
        pricing['GPT-5.1'] = { input: parseFloat(match[1]), output: parseFloat(match[2]) };
      }
    }
    
    return pricing;
  } catch (e) {
    console.error('Failed to fetch OpenAI pricing:', e);
    return {};
  }
}

async function fetchAnthropicPricing(): Promise<Record<string, { input: number; output: number }>> {
  try {
    const res = await fetch('https://claude.com/pricing', { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    const html = await res.text();
    
    const pricing: Record<string, { input: number; output: number }> = {};
    
    // Claude Opus 4.6
    const opus46Match = html.match(/Opus 4\.6[\s\S]*?Input[\s\S]*?\$([\d.]+).*?Output[\s\S]*?\$([\d.]+)/);
    if (opus46Match) {
      pricing['Claude Opus 4.6'] = { input: parseFloat(opus46Match[1]), output: parseFloat(opus46Match[2]) };
    }
    
    // Claude Sonnet 4.6
    const sonnet46Match = html.match(/Sonnet 4\.6[\s\S]*?Input[\s\S]*?\$([\d.]+).*?Output[\s\S]*?\$([\d.]+)/);
    if (sonnet46Match) {
      pricing['Claude Sonnet 4.6'] = { input: parseFloat(sonnet46Match[1]), output: parseFloat(sonnet46Match[2]) };
    }
    
    // Claude Haiku 4.5
    const haiku45Match = html.match(/Haiku 4\.5[\s\S]*?Input[\s\S]*?\$([\d.]+).*?Output[\s\S]*?\$([\d.]+)/);
    if (haiku45Match) {
      pricing['Claude Haiku 4.5'] = { input: parseFloat(haiku45Match[1]), output: parseFloat(haiku45Match[2]) };
    }
    
    return pricing;
  } catch (e) {
    console.error('Failed to fetch Anthropic pricing:', e);
    return {};
  }
}

export async function GET() {
  try {
    // Fetch live competitor pricing in parallel
    const [openAI, anthropic] = await Promise.all([
      fetchOpenAIPricing().catch(() => ({})),
      fetchAnthropicPricing().catch(() => ({}))
    ]);
    
    const competitorPricing = { ...openAI, ...anthropic };
    const hasLiveData = Object.keys(competitorPricing).length > 0;
    
    // Build models with live or fallback data
    const models: PricingModel[] = [
      {
        id: 'qwen-max',
        name: 'Qwen Max',
        category: 'flagship',
        inputPrice: 2.00,
        outputPrice: 8.00,
        status: 'available',
        competitorInput: competitorPricing['GPT-5.4']?.input || competitorPricing['GPT-5.4 Pro']?.input || 2.50,
        competitorOutput: competitorPricing['GPT-5.4']?.output || competitorPricing['GPT-5.4 Pro']?.output || 15.00,
        competitorName: 'GPT-5.4',
      },
      {
        id: 'qwen-reasoning-r1',
        name: 'Qwen Reasoning (r1)',
        category: 'flagship',
        inputPrice: 0.70,
        outputPrice: 2.80,
        status: 'available',
        competitorInput: competitorPricing['Claude Opus 4.6']?.input || 5.00,
        competitorOutput: competitorPricing['Claude Opus 4.6']?.output || 25.00,
        competitorName: 'Claude Opus 4.6',
      },
      {
        id: 'qwen-plus',
        name: 'Qwen Plus',
        category: 'standard',
        inputPrice: 0.40,
        outputPrice: 1.60,
        status: 'available',
        competitorInput: competitorPricing['GPT-5.1']?.input || competitorPricing['GPT-5.4']?.input || 2.50,
        competitorOutput: competitorPricing['GPT-5.1']?.output || competitorPricing['GPT-5.4']?.output || 15.00,
        competitorName: 'GPT-5.4',
      },
      {
        id: 'qwen-turbo',
        name: 'Qwen Turbo',
        category: 'lightweight',
        inputPrice: 0.15,
        outputPrice: 0.60,
        status: 'available',
        competitorInput: competitorPricing['GPT-5 Mini']?.input || 0.25,
        competitorOutput: competitorPricing['GPT-5 Mini']?.output || 2.00,
        competitorName: 'GPT-5 Mini',
      },
    ];
    
    const response: PricingResponse = {
      lastUpdated: new Date().toISOString(),
      models,
    };
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Pricing-Source': hasLiveData ? 'live' : 'fallback',
      },
    });
  } catch (e) {
    // Return fallback data on error
    return NextResponse.json(FALLBACK_DATA, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Pricing-Source': 'fallback',
      },
    });
  }
}
