import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QwenResell | Enterprise Qwen API Tokens",
  description: "92% cheaper than Anthropic - Qwen API for B2B. Massive savings on LLM tokens.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans">
      {/* Header */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center italic text-sm">Q</div>
          QwenResell
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#waitlist" className="hover:text-white transition text-blue-400">Join Waitlist</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-blue-900/30 text-blue-400 rounded-full border border-blue-500/20">
          2026 Reseller Exclusive Pricing
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Stop Overpaying for <br /> <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Thinking Models.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Access Alibaba&apos;s Qwen 0728 architecture with <span className="text-white font-semibold">up to 99% savings</span> compared to GPT-5.4 Pro. Guaranteed supply for enterprise high-volume workloads.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="#waitlist" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
            Join the Waitlist
          </a>
          <a href="#pricing" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-bold transition-all border border-gray-700">
            View Comparison
          </a>
        </div>
      </header>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">API Price Comparison (per 1M Tokens)</h2>
        
        <div className="space-y-16">
          {/* Category 1 */}
          <div>
            <h3 className="text-blue-400 font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span> Flagship / Thinking Models
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
                  <tr className="border-b border-gray-800/50">
                    <td className="px-6 py-4 font-medium">GPT-5.4 Pro</td>
                    <td className="px-6 py-4 text-right">$30.00</td>
                    <td className="px-6 py-4 text-right">$180.00</td>
                    <td className="px-6 py-4 text-center text-xs">Standard</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-6 py-4 font-medium">Claude Opus 4.6</td>
                    <td className="px-6 py-4 text-right">$5.00</td>
                    <td className="px-6 py-4 text-right">$25.00</td>
                    <td className="px-6 py-4 text-center text-xs">Standard</td>
                  </tr>
                  <tr className="bg-[rgba(59,130,246,0.1)] text-white border-l-4 border-blue-500">
                    <td className="px-6 py-4 font-bold">Qwen Plus (0728)</td>
                    <td className="px-6 py-4 text-right font-bold">$0.26 <span className="ml-2 bg-[#064e3b] text-[#34d399] text-xs px-2 py-0.5 rounded-full">-99.1%</span></td>
                    <td className="px-6 py-4 text-right font-bold">$0.78 <span className="ml-2 bg-[#064e3b] text-[#34d399] text-xs px-2 py-0.5 rounded-full">-99.5%</span></td>
                    <td className="px-6 py-4 text-center text-xs font-bold text-blue-400 uppercase">Available Now</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Category 2 */}
          <div>
            <h3 className="text-purple-400 font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span> Standard / Mid-tier
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
                  <tr className="border-b border-gray-800/50">
                    <td className="px-6 py-4 font-medium">Claude Sonnet 4.6</td>
                    <td className="px-6 py-4 text-right">$3.00</td>
                    <td className="px-6 py-4 text-right">$15.00</td>
                    <td className="px-6 py-4 text-center text-xs">Standard</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-6 py-4 font-medium">GPT-5.1</td>
                    <td className="px-6 py-4 text-right">$1.25</td>
                    <td className="px-6 py-4 text-right">$10.00</td>
                    <td className="px-6 py-4 text-center text-xs">Standard</td>
                  </tr>
                  <tr className="bg-[rgba(59,130,246,0.1)] text-white border-l-4 border-blue-500">
                    <td className="px-6 py-4 font-bold">Qwen Turbo</td>
                    <td className="px-6 py-4 text-right font-bold">$0.30 <span className="ml-2 bg-[#064e3b] text-[#34d399] text-xs px-2 py-0.5 rounded-full">-90.0%</span></td>
                    <td className="px-6 py-4 text-right font-bold">$0.60 <span className="ml-2 bg-[#064e3b] text-[#34d399] text-xs px-2 py-0.5 rounded-full">-96.0%</span></td>
                    <td className="px-6 py-4 text-center text-xs font-bold text-blue-400 uppercase">Available Now</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Category 3 */}
          <div>
            <h3 className="text-green-400 font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span> Lightweight / Fast
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
                  <tr className="border-b border-gray-800/50">
                    <td className="px-6 py-4 font-medium">Claude Haiku 4.5</td>
                    <td className="px-6 py-4 text-right">$1.00</td>
                    <td className="px-6 py-4 text-right">$5.00</td>
                    <td className="px-6 py-4 text-center text-xs">Standard</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="px-6 py-4 font-medium">GPT-5 Nano</td>
                    <td className="px-6 py-4 text-right">$0.05</td>
                    <td className="px-6 py-4 text-right">$0.40</td>
                    <td className="px-6 py-4 text-center text-xs">Standard</td>
                  </tr>
                  <tr className="bg-[rgba(59,130,246,0.1)] text-white border-l-4 border-blue-500">
                    <td className="px-6 py-4 font-bold">Qwen Flash</td>
                    <td className="px-6 py-4 text-right font-bold">$0.10 <span className="ml-2 bg-[#064e3b] text-[#34d399] text-xs px-2 py-0.5 rounded-full">-90.0%</span></td>
                    <td className="px-6 py-4 text-right font-bold">$0.40 <span className="ml-2 bg-[#064e3b] text-[#34d399] text-xs px-2 py-0.5 rounded-full">-92.0%</span></td>
                    <td className="px-6 py-4 text-center text-xs font-bold text-blue-400 uppercase">Available Now</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-900/50 py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div className="p-8 bg-[rgba(17,24,39,0.7)] rounded-3xl border border-[rgba(255,255,255,0.1)] backdrop-blur-xl">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-blue-400 text-2xl font-bold">🛡️</div>
            <h4 className="text-xl font-bold mb-4">Guaranteed Supply</h4>
            <p className="text-gray-400">Direct partnership with Alibaba Cloud infrastructure. No rate-limit headaches or mid-tier outages.</p>
          </div>
          <div className="p-8 bg-[rgba(17,24,39,0.7)] rounded-3xl border border-[rgba(255,255,255,0.1)] backdrop-blur-xl">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-purple-400 text-2xl font-bold">🚀</div>
            <h4 className="text-xl font-bold mb-4">High Volume Ready</h4>
            <p className="text-gray-400">Scaling to billions of tokens? Our infrastructure is built for B2B aggregators and agents.</p>
          </div>
          <div className="p-8 bg-[rgba(17,24,39,0.7)] rounded-3xl border border-[rgba(255,255,255,0.1)] backdrop-blur-xl">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-green-400 text-2xl font-bold">🏢</div>
            <h4 className="text-xl font-bold mb-4">Enterprise-Ready</h4>
            <p className="text-gray-400">SOC2 Type II compliant pipelines, custom SLA options, and localized data residency support.</p>
          </div>
        </div>
      </section>

      {/* CTA / Waitlist Section */}
      <section id="waitlist" className="container mx-auto px-6 py-32 text-center">
        <div className="max-w-3xl mx-auto bg-[rgba(17,24,39,0.7)] p-12 rounded-[2rem] border border-blue-500/30 backdrop-blur-xl">
          <h2 className="text-4xl font-extrabold mb-4">Ready for Sub-Dollar Pricing?</h2>
          <p className="text-gray-400 mb-10">We are onboarding a limited number of B2B partners for Q2 2026. Secure your spot on the priority access list.</p>
          
          <form className="flex flex-col md:flex-row gap-4">
            <input type="email" placeholder="Enter your business email" className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-white" required />
            <button type="submit" className="bg-white text-black px-10 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all">
              Join Waitlist
            </button>
          </form>
          <p className="mt-6 text-xs text-gray-500">Join 400+ enterprises optimizing their LLM spend.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          <p>&copy; 2026 QwenResell API Services. All rights reserved. Pricing accurate as of March 2026.</p>
        </div>
      </footer>
    </div>
  );
}
