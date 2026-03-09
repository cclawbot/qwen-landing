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
          <div className="h-6 w-48 rounded mb-6 animate-pulse" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }}></div>
          <div className="rounded-2xl overflow-hidden border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((row) => (
                <div key={row} className="flex justify-between">
                  <div className="h-6 w-32 rounded animate-pulse" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }}></div>
                  <div className="h-6 w-24 rounded animate-pulse" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }}></div>
                  <div className="h-6 w-24 rounded animate-pulse" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }}></div>
                  <div className="h-6 w-20 rounded animate-pulse" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }}></div>
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
      <div className="mb-4 text-lg" style={{ color: '#ef4444' }}>Failed to load pricing</div>
      <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-3 rounded-lg font-medium transition-colors"
        style={{ backgroundColor: 'var(--accent-blue)', color: 'white' }}
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

  const categoryColors: Record<PricingCategory, { textVar: string; bgVar: string }> = {
    flagship: { textVar: 'var(--accent-blue)', bgVar: 'var(--accent-blue)' },
    standard: { textVar: 'var(--accent-purple)', bgVar: 'var(--accent-purple)' },
    lightweight: { textVar: 'var(--accent-green)', bgVar: 'var(--accent-green)' },
  };

  const colors = categoryColors[category];

  return (
    <div>
      <h3 className="font-semibold mb-6 flex items-center gap-2" style={{ color: colors.textVar }}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.bgVar }}></span>
        {categoryName}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left rounded-2xl overflow-hidden border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <thead>
            <tr className="border-b text-sm uppercase" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <th className="px-6 py-4">Model</th>
              <th className="px-6 py-4 text-right">Input (USD)</th>
              <th className="px-6 py-4 text-right">Output (USD)</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody style={{ color: 'var(--text-primary)' }}>
            {models.map((model) => {
              const savings = calculateSavings(model.inputPrice, model.competitorInput);
              const isAvailable = model.status === 'available';
              
              return (
                <tr 
                  key={model.id} 
                  className="border-b"
                  style={{ 
                    borderColor: 'var(--border-color)',
                    backgroundColor: isAvailable ? 'var(--accent-blue-bg)' : 'transparent'
                  }}
                >
                  <td className="px-6 py-4 font-medium">{model.name}</td>
                  <td className="px-6 py-4 text-right">
                    {isAvailable ? (
                      <>
                        <span className="font-bold">${model.inputPrice.toFixed(2)}</span>
                        {savings && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--accent-green-bg)', color: 'var(--accent-green)' }}>
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
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--accent-green-bg)', color: 'var(--accent-green)' }}>
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
                      <span className="font-bold uppercase" style={{ color: colors.textVar }}>Available Now</span>
                    ) : (
                      <span style={{ color: 'var(--text-secondary)' }}>Standard</span>
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

  const categoryNames: Record<PricingCategory, string> = {
    flagship: 'Flagship / Thinking Models',
    standard: 'Standard / Mid-tier',
    lightweight: 'Lightweight / Fast',
  };

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
          categoryName={categoryNames.flagship}
        />
        <PricingTable 
          models={standardModels} 
          category="standard" 
          categoryName={categoryNames.standard}
        />
        <PricingTable 
          models={lightweightModels} 
          category="lightweight" 
          categoryName={categoryNames.lightweight}
        />
      </div>
    </section>
  );
}
