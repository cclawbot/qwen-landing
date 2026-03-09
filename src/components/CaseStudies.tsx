/**
 * Case Studies Section - Detailed Customer Success Stories
 * Placed between Team and Testimonials for optimal conversion flow
 */
export default function CaseStudies() {
  const caseStudies = [
    {
      company: "DataFlow AI",
      industry: "Enterprise SaaS",
      challenge: "Scaling NLP pipelines for 50M+ daily requests while managing costs",
      solution: "Migrated from GPT-4 to Qwen 0728 via QwenResell for non-thinking tasks",
      metrics: [
        { value: "87%", label: "Cost Reduction" },
        { value: "3.2x", label: "Throughput" },
      ],
    },
    {
      company: "TechCorp Global",
      industry: "Financial Services",
      challenge: "Compliance requirements demanded data residency and audit trails",
      solution: "Deployed QwenResell with EU data residency and full audit logging",
      metrics: [
        { value: "100%", label: "Compliance" },
        { value: "$1.8M", label: "Annual Savings" },
      ],
    },
    {
      company: "ScaleUp Labs",
      industry: "Healthcare Tech",
      challenge: "Needed reliable API for patient communication automation",
      solution: "Implemented QwenResell with enterprise SLA and 99.99% uptime guarantee",
      metrics: [
        { value: "99.99%", label: "Uptime" },
        { value: "12K", label: "Daily Patients" },
      ],
    },
  ];

  return (
    <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            See how enterprises are saving with QwenResell
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
                boxShadow: '0 4px 20px var(--shadow-color)'
              }}
            >
              {/* Company Name & Industry */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{study.company}</h3>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--accent-purple-bg)', color: 'var(--accent-purple)' }}>
                  {study.industry}
                </span>
              </div>

              {/* Challenge */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Challenge
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {study.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Solution
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {study.solution}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                {study.metrics.map((metric, mIndex) => (
                  <div key={mIndex} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: 'var(--accent-purple)' }}>{metric.value}</div>
                    <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
