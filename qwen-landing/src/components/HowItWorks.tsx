export default function HowItWorks() {
  return (
    <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Get started with Qwen API in three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center p-8 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--accent-purple-bg)' }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-purple)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div className="text-sm font-medium mb-2" style={{ color: 'var(--accent-purple)' }}>Step 1</div>
            <h3 className="text-xl font-bold mb-3">Create Account</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Sign up with your email. No credit card required for the waitlist.</p>
          </div>

          {/* Step 2 */}
          <div className="text-center p-8 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--accent-purple-bg)' }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-purple)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div className="text-sm font-medium mb-2" style={{ color: 'var(--accent-purple)' }}>Step 2</div>
            <h3 className="text-xl font-bold mb-3">Get API Key</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Receive your unique API key instantly. Includes free tier credits.</p>
          </div>

          {/* Step 3 */}
          <div className="text-center p-8 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--accent-purple-bg)' }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-purple)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-sm font-medium mb-2" style={{ color: 'var(--accent-purple)' }}>Step 3</div>
            <h3 className="text-xl font-bold mb-3">Start Building</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Integrate the API into your app. Full documentation and SDKs available.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
