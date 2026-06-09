import Script from "next/script";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Proof } from "@/components/landing/Proof";
import { CTA } from "@/components/landing/CTA";
import { FounderSection } from "@/components/FounderSection";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why Next.js instead of WordPress?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WordPress sites are often bloated and slow. Next.js is a modern framework that generates lightning-fast static pages, resulting in better user experience and higher Google rankings."
      }
    },
    {
      "@type": "Question",
      "name": "How does AI automation work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We build custom systems (chatbots, internal workflows) that handle repetitive tasks like lead qualification, scheduling, and customer support, saving you hours every week."
      }
    },
    {
      "@type": "Question",
      "name": "Do you only work with Tri-Cities businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While we specialize in Richland, Kennewick, and Pasco, we help service-based businesses across the Pacific Northwest who want to modernize their operations."
      }
    },
    {
      "@type": "Question",
      "name": "What is 'Pay Per Lead' generation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Instead of paying for ads and hoping they work, we build a lead-capture system and you only pay for verified, qualified leads that land in your inbox."
      }
    }
  ]
};

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Services />
      <HowItWorks />
      <Proof />
      <FounderSection />
      <CTA />
    </main>
  );
}
