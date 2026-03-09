"use client";

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
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Join 500+ companies already saving with QwenResell</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-8 rounded-2xl border backdrop-blur-xl transition-colors"
            style={{ 
              backgroundColor: 'var(--card-bg)', 
              borderColor: 'var(--border-color)',
              boxShadow: '0 4px 20px var(--shadow-color)'
            }}
          >
            <div className="text-4xl mb-4" style={{ color: 'var(--accent-purple)' }}>&ldquo;</div>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-primary)' }}>{testimonial.quote}</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' }}>
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{testimonial.name}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{testimonial.title}, {testimonial.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
