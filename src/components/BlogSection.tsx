"use client";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: "Product Update" | "Tutorial" | "Industry";
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Introducing Enterprise Volume Pricing",
    excerpt: "New tiered pricing structure now available for high-volume customers. Save up to 99% on bulk token purchases.",
    date: "Mar 5, 2026",
    category: "Product Update",
  },
  {
    id: 2,
    title: "How to Build AI Agents with Qwen API",
    excerpt: "Step-by-step tutorial on building production-ready AI agents using Qwen's latest 0728 architecture.",
    date: "Feb 28, 2026",
    category: "Tutorial",
  },
  {
    id: 3,
    title: "The Future of Language Models in 2026",
    excerpt: "Industry analysis on how reasoning models are transforming enterprise automation and B2B workflows.",
    date: "Feb 20, 2026",
    category: "Industry",
  },
];

const categoryColors: Record<BlogPost["category"], { bg: string; text: string }> = {
  "Product Update": { bg: "var(--accent-purple-bg)", text: "var(--accent-purple)" },
  Tutorial: { bg: "var(--accent-green-bg)", text: "var(--accent-green)" },
  Industry: { bg: "var(--accent-purple-bg)", text: "var(--accent-purple)" },
};

export default function BlogSection() {
  return (
    <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Latest Updates & Tutorials</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Insights from the QwenResell team</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const colors = categoryColors[post.category];
            return (
              <article
                key={post.id}
                className="p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  borderColor: 'var(--border-color)',
                  boxShadow: '0 4px 20px var(--shadow-color)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: colors.bg, color: colors.text }}>
                    {post.category}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium" style={{ color: 'var(--accent-purple)' }}>
                  Read more →
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
