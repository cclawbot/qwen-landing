"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";

interface NewsletterProps {
  onView?: () => void;
  onSubmit?: (email: string) => void;
}

export default function Newsletter({ onView, onSubmit }: NewsletterProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState(false);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    if (!hasTrackedView.current) {
      hasTrackedView.current = true;
      onView?.();
    }
  }, [onView]);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!email.trim()) {
      setError(t("newsletter.errors.emailRequired") || "Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError(t("newsletter.errors.invalidEmail") || "Please enter a valid email");
      return;
    }

    setError("");
    onSubmit?.(email);
    setSuccess(true);
    console.log("[Newsletter] Subscribed:", email);
  };

  if (success) {
    return (
      <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center p-10 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2">{t("newsletter.success.title") || "You're in!"}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{t("newsletter.success.message") || "Thanks for subscribing. We'll send updates to your inbox."}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" style={{ background: 'var(--bg-secondary)' }} id="newsletter">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto text-center p-10 rounded-3xl border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-2xl font-bold mb-3">{t("newsletter.title") || "Stay Updated"}</h3>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{t("newsletter.subtitle") || "Get the latest on Qwen pricing and API updates."}</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (touched && error) setError("");
                }}
                onBlur={() => setTouched(true)}
                placeholder={t("newsletter.placeholder") || "Enter your email"}
                className="w-full px-5 py-4 rounded-xl border-2 transition-all outline-none"
                style={{ 
                  backgroundColor: 'var(--input-bg)',
                  borderColor: error ? '#ef4444' : 'var(--input-border)',
                  color: 'var(--text-primary)'
                }}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full px-8 py-4 rounded-xl font-bold transition-all"
              style={{ backgroundColor: 'var(--accent-purple)', color: 'white' }}
            >
              {t("newsletter.button") || "Subscribe"}
            </button>
          </form>
          
          <p className="mt-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
            {t("newsletter.privacy") || "We respect your privacy. Unsubscribe anytime."}
          </p>
        </div>
      </div>
    </section>
  );
}
