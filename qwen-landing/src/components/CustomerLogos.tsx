"use client";

import { useState } from "react";

const companies = [
  { name: "TechCorp", color: "bg-blue-500" },
  { name: "DataFlow", color: "bg-green-500" },
  { name: "CloudNine", color: "bg-purple-500" },
  { name: "AIVentures", color: "bg-orange-500" },
  { name: "NexGen", color: "bg-cyan-500" },
  { name: "QuantumLeap", color: "bg-pink-500" },
  { name: "InnovateAI", color: "bg-yellow-500" },
  { name: "SmartScale", color: "bg-indigo-500" },
  { name: "EnterpriseHub", color: "bg-teal-500" },
  { name: "FutureTech", color: "bg-rose-500" },
];

export default function CustomerLogos() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-12 overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6 mb-8 text-center">
        <h2 className="text-2xl font-bold">
          Trusted by Leading Enterprises
        </h2>
      </div>
      
      <div 
        className="relative flex"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* First set of logos */}
        <div 
          className="flex gap-8 whitespace-nowrap"
          style={{
            animation: `scroll ${companies.length * 3}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {companies.map((company, index) => (
            <div
              key={`first-${index}`}
              className="flex items-center gap-3 px-6 py-4 rounded-xl border"
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderColor: 'var(--border-color)',
                minWidth: '180px'
              }}
            >
              <div className={`w-10 h-10 rounded-lg ${company.color} flex items-center justify-center text-white font-bold text-sm`}>
                {company.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {company.name}
              </span>
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div 
          className="flex gap-8 whitespace-nowrap"
          style={{
            animation: `scroll ${companies.length * 3}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {companies.map((company, index) => (
            <div
              key={`second-${index}`}
              className="flex items-center gap-3 px-6 py-4 rounded-xl border"
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderColor: 'var(--border-color)',
                minWidth: '180px'
              }}
            >
              <div className={`w-10 h-10 rounded-lg ${company.color} flex items-center justify-center text-white font-bold text-sm`}>
                {company.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
