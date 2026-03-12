"use client";

import { useState } from "react";

interface Feature {
  name: string;
  description: string;
  starter: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

const features: Feature[] = [
  {
    name: "Monthly Tokens",
    description: "API tokens included per month",
    starter: "100K",
    pro: "1M",
    enterprise: "10M+",
  },
  {
    name: "API Access",
    description: "REST API access to Qwen models",
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    name: "Model Versions",
    description: "Access to specific model versions",
    starter: "Latest",
    pro: "Latest + Archives",
    enterprise: "All versions",
  },
  {
    name: "Rate Limits",
    description: "Requests per minute",
    starter: "60 RPM",
    pro: "500 RPM",
    enterprise: "Unlimited",
  },
  {
    name: "Response Caching",
    description: "Cache repeated queries",
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Priority Support",
    description: "Response time guarantee",
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    name: "Dedicated Account Manager",
    description: "Personal point of contact",
    starter: false,
    pro: false,
    enterprise: true,
  },
  {
    name: "Custom SLA",
    description: "Service level agreement",
    starter: false,
    pro: false,
    enterprise: true,
  },
  {
    name: "Data Residency",
    description: "Choose data storage region",
    starter: false,
    pro: "US/EU",
    enterprise: "Any region",
  },
  {
    name: "SSO/SAML",
    description: "Enterprise authentication",
    starter: false,
    pro: false,
    enterprise: true,
  },
  {
    name: "Invoice Billing",
    description: "Net-30 invoice payments",
    starter: false,
    pro: false,
    enterprise: true,
  },
  {
    name: "Custom Contracts",
    description: "Legal contract customization",
    starter: false,
    pro: false,
    enterprise: true,
  },
];

function CheckIcon() {
  return (
    <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function TooltipIcon({ description }: { description: string }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block ml-1">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center cursor-help"
        aria-label="More info"
      >
        ?
      </button>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg whitespace-nowrap z-50" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
          {description}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent" style={{ borderTopColor: 'var(--border-color)' }} />
        </div>
      )}
    </div>
  );
}

export default function FeatureComparison() {
  return (
    <section className="py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Compare Plans</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            See exactly what you get at each tier. No hidden fees, no surprises.
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-3xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <th className="text-left p-6 font-semibold" style={{ color: 'var(--text-primary)' }}>Feature</th>
                <th className="text-center p-6 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Starter
                  <div className="text-sm font-normal mt-1" style={{ color: 'var(--text-secondary)' }}>$49/mo</div>
                </th>
                <th className="text-center p-6 font-semibold relative" style={{ color: 'var(--text-primary)' }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: 'var(--accent-purple)', color: 'white' }}>
                    MOST POPULAR
                  </div>
                  Pro
                  <div className="text-sm font-normal mt-1" style={{ color: 'var(--text-secondary)' }}>$199/mo</div>
                </th>
                <th className="text-center p-6 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Enterprise
                  <div className="text-sm font-normal mt-1" style={{ color: 'var(--text-secondary)' }}>Custom</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.name} className="border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <td className="p-4 pl-6">
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {feature.name}
                      <TooltipIcon description={feature.description} />
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? (
                        <span className="text-green-500"><CheckIcon /></span>
                      ) : (
                        <span className="text-gray-400"><CrossIcon /></span>
                      )
                    ) : (
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{feature.starter}</span>
                    )}
                  </td>
                  <td className="p-4 text-center bg-opacity-30" style={{ backgroundColor: 'var(--accent-purple-bg)' }}>
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <span className="text-green-500"><CheckIcon /></span>
                      ) : (
                        <span className="text-gray-400"><CrossIcon /></span>
                      )
                    ) : (
                      <span className="text-sm font-medium" style={{ color: 'var(--accent-purple)' }}>{feature.pro}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? (
                        <span className="text-green-500"><CheckIcon /></span>
                      ) : (
                        <span className="text-gray-400"><CrossIcon /></span>
                      )
                    ) : (
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{feature.enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <td className="p-6"></td>
                <td className="p-6 text-center">
                  <a href="#waitlist" className="inline-block px-6 py-3 rounded-xl font-bold border transition hover:opacity-80" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                    Get Started
                  </a>
                </td>
                <td className="p-6 text-center">
                  <a href="#waitlist" className="inline-block px-6 py-3 rounded-xl font-bold transition shadow-lg" style={{ backgroundColor: 'var(--accent-purple)', color: 'white', boxShadow: '0 4px 15px var(--shadow-color)' }}>
                    Start Free Trial
                  </a>
                </td>
                <td className="p-6 text-center">
                  <a href="#waitlist" className="inline-block px-6 py-3 rounded-xl font-bold border transition hover:opacity-80" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                    Contact Sales
                  </a>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {/* Starter */}
          <div className="rounded-3xl border overflow-hidden" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <div className="p-6 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <h3 className="text-xl font-bold mb-1">Starter</h3>
              <div className="text-3xl font-bold" style={{ color: 'var(--accent-purple)' }}>$49<span className="text-base font-normal text-gray-500">/mo</span></div>
            </div>
            <div className="p-4 space-y-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex justify-between items-center text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>{feature.name}</span>
                  <span style={{ color: 'var(--text-primary)' }}>
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? <span className="text-green-500">✓</span> : <span className="text-gray-400">✗</span>
                    ) : feature.starter}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-6 pt-0">
              <a href="#waitlist" className="block text-center px-6 py-3 rounded-xl font-bold border transition hover:opacity-80" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                Get Started
              </a>
            </div>
          </div>

          {/* Pro */}
          <div className="rounded-3xl border overflow-hidden" style={{ borderColor: 'var(--accent-purple)', backgroundColor: 'var(--card-bg)', boxShadow: '0 0 30px var(--accent-purple-bg)' }}>
            <div className="p-4 text-center text-xs font-bold" style={{ backgroundColor: 'var(--accent-purple)', color: 'white' }}>
              MOST POPULAR
            </div>
            <div className="p-6 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <h3 className="text-xl font-bold mb-1">Pro</h3>
              <div className="text-3xl font-bold" style={{ color: 'var(--accent-purple)' }}>$199<span className="text-base font-normal text-gray-500">/mo</span></div>
            </div>
            <div className="p-4 space-y-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex justify-between items-center text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>{feature.name}</span>
                  <span style={{ color: 'var(--text-primary)' }}>
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? <span className="text-green-500">✓</span> : <span className="text-gray-400">✗</span>
                    ) : feature.pro}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-6 pt-0">
              <a href="#waitlist" className="block text-center px-6 py-3 rounded-xl font-bold transition shadow-lg" style={{ backgroundColor: 'var(--accent-purple)', color: 'white', boxShadow: '0 4px 15px var(--shadow-color)' }}>
                Start Free Trial
              </a>
            </div>
          </div>

          {/* Enterprise */}
          <div className="rounded-3xl border overflow-hidden" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <div className="p-6 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <h3 className="text-xl font-bold mb-1">Enterprise</h3>
              <div className="text-3xl font-bold" style={{ color: 'var(--accent-purple)' }}>Custom</div>
            </div>
            <div className="p-4 space-y-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex justify-between items-center text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>{feature.name}</span>
                  <span style={{ color: 'var(--text-primary)' }}>
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? <span className="text-green-500">✓</span> : <span className="text-gray-400">✗</span>
                    ) : feature.enterprise}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-6 pt-0">
              <a href="#waitlist" className="block text-center px-6 py-3 rounded-xl font-bold border transition hover:opacity-80" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
