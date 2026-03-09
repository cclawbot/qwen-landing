// Integrations showcase component
// Shows ecosystem partners that work with Qwen API

export default function Integrations() {
  const integrations = [
    { name: "LangChain", color: "#02569D" },
    { name: "LangGraph", color: "#7B3CB5" },
    { name: "OpenAI SDK", color: "#412991" },
    { name: "Anthropic SDK", color: "#D97757" },
    { name: "Vercel AI", color: "#000" },
    { name: "Replit Agent", color: "#F5A623" },
    { name: "Cursor", color: "#4A90D9" },
    { name: "Windsurf", color: "#6B4FFF" },
    { name: "VS Code", color: "#007ACC" },
    { name: "GitHub Copilot", color: "#238636" },
    { name: "Ollama", color: "#FF6B35" },
    { name: "Docker", color: "#2496ED" },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: 'rgba(30, 30, 30, 0.3)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Works With Your Stack
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Qwen integrates seamlessly with popular developer tools and frameworks you already use.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="p-4 rounded-xl border backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-default"
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderColor: 'var(--border-color)',
              }}
              title={integration.name}
            >
              <div className="h-12 flex items-center justify-center">
                {/* Placeholder logo with first letter */}
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: integration.color }}
                >
                  {integration.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                </div>
              </div>
              <p className="text-center text-sm font-medium mt-2 truncate" style={{ color: 'var(--text-secondary)' }}>
                {integration.name}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-sm" style={{ color: 'var(--text-secondary)' }}>
          And hundreds more via OpenAI-compatible APIs...
        </p>
      </div>
    </section>
  );
}
