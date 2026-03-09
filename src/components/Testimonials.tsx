"use client";

import { useTranslation } from "@/lib/i18n";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Saved $2.3M annually switching from GPT-5. The quality trade-off was negligible, but the savings were transformative for our bottom line.",
    name: "Sarah Chen",
    title: "CTO",
    company: "Nexus AI",
  },
  {
    id: 2,
    quote: "Qwen Turbo powers our entire agent infrastructure. We've scaled from 10M to 100M daily requests without breaking the bank.",
    name: "Marcus Rodriguez",
    title: "Founder & CEO",
    company: "AgentFlow",
  },
  {
    id: 3,
    quote: "92% cost reduction let us scale our analytics platform 10x. What used to cost $50K/month now costs $4K with identical output quality.",
    name: "Emily Watson",
    title: "VP of Engineering",
    company: "DataPulse",
  },
  {
    id: 4,
    quote: "Enterprise support and SOC2 compliance made the migration seamless. We evaluated 8 providers—QwenResell was the only one meeting our security bar.",
    name: "James Park",
    title: "Head of Platform",
    company: "SecureStack",
  },
];

export default function Testimonials() {
  const { t } = useTranslation();

  return (
    <section id="testimonials" className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">{t("testimonials.title")}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t("testimonials.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-[rgba(17,24,39,0.7)] rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] backdrop-blur-xl hover:border-blue-500/30 transition-colors"
          >
            <div className="text-4xl text-blue-500 mb-4">&ldquo;</div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {testimonial.quote}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-400">
                  {testimonial.title}, {testimonial.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
