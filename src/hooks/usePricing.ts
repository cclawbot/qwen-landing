'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PricingResponse } from '@/types/pricing';

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
      setState({
        data: null,
        loading: false,
        error: err instanceof Error ? err.message : 'An unknown error occurred',
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
