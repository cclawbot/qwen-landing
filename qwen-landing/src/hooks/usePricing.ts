'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PricingResponse } from '@/types/pricing';

// Static fallback data for static export (GitHub Pages)
const STATIC_PRICING_DATA: PricingResponse = {
  lastUpdated: new Date().toISOString(),
  models: [
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
      id: 'qwen-reasoning',
      name: 'Qwen Reasoning (r1)',
      category: 'flagship',
      inputPrice: 0.70,
      outputPrice: 2.80,
      status: 'available',
      competitorInput: 5.00,
      competitorOutput: 25.00,
      competitorName: 'Claude Opus 4.6',
    },
  ],
};

interface UsePricingState {
  data: PricingResponse | null;
  loading: boolean;
  error: string | null;
}

interface UsePricingReturn extends UsePricingState {
  refetch: () => Promise<void>;
}

const PRICING_CACHE_KEY = 'qwen-pricing-cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedData(): PricingResponse | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = sessionStorage.getItem(PRICING_CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      sessionStorage.removeItem(PRICING_CACHE_KEY);
      return null;
    }
    
    return data as PricingResponse;
  } catch {
    return null;
  }
}

function setCachedData(data: PricingResponse): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(PRICING_CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch {
    // Ignore storage errors
  }
}

export function usePricing(): UsePricingReturn {
  const [state, setState] = useState<UsePricingState>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchPricing = useCallback(async () => {
    // Check cache first
    const cached = getCachedData();
    if (cached) {
      setState({
        data: cached,
        loading: false,
        error: null,
      });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Try API first, fall back to static JSON for GitHub Pages
      let response = await fetch('/api/pricing');
      
      if (!response.ok) {
        // Fallback to static JSON file
        response = await fetch('/api/pricing.json');
      }
      
      if (!response.ok) {
        throw new Error(`Failed to fetch pricing: ${response.statusText}`);
      }
      
      const data: PricingResponse = await response.json();
      
      // Cache the data
      setCachedData(data);
      
      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (err) {
      // Use static data as fallback for static hosting
      setState({
        data: STATIC_PRICING_DATA,
        loading: false,
        error: null,
      });
    }
  }, []);

  useEffect(() => {
    fetchPricing();
  }, [fetchPricing]);

  return {
    ...state,
    refetch: fetchPricing,
  };
}
