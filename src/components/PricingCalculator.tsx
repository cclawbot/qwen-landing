"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { trackCalculatorUsed } from "@/lib/analytics";

const PRICING = {
  competitors: {
    "GPT-5.4 Pro": { input: 30.0, output: 180.0 },
    "Claude Opus 4.6": { input: 5.0, output: 25.0 },
    "Claude Sonnet 4.6": { input: 3.0, output: 15.0 },
    "GPT-5.1": { input: 1.25, output: 10.0 },
    "Claude Haiku 4.5": { input: 1.0, output: 5.0 },
    "GPT-5 Nano": { input: 0.05, output: 0.4 },
  },
  qwen: {
    input: 0.26,
    output: 0.78,
  },
};

interface CompetitorModel {
  name: string;
  input: number;
  output: number;
}

const competitorOptions: CompetitorModel[] = [
  { name: "GPT-5.4 Pro", input: 30.0, output: 180.0 },
  { name: "Claude Opus 4.6", input: 5.0, output: 25.0 },
  { name: "Claude Sonnet 4.6", input: 3.0, output: 15.0 },
  { name: "GPT-5.1", input: 1.25, output: 10.0 },
  { name: "Claude Haiku 4.5", input: 1.0, output: 5.0 },
  { name: "GPT-5 Nano", input: 0.05, output: 0.4 },
];

export default function PricingCalculator() {
  const [inputTokens, setInputTokens] = useState<string>("1");
  const [outputTokens, setOutputTokens] = useState<string>("0.5");
  const [selectedModel, setSelectedModel] = useState<string>("GPT-5.4 Pro");
  const hasTrackedRef = useRef(false);

  const calculations = useMemo(() => {
    const inputM = parseFloat(inputTokens) || 0;
    const outputM = parseFloat(outputTokens) || 0;
    const competitor = competitorOptions.find((m) => m.name === selectedModel);

    if (!competitor) {
      return { currentCost: 0, qwenCost: 0, savings: 0, savingsPercent: 0 };
    }

    const currentCost = inputM * competitor.input + outputM * competitor.output;
    const qwenCost = inputM * PRICING.qwen.input + outputM * PRICING.qwen.output;
    const savings = currentCost - qwenCost;
    const savingsPercent = currentCost > 0 ? (savings / currentCost) * 100 : 0;

    return {
      currentCost,
      qwenCost,
      savings,
      savingsPercent,
    };
  }, [inputTokens, outputTokens, selectedModel]);

  useEffect(() => {
    const inputM = parseFloat(inputTokens) || 0;
    const outputM = parseFloat(outputTokens) || 0;
    if (!hasTrackedRef.current && (inputM > 0 || outputM > 0)) {
      hasTrackedRef.current = true;
      trackCalculatorUsed();
    }
  }, [inputTokens, outputTokens]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Calculate Your Savings
        </h2>
        <p className="text-center mb-12" style={{ color: 'var(--text-secondary)' }}>
          See how much you can save by switching to Qwen API
        </p>

        <div className="rounded-2xl overflow-hidden border backdrop-blur-xl p-8" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Currently Using
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all"
                  style={{ 
                    backgroundColor: 'var(--input-bg)', 
                    borderColor: 'var(--input-border)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--input-border)'
                  }}
                >
                  {competitorOptions.map((model) => (
                    <option key={model.name} value={model.name} style={{ backgroundColor: 'var(--input-bg)' }}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Monthly Input Tokens (Millions)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputTokens}
                    onChange={(e) => setInputTokens(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all"
                    style={{ 
                      backgroundColor: 'var(--input-bg)', 
                      borderColor: 'var(--input-border)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--input-border)'
                    }}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Monthly Output Tokens (Millions)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={outputTokens}
                    onChange={(e) => setOutputTokens(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none transition-all"
                    style={{ 
                      backgroundColor: 'var(--input-bg)', 
                      borderColor: 'var(--input-border)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--input-border)'
                    }}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl p-6 flex flex-col justify-center" style={{ backgroundColor: 'var(--accent-purple-bg)' }}>
              <div className="text-center">
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Your Savings</p>
                <p className="text-4xl font-bold mb-2" style={{ color: 'var(--accent-purple)' }}>
                  {formatCurrency(calculations.savings)}
                </p>
                <div className="inline-block text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--accent-purple-bg)', color: 'var(--accent-purple)' }}>
                  {calculations.savingsPercent.toFixed(1)}% savings
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-2" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>Current Cost:</span>
                  <span>{formatCurrency(calculations.currentCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>With Qwen:</span>
                  <span style={{ color: 'var(--accent-purple)' }}>
                    {formatCurrency(calculations.qwenCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: 'var(--border-color)' }}>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              Ready to start saving? Join the priority waitlist.
            </p>
            <a
              href="#waitlist"
              className="inline-block px-6 py-3 rounded-xl font-bold transition-all"
              style={{ backgroundColor: 'var(--accent-purple)', color: 'white' }}
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
