import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://qwenresell.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "QwenResell | Enterprise Qwen API Tokens",
    template: "%s | QwenResell",
  },
  description:
    "92% cheaper than Anthropic - Qwen API for B2B. Access Alibaba's Qwen 0728 architecture with up to 99% savings on LLM tokens. Enterprise-ready with SOC2 compliance.",
  keywords: [
    "Qwen API",
    "Qwen 2.5",
    "AI tokens",
    "LLM pricing",
    "Alibaba Qwen",
    "Claude alternative",
    "GPT alternative",
    "enterprise AI",
    "API tokens",
    "LLM API",
    "cheap AI API",
    "B2B AI",
  ],
  authors: [{ name: "QwenResell" }],
  creator: "QwenResell",
  publisher: "QwenResell",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "QwenResell",
    title: "QwenResell | Enterprise Qwen API Tokens",
    description:
      "92% cheaper than Anthropic - Qwen API for B2B. Access Alibaba's Qwen 0728 architecture with up to 99% savings on LLM tokens.",
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "QwenResell - Enterprise Qwen API at 92% cheaper pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QwenResell | Enterprise Qwen API Tokens",
    description:
      "92% cheaper than Anthropic. Access Alibaba's Qwen API with up to 99% savings. Enterprise-ready.",
    creator: "@qwenresell",
    images: [`${siteUrl}/og-image.svg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "QwenResell",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
        description:
          "Enterprise Qwen API reseller offering up to 99% savings on LLM tokens compared to Anthropic and OpenAI.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "QwenResell",
        publisher: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How much can we actually save?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our pricing is up to 99% cheaper than Anthropic Claude and 92% cheaper than OpenAI GPT-5. For example, Claude Opus 4.6 costs $25/output token while Qwen Plus is only $0.78 - that's 97% savings.",
            },
          },
          {
            "@type": "Question",
            name: "How do we get started?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Join our waitlist! We're onboarding B2B partners in cohorts to ensure stability. Once accepted, you'll receive API credentials and documentation to integrate within minutes.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer volume discounts?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! Our pricing already includes volume tiers. The more you use, the cheaper it gets. Contact sales for custom enterprise agreements above 5B tokens/month.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a free tier?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We offer a starter plan with 10M tokens/month for proof-of-concept testing. No credit card required.",
            },
          },
          {
            "@type": "Question",
            name: "What enterprise features do you support?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "SOC2 Type II compliance, custom SLAs (99.99% uptime), dedicated account management, on-premise deployment options, and localized data residency in US, EU, and Asia-Pacific regions.",
            },
          },
          {
            "@type": "Question",
            name: "How is Qwen different from other models?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Qwen 2.5 (Alibaba) offers frontier-level reasoning at a fraction of the cost. It's particularly strong for code generation, math, and multilingual tasks - often matching or exceeding Claude 3.5 Sonnet performance.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1e3a8a" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
