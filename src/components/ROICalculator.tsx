"use client";

import { useState, useMemo } from "react";

// Default values for calculations
const DEFAULT_VALUES = {
  monthlySpend: 10000,
  developerCount: 5,
  implementationCost: 5000,
  productivityRate: 75, // $75/hour for senior developer
  efficiencyGain: 0.30, // 30% efficiency improvement
  annualGrowth: 0.15, // 15% annual cost increase for competitors
};

export default function ROICalculator() {
  const [monthlySpend, setMonthlySpend] = useState<string>(DEFAULT_VALUES.monthlySpend.toString());
  const [developerCount, setDeveloperCount] = useState<string>(DEFAULT_VALUES.developerCount.toString());
  const [implementationCost, setImplementationCost] = useState<string>(DEFAULT_VALUES.implementationCost.toString());

  const calculations = useMemo(() => {
    const spend = parseFloat(monthlySpend) || 0;
    const devs = parseFloat(developerCount) || 0;
    const implCost = parseFloat(implementationCost) || 0;
    const prodRate = DEFAULT_VALUES.productivityRate;
    const effGain = DEFAULT_VALUES.efficiencyGain;
    const growth = DEFAULT_VALUES.annualGrowth;

    // Calculate monthly savings (assuming 92% savings like pricing calculator)
    const monthlySavings = spend * 0.92;

    // Calculate payback period
    const paybackMonths = monthlySavings > 0 ? implCost / monthlySavings : 0;

    // Calculate 3-year total savings
    // Year 1: 12 months of savings
    // Year 2: 12 months * (1 + growth) for competitor costs, but we stay flat
    // Year 3: 12 months * (1 + growth)^2
    const year1Savings = monthlySavings * 12;
    const year2Savings = monthlySavings * 12 * (1 + growth);
    const year3Savings = monthlySavings * 12 * Math.pow(1 + growth, 2);
    const threeYearSavings = year1Savings + year2Savings + year3Savings - implCost;

    // Calculate productivity gains (hours saved per year)
    // Assuming 2000 work hours per developer, efficiency gain applies to 40% of time
    const hoursPerDevPerYear = 2000;
    const hoursSavedPerYear = devs * hoursPerDevPerYear * effGain * 0.4;
    const productivityValuePerYear = hoursSavedPerYear * prodRate;

    // Efficiency improvement percentage
    const efficiencyPercent = effGain * 100;

    // Break-even analysis
    const breakEvenRevenue = implCost / 0.40; // Assuming 40% of time is AI-assisted

    return {
      monthlySavings,
      paybackMonths,
      threeYearSavings,
      hoursSavedPerYear,
      productivityValuePerYear,
      efficiencyPercent,
      breakEvenRevenue,
      year1Savings,
      year2Savings,
      year3Savings,
    };
  }, [monthlySpend, developerCount, implementationCost]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const formatFullCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Calculate Your ROI
        </h2>
        <p className="text-center mb-12" style={{ color: 'var(--text-secondary)' }}>
          See the full business value of switching to QwenResell
        </p>

        <div className="rounded-2xl overflow-hidden border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Input Section */}
            <div className="p-8 space-y-6 border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'var(--border-color)' }}>
              <h3 className="text-lg font-semibold mb-4">Enter Your Details</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Current Monthly AI Spend ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all"
                  style={{ 
                    backgroundColor: 'var(--input-bg)', 
                    borderColor: 'var(--input-border)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--input-border)'
                  }}
                  placeholder="10000"
                />
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Current monthly spend on GPT/Claude APIs
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Number of Developers
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={developerCount}
                  onChange={(e) => setDeveloperCount(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all"
                  style={{ 
                    backgroundColor: 'var(--input-bg)', 
                    borderColor: 'var(--input-border)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--input-border)'
                  }}
                  placeholder="5"
                />
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  Team members who will use AI-assisted development
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Implementation Cost ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={implementationCost}
                  onChange={(e) => setImplementationCost(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all"
                  style={{ 
                    backgroundColor: 'var(--input-bg)', 
                    borderColor: 'var(--input-border)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--input-border)'
                  }}
                  placeholder="5000"
                />
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  One-time migration and setup cost (typically $3K-$10K)
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="p-8">
              <h3 className="text-lg font-semibold mb-6">Your ROI Metrics</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Primary Metric: Payback Period */}
                <div className="col-span-2 rounded-xl p-5" style={{ backgroundColor: 'var(--accent-purple-bg)' }}>
                  <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Payback Period</div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--accent-purple)' }}>
                    {calculations.paybackMonths < 1 
                      ? "< 1 month" 
                      : `${calculations.paybackMonths.toFixed(1)} months`}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Time to recover your investment
                  </div>
                </div>

                {/* 3-Year Savings */}
                <div className="rounded-xl p-4 border" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>3-Year Savings</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--accent-green)' }}>
                    {formatCurrency(calculations.threeYearSavings)}
                  </div>
                </div>

                {/* Efficiency */}
                <div className="rounded-xl p-4 border" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Efficiency Gain</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--accent-blue)' }}>
                    {calculations.efficiencyPercent.toFixed(0)}%
                  </div>
                </div>

                {/* Monthly Savings */}
                <div className="rounded-xl p-4 border" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Monthly Savings</div>
                  <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {formatFullCurrency(calculations.monthlySavings)}
                  </div>
                </div>

                {/* Productivity Value */}
                <div className="rounded-xl p-4 border" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Productivity Value/Yr</div>
                  <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {formatCurrency(calculations.productivityValuePerYear)}
                  </div>
                </div>
              </div>

              {/* Year-by-Year Breakdown */}
              <div className="rounded-xl p-4 border mb-6" style={{ borderColor: 'var(--border-color)' }}>
                <div className="text-sm font-medium mb-3">Annual Savings Breakdown</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-secondary)' }}>Year 1:</span>
                    <span className="font-medium">{formatFullCurrency(calculations.year1Savings - parseFloat(implementationCost || "0"))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-secondary)' }}>Year 2:</span>
                    <span className="font-medium">{formatFullCurrency(calculations.year2Savings)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-secondary)' }}>Year 3:</span>
                    <span className="font-medium">{formatFullCurrency(calculations.year3Savings)}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <a
                  href="#waitlist"
                  className="inline-block w-full px-6 py-3 rounded-xl font-bold transition-all"
                  style={{ backgroundColor: 'var(--accent-purple)', color: 'white' }}
                >
                  Get Detailed Analysis
                </a>
                <p className="text-xs mt-3" style={{ color: 'var(--text-secondary)' }}>
                  * Estimates based on 92% pricing savings and 30% efficiency gains
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
