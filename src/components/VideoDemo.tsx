"use client";

import { useState, useEffect } from "react";

export default function VideoDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">See QwenResell in Action</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Watch how easy it is to integrate Qwen API tokens into your enterprise workflow.
          </p>
        </div>

        {/* Video Thumbnail */}
        <div 
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
          style={{ aspectRatio: '16/9', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
          onClick={() => setIsModalOpen(true)}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          
          {/* Placeholder Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{ 
              backgroundImage: `repeating-linear-gradient(45deg, var(--accent-purple) 0px, var(--accent-purple) 2px, transparent 2px, transparent 8px)` 
            }} />
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              aria-label="Play video"
              className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xl"
              style={{ backgroundColor: 'var(--accent-purple)' }}
            >
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5V19L19 12L8 5Z" fill="white"/>
              </svg>
            </button>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
            <div>
              <p className="text-white font-medium">Product Demo</p>
              <p className="text-white/70 text-sm">2:34 • 1080p</p>
            </div>
            <div className="text-white/70 text-sm">
              Click to play
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            { icon: '⚡', text: '5 min setup' },
            { icon: '🔐', text: 'Enterprise secure' },
            { icon: '💰', text: 'Up to 99% savings' }
          ].map((item, i) => (
            <div 
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
            >
              <span>{item.icon}</span>
              <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9', backgroundColor: 'var(--card-bg)' }}>
            {/* Close Button */}
            <button 
              aria-label="Close"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Placeholder Video Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--accent-purple)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Video Demo Coming Soon</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  We&apos;re preparing a comprehensive demo video. In the meantime, check out our documentation or join the waitlist for early access.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
