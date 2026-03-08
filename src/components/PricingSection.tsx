'use client';

import { usePricing } from '@/hooks/usePricing';
import type { PricingCategory, PricingModel } from '@/types/pricing';

function calculateSavings(inputPrice: number, competitorInput?: number): string {
  if (!competitorInput || competitorInput === 0) return '';
  const savings = ((competitorInput - inputPrice) / competitorInput) * 100;
  return `-${savings.toFixed(1)}%`;
}

function PricingSkeleton() {
  return (
    <div className="space-y-16">
      {[1, 2, 3].map((category) => (
        <div key={category}>
          <div className="h-6 w-48 bg-gray-800 animate-pulse rounded mb-6"></div>
          <div className="bg-[rgba(17,24,39,0.7)] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)]">
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((row) => (
                <div key={row} className="flex justify-between">
                  <div className="h-6 w-32 bg-gray-800 animate-pulse rounded"></div>
                  <div className="h-6 w-24 bg-gray-800 animate-pulse rounded"></div>
                  <div className="h-6 w-24 bg-gray-800 animate-pulse rounded"></div>
                  <div className="h-6 w-20 bg-gray-800 animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PricingError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="text-red-400 mb-4 text-lg">Failed to load pricing</div>
      <p className="text-gray-500 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

function PricingTable({ models, category, categoryName }: { 
  models: PricingModel[]; 
  category: PricingCategory;
  categoryName: string;
}) {
  const categoryColors: Record<PricingCategory, { text: string; dot: string }> = {
    flagship: { text: 'text-blue-400', dot: 'bg-blue-400' },
    standard: { text: 'text-purple-400', dot: 'bg-purple-400' },
    lightweight: { text: 'text-green-400', dot: 'bg-green-400' },
  };

  return (
    <div>
      <h3 className={`${categoryColors[category].text} font-semibold mb-6 flex items-center gap-2`}>
        <span className={`w-2 h-2 ${categoryColors[category].dot} rounded-full`}></span>
        {categoryName}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-[rgba(17,24,39,0.7)] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] backdrop-blur-xl">
          <thead>
            <tr className="border-b border-gray-800 text-gray-500 text-sm uppercase">
              <th className="px-6 py-4">Model</th>
              <th className="px-6 py-4 text-right">Input (USD)</th>
              <th className="px-6 py-4 text-right">Output (USD)</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {models.map((model) => {
              const savings = calculateSavings(model.inputPrice, model.competitorInput);
              const isAvailable = model.status === 'available';
              
              return (
                <tr 
                  key={model.id} 
                  className={`border-b border-gray-800/50 ${isAvailable ? 'bg-[rgba(59,130,246,0.1)] text-white border-l-4 border-blue-500' : ''}`}
                >
                  <td className="px-6 py-4 font-medium">{model.name}</td>
                  <td className="px-6 py-4 text-right">
                    {isAvailable ? (
                      <>
                        <span className="font-bold">${model.inputPrice.toFixed(2)}</span>
                        {savings && (
                          <span className="ml-2 bg-[#064e3b] text-[#34d399] text-xs px-2 py-0.5 rounded-full">
                            {savings}
                          </span>
                        )}
                      </>
                    ) : (
                      `$${model.inputPrice.toFixed(2)}`
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {isAvailable ? (
                      <>
                        <span className="font-bold">${model.outputPrice.toFixed(2)}</span>
                        {model.competitorOutput && (
                          <span className="ml-2 bg-[#064e3b] text-[#34d399] text-xs px-2 py-0.5 rounded-full">
                            {calculateSavings(model.outputPrice, model.competitorOutput)}
                          </span>
                        )}
                      </>
                    ) : (
                      `$${model.outputPrice.toFixed(2)}`
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-xs">
                    {isAvailable ? (
                      <span className="font-bold text-blue-400 uppercase">Available Now</span>
                    ) : (
                      'Standard'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const { data, loading, error, refetch } = usePricing();

  if (loading) {
    return (
      <section id="pricing" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">API Price Comparison (per 1M Tokens)</h2>
        <PricingSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">API Price Comparison (per 1M Tokens)</h2>
        <PricingError message={error} onRetry={refetch} />
      </section>
    );
  }

  if (!data) return null;

  const flagshipModels = data.models.filter(m => m.category === 'flagship');
  const standardModels = data.models.filter(m => m.category === 'standard');
  const lightweightModels = data.models.filter(m => m.category === 'lightweight');

  return (
    <section id="pricing" className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-4 text-center">API Price Comparison (per 1M Tokens)</h2>
      <p className="text-gray-500 text-center mb-12 text-sm">
        Last updated: {new Date(data.lastUpdated).toLocaleString()}
      </p>
      
      <div className="space-y-16">
        <PricingTable 
          models={flagshipModels} 
          category="flagship" 
          categoryName="Flagship / Thinking Models" 
        />
        <PricingTable 
          models={standardModels} 
          category="standard" 
          categoryName="Standard / Mid-tier" 
        />
        <PricingTable 
          models={lightweightModels} 
          category="lightweight" 
          categoryName="Lightweight / Fast" 
        />
      </div>
    </section>
  );
}
