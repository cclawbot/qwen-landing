import type { Metadata } from "next";
import "./globals.css";
import PricingCalculator from "@/components/PricingCalculator";
import PricingSection from "@/components/PricingSection";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ThemeToggle from "@/components/ThemeToggle";
import Newsletter from "@/components/Newsletter";
import Integrations from "@/components/Integrations";
import BlogSection from "@/components/BlogSection";
import HowItWorks from "@/components/HowItWorks";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "QwenResell | Enterprise Qwen API Tokens",
  description: "92% cheaper than Anthropic - Qwen API for B2B. Massive savings on LLM tokens.",
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center italic text-sm">Q</div>
          QwenResell
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium items-center" style={{ color: 'var(--text-secondary)' }}>
          <a href="#pricing" className="hover:opacity-80 transition">Pricing</a>
          <a href="#features" className="hover:opacity-80 transition">Features</a>
          <a href="#waitlist" className="hover:opacity-80 transition" style={{ color: '#60a5fa' }}>Join Waitlist</a>
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
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
        <p className="text-xl max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
          Access Alibaba&apos;s Qwen 0728 architecture with up to 99% savings compared to GPT-5.4 Pro. Guaranteed supply for enterprise high-volume workloads.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="#waitlist" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
            Join the Waitlist
          </a>
          <a href="#pricing" className="px-8 py-4 rounded-xl font-bold transition-all border border-gray-700 hover:opacity-80" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            View Comparison
          </a>
        </div>
      </header>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Pricing Section */}
      <PricingSection />

      {/* Pricing Calculator */}
      <PricingCalculator />

      {/* Features Section */}
      <section className="py-24" style={{ backgroundColor: 'rgba(30, 30, 30, 0.3)' }}>
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div className="p-8 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-blue-400 text-2xl font-bold">🛡️</div>
            <h4 className="text-xl font-bold mb-4">Guaranteed Supply</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Direct partnership with Alibaba Cloud infrastructure. No rate-limit headaches or mid-tier outages.</p>
          </div>
          <div className="p-8 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-purple-400 text-2xl font-bold">🚀</div>
            <h4 className="text-xl font-bold mb-4">High Volume Ready</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Scaling to billions of tokens? Our infrastructure is built for B2B aggregators and agents.</p>
          </div>
          <div className="p-8 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-green-400 text-2xl font-bold">🏢</div>
            <h4 className="text-xl font-bold mb-4">Enterprise-Ready</h4>
            <p style={{ color: 'var(--text-secondary)' }}>SOC2 Type II compliant pipelines, custom SLA options, and localized data residency support.</p>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <Integrations />

      {/* Blog Section */}
      <BlogSection />

      {/* Team Section */}
      <Team />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <Newsletter />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="border-t py-12" style={{ borderColor: 'var(--border-color)' }}>
        <div className="container mx-auto px-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p>&copy; 2026 QwenResell API Services. All rights reserved. Pricing accurate as of March 2026.</p>
        </div>
      </footer>
    </div>
  );
}
