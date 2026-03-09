import type { Metadata } from "next";
import "./globals.css";
import PricingCalculator from "@/components/PricingCalculator";
import ROICalculator from "@/components/ROICalculator";
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
import CaseStudies from "@/components/CaseStudies";
import TrustBadges from "@/components/TrustBadges";
import CustomerLogos from "@/components/CustomerLogos";
import StatsSection from "@/components/StatsSection";
import BackToTop from "@/components/BackToTop";
import EnhancedFooter from "@/components/EnhancedFooter";
import ScrollProgress from "@/components/ScrollProgress";
import VideoDemo from "@/components/VideoDemo";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "QwenResell | Enterprise Qwen API Tokens",
  description: "92% cheaper than Anthropic - Qwen API for B2B. Massive savings on LLM tokens.",
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Header */}
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center italic text-sm" style={{ backgroundColor: 'var(--accent-purple)' }}>Q</div>
          QwenResell
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium items-center" style={{ color: 'var(--text-secondary)' }}>
          <a href="#pricing" className="hover:opacity-80 transition">Pricing</a>
          <a href="#features" className="hover:opacity-80 transition">Features</a>
          <a href="#waitlist" className="hover:opacity-80 transition" style={{ color: 'var(--accent-purple)' }}>Join Waitlist</a>
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full border" style={{ backgroundColor: 'var(--accent-purple-bg)', color: 'var(--accent-purple)', borderColor: 'var(--border-color)' }}>
          2026 Reseller Exclusive Pricing
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Stop Overpaying for <br /> <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">Thinking Models.</span>
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
          Access Alibaba&apos;s Qwen 0728 architecture with up to 99% savings compared to GPT-5.4 Pro. Guaranteed supply for enterprise high-volume workloads.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="#waitlist" className="px-8 py-4 rounded-xl font-bold transition-all shadow-lg" style={{ backgroundColor: 'var(--accent-purple)', color: 'white', boxShadow: '0 10px 25px var(--shadow-color)' }}>
            Join the Waitlist
          </a>
          <a href="#pricing" className="px-8 py-4 rounded-xl font-bold transition-all border hover:opacity-80" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            View Comparison
          </a>
        </div>
      </header>

      {/* Video Demo Section */}
      <VideoDemo />

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Customer Logos Ticker */}
      <CustomerLogos />

      {/* Stats Section */}
      <StatsSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Pricing Section */}
      <PricingSection />

      {/* Pricing Calculator */}
      <PricingCalculator />

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Features Section */}
      <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div className="p-8 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold" style={{ backgroundColor: 'var(--accent-purple-bg)', color: 'var(--accent-purple)' }}>🛡️</div>
            <h4 className="text-xl font-bold mb-4">Guaranteed Supply</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Direct partnership with Alibaba Cloud infrastructure. No rate-limit headaches or mid-tier outages.</p>
          </div>
          <div className="p-8 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold" style={{ backgroundColor: 'var(--accent-purple-bg)', color: 'var(--accent-purple)' }}>🚀</div>
            <h4 className="text-xl font-bold mb-4">High Volume Ready</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Scaling to billions of tokens? Our infrastructure is built for B2B aggregators and agents.</p>
          </div>
          <div className="p-8 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold" style={{ backgroundColor: 'var(--accent-purple-bg)', color: 'var(--accent-purple)' }}>🏢</div>
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

      {/* Case Studies Section */}
      <CaseStudies />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <Newsletter />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Form */}
      <ContactForm />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
