"use client";

import { useState } from "react";
import { trackFaqClicked } from "@/lib/analytics";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How much can we actually save?",
    answer: "Our pricing is up to 99% cheaper than Anthropic Claude and 92% cheaper than OpenAI GPT-5. For example, Claude Opus 4.6 costs $25/output token while Qwen Plus is only $0.78 - that's 97% savings.",
  },
  {
    id: 2,
    question: "How do we get started?",
    answer: "Join our waitlist! We're onboarding B2B partners in cohorts to ensure stability. Once accepted, you'll receive API credentials and documentation to integrate within minutes.",
  },
  {
    id: 3,
    question: "Do you offer volume discounts?",
    answer: "Yes! Our pricing already includes volume tiers. The more you use, the cheaper it gets. Contact sales for custom enterprise agreements above 5B tokens/month.",
  },
  {
    id: 4,
    question: "Is there a free tier?",
    answer: "We offer a starter plan with 10M tokens/month for proof-of-concept testing. No credit card required.",
  },
  {
    id: 5,
    question: "What enterprise features do you support?",
    answer: "SOC2 Type II compliance, custom SLAs (99.99% uptime), dedicated account management, on-premise deployment options, and localized data residency in US, EU, and Asia-Pacific regions.",
  },
  {
    id: 6,
    question: "How is Qwen different from other models?",
    answer: "Qwen 2.5 (Alibaba) offers frontier-level reasoning at a fraction of the cost. It's particularly strong for code generation, math, and multilingual tasks - often matching or exceeding Claude 3.5 Sonnet performance.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    if (openId !== id) {
      trackFaqClicked(`question-${id}`);
    }
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-gray-900/30 py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Can&apos;t find the answer you&apos;re looking for?{" "}
          <a href="#waitlist" className="text-blue-400 hover:text-blue-300">
            Contact us
          </a>.
        </p>

        <div className="bg-[rgba(17,24,39,0.7)] rounded-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-xl overflow-hidden">
          <div className="p-2">
            {faqItems.map((item) => (
              <div key={item.id} className="border-b border-gray-800 last:border-b-0">
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full py-5 flex justify-between items-center text-left hover:text-blue-400 transition-colors group"
                  aria-expanded={openId === item.id}
                >
                  <span className="text-lg font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                    {item.question}
                  </span>
                  <span className="ml-4 flex-shrink-0">
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                        openId === item.id ? "rotate-45" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openId === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-400 pb-5 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
