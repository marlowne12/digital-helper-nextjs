import type { Metadata } from "next";
import Script from "next/script";
import { HomePage } from "@/components/dh/pages/HomePage";

export const metadata: Metadata = {
  title: { absolute: "Web Design & Lead Generation for Tri-Cities Trades | digital Helper" },
  description:
    "Websites, Google profiles and follow-up systems that turn more calls into booked jobs for Richland, Kennewick and Pasco trades. Book a free 30-minute diagnostic.",
  alternates: {
    canonical: "/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What happens on the free diagnostic call?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Thirty minutes on how customers find you, what happens after they inquire, and where time gets lost. You leave with a clear first step, whether or not you work with us."
      }
    },
    {
      "@type": "Question",
      "name": "I already have a website and some tools. Do I start over?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. We start from what you have, keep what works, and connect or replace only the parts that are holding you back."
      }
    },
    {
      "@type": "Question",
      "name": "Can I start with just one service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Start with your website, lead generation or one automation. Each piece is built to connect to the others later, so the first one stays useful as you grow."
      }
    },
    {
      "@type": "Question",
      "name": "Who owns the website and systems?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You do. The site, code, lists, accounts and automations are set up in your name."
      }
    },
    {
      "@type": "Question",
      "name": "What does it cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Website Sprint starts at $2,500, and the first 3 Tri-Cities founding clients get it for $1,500. Growth System starts at $1,500 per month and Full-Stack Partner at $3,500 per month. Your quote depends on the scope we agree together."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to know how to code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Bring the business problem. We handle the technical work and explain decisions, progress and results in plain English."
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePage />
    </>
  );
}
