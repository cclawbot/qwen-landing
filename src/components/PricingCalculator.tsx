"use client";

import { useState, useMemo } from "react";

// Pricing data (per 1M tokens)
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
    // Using Qwen Plus as default comparison (mid-tier flagship)
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
        <p className="text-gray-400 text-center mb-12">
          See how much your business can save by switching to Qwen
        </p>

        <div className="bg-[rgba(17,24,39,0.7)] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] backdrop-blur-xl p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Inputs */}
            <div className="md:col-span-2 space-y-6">
              {/* Model Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Currently Using
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-white"
                >
                  {competitorOptions.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Token Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Monthly Input Tokens (Millions)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={inputTokens}
                    onChange={(e) => setInputTokens(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Monthly Output Tokens (Millions)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={outputTokens}
                    onChange={(e) => setOutputTokens(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-white"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gray-900/50 rounded-xl p-6 flex flex-col justify-center">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Your Monthly Savings</p>
                <p className="text-4xl font-bold text-green-400 mb-2">
                  {formatCurrency(calculations.savings)}
                </p>
                <div className="inline-block bg-[#064e3b] text-[#34d399] text-sm font-medium px-3 py-1 rounded-full">
                  {calculations.savingsPercent.toFixed(1)}% savings
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current cost:</span>
                  <span>{formatCurrency(calculations.currentCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">With Qwen:</span>
                  <span className="text-blue-400">
                    {formatCurrency(calculations.qwenCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400 mb-4">
              Ready to start saving? Join the priority waitlist.
            </p>
            <a
              href="#waitlist"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
