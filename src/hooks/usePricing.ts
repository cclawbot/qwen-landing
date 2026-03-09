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
      outputPrice: 0.15,
      status: 'available',
      competitorInput: 0.4,
      competitorOutput: 2.0,
      competitorName: 'GPT-4o Mini',
    },
    {
      id: 'qwen-plus',
      name: 'Qwen Plus',
      category: 'standard',
      inputPrice: 0.8,
      outputPrice: 2.0,
      status: 'available',
      competitorInput: 2.5,
      competitorOutput: 10.0,
      competitorName: 'GPT-4o',
    },
    {
      id: 'qwen-max',
      name: 'Qwen Max',
      category: 'flagship',
      inputPrice: 4.0,
      outputPrice: 12.0,
      status: 'available',
      competitorInput: 15.0,
      competitorOutput: 75.0,
      competitorName: 'GPT-4.5 Pro',
    },
    {
      id: 'qwen-reasoning',
      name: 'Qwen Reasoning (r1)',
      category: 'flagship',
      inputPrice: 0.7,
      outputPrice: 2.8,
      status: 'available',
      competitorInput: 3.0,
      competitorOutput: 15.0,
      competitorName: 'o1-preview',
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
      const response = await fetch('/api/pricing');
      
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
