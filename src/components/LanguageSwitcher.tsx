"use client";

import { useState } from "react";
import { useTranslation, Language, languageNames } from "@/lib/i18n";

const flagEmojis: Record<Language, string> = {
  en: "🇺🇸",
  zh: "🇨🇳",
  es: "🇪🇸",
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = ["en", "zh", "es"];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
        aria-label={`Switch language. Current: ${languageNames[language]}`}
      >
        <span>{flagEmojis[language]}</span>
        <span>{languageNames[language]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                  language === lang
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span>{flagEmojis[lang]}</span>
                <span>{languageNames[lang]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
