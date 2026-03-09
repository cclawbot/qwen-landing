export default function EnhancedFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-16" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center italic text-sm" 
                style={{ backgroundColor: 'var(--accent-purple)' }}
              >
                Q
              </div>
              QwenResell
            </div>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Enterprise Qwen API tokens at up to 99% savings. Built for B2B aggregators and high-volume workloads.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', border: '1px solid' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', border: '1px solid' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', border: '1px solid' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><a href="#pricing" className="hover:opacity-80 transition">Pricing</a></li>
              <li><a href="#features" className="hover:opacity-80 transition">Features</a></li>
              <li><a href="#waitlist" className="hover:opacity-80 transition">Join Waitlist</a></li>
              <li><a href="#integrations" className="hover:opacity-80 transition">Integrations</a></li>
              <li><a href="#blog" className="hover:opacity-80 transition">Blog</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><a href="#about" className="hover:opacity-80 transition">About Us</a></li>
              <li><a href="#team" className="hover:opacity-80 transition">Team</a></li>
              <li><a href="#careers" className="hover:opacity-80 transition">Careers</a></li>
              <li><a href="#contact" className="hover:opacity-80 transition">Contact</a></li>
              <li><a href="#case-studies" className="hover:opacity-80 transition">Case Studies</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><a href="#" className="hover:opacity-80 transition">Documentation</a></li>
              <li><a href="#" className="hover:opacity-80 transition">API Reference</a></li>
              <li><a href="#" className="hover:opacity-80 transition">Status</a></li>
              <li><a href="#" className="hover:opacity-80 transition">Changelog</a></li>
              <li><a href="#faq" className="hover:opacity-80 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li><a href="#" className="hover:opacity-80 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-80 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:opacity-80 transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:opacity-80 transition">GDPR</a></li>
              <li><a href="#" className="hover:opacity-80 transition">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mb-8" style={{ borderColor: 'var(--border-color)' }}></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p>© {currentYear} QwenResell API Services. All rights reserved.</p>
          <p>Pricing accurate as of March 2026. All trademarks acknowledged.</p>
        </div>
      </div>
    </footer>
  );
}
