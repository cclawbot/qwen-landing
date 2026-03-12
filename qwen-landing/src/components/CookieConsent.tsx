"use client";

import { useState, useEffect } from "react";

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Delay showing banner for a smoother experience
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (consent: CookieConsent) => {
    localStorage.setItem("cookie_consent", JSON.stringify(consent));
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
  };

  const handleSavePreferences = () => {
    saveConsent({
      essential: true,
      analytics,
      marketing,
      timestamp: Date.now(),
    });
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 border-t transition-all duration-300"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <p className="mb-2">
                <strong style={{ color: "var(--text-primary)" }}>We use cookies</strong> to improve your experience and analyze site traffic.
              </p>
              <p className="text-xs">
                By clicking &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                <a href="#" className="underline hover:opacity-80">Learn more</a>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 text-sm font-medium rounded-lg border transition-all hover:opacity-80"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                Preferences
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium rounded-lg border transition-all hover:opacity-80"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
                style={{
                  backgroundColor: "var(--accent-purple)",
                  color: "white",
                }}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-md border"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border-color)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-xl font-bold mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Cookie Preferences
            </h3>

            <div className="space-y-4 mb-6">
              {/* Essential Cookies */}
              <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--border-color)" }}>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                    Essential Cookies
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Required for the site to function. Cannot be disabled.
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="w-5 h-5 rounded cursor-not-allowed accent-purple-500"
                  />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "var(--border-color)" }}>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                    Analytics Cookies
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Help us understand how visitors interact with our site.
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="w-5 h-5 rounded cursor-pointer accent-purple-500"
                    style={{ accentColor: "var(--accent-purple)" }}
                  />
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                    Marketing Cookies
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Used to track visitors across websites for ad targeting.
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="w-5 h-5 rounded cursor-pointer accent-purple-500"
                    style={{ accentColor: "var(--accent-purple)" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium rounded-lg border transition-all hover:opacity-80"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "var(--border-color)",
                  color: "var(--text-primary)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all"
                style={{
                  backgroundColor: "var(--accent-purple)",
                  color: "white",
                }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
