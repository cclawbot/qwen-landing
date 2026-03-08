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
    question: "How much can I save with QwenResell?",
    answer: "Our reseller pricing delivers up to 99% savings compared to GPT-5.4 Pro. For example, Qwen Plus costs just $0.26 per 1M input tokens vs $30.00 for GPT-5.4 Pro. Most enterprise customers save between $500K and $3M annually by switching from Anthropic and OpenAI.",
  },
  {
    id: 2,
    question: "How do I get started?",
    answer: "Simply join the waitlist above. Once we launch, you'll receive an API key within 24 hours. Our API is fully compatible with OpenAI's SDK—just change the base URL and API key. We provide free migration support for teams switching from other providers.",
  },
  {
    id: 3,
    question: "What volume discounts do you offer?",
    answer: "We offer tiered pricing for high-volume users. Above 100M tokens/month, you qualify for enterprise rates. Above 1B tokens/month, we offer custom contracts with dedicated infrastructure. Contact our sales team for a personalized quote.",
  },
  {
    id: 4,
    question: "Is there a free tier?",
    answer: "Yes! New accounts receive 1M free tokens on signup to test the API. This lets you evaluate response quality before committing. No credit card required. After the free tier, our Lite plan starts at just $9/month for 10M tokens.",
  },
  {
    id: 5,
    question: "What enterprise features are available?",
    answer: "Enterprise customers get dedicated API endpoints, 99.99% SLA guarantees, custom rate limits, priority support with 15-minute response times, detailed usage analytics, and localized data residency options across US, EU, and Asia-Pacific regions.",
  },
  {
    id: 6,
    question: "How is the API different from direct Alibaba Cloud?",
    answer: "QwenResell provides simplified billing, English-language support, US-based customer success team, unified pricing across all Qwen models, and volume discounts we negotiate on your behalf. We handle the integration complexity so you can focus on building.",
  },
];

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex justify-between items-center text-left hover:text-blue-400 transition-colors group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
          {item.question}
        </span>
        <span className="ml-4 flex-shrink-0">
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
              isOpen ? "rotate-45" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-400 pb-5 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    if (openId !== id) {
      // Track when opening a new question (not when closing)
      trackFaqClicked(`question-${id}`);
    }
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-gray-900/30 py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Got questions? We&apos;ve got answers. Can&apos;t find what you&apos;re looking for?{" "}
          <a href="#waitlist" className="text-blue-400 hover:text-blue-300">
            Contact us
          </a>.
        </p>

        <div className="bg-[rgba(17,24,39,0.7)] rounded-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-xl overflow-hidden">
          <div className="p-2">
            {faqItems.map((item) => (
              <FAQItemComponent
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
