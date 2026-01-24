import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Toaster } from "@/components/ui/toaster";
import { ChatWidget } from "@/components/ChatWidget";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { SocialProofTicker } from "@/components/SocialProofTicker";
import Script from "next/script";


const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"]
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: {
    default: "Modern Web Design in Richland, WA | Digital Helper",
    template: "%s | Digital Helper"
  },
  description: "Digital Helper transforms outdated local business websites in Richland, WA into modern, high-converting sites. Web design, mobile optimization & AI-powered content.",
  keywords: ["web design richland wa", "seo tri-cities", "ai automation agency", "local business marketing", "nextjs developer richland"],
  authors: [{ name: "Mars" }],
  creator: "Digital Helper",
  publisher: "Digital Helper",
  metadataBase: new URL("https://digital-helper.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digital-helper.com",
    siteName: "Digital Helper",
    title: "Digital Helper | Modern Web Design & AI Automation in Richland, WA",
    description: "Web design, SEO, and AI automation systems that generate leads and scale your business.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Helper - Modern Web Design & AI Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Helper | Modern Web Design & AI Automation",
    description: "Transform your online presence with Richland's local digital experts.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Digital Helper",
    "image": "https://digital-helper.com/logo.png",
    "@id": "https://digital-helper.com",
    "url": "https://digital-helper.com",
    "logo": "https://digital-helper.com/logo.png",
    "telephone": "+1-509-987-5060",
    "priceRange": "$$",
    "potentialAction": {
      "@type": "ReserveAction",
      "target": "https://calendar.app.google/jFDgyirZ2xZZ6kRU8",
      "result": {
        "@type": "Reservation",
        "name": "Free Strategy Call"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Richland",
      "addressRegion": "WA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 46.2857,
      "longitude": -119.2845
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://github.com/marlowne12",
      "https://calendar.app.google/jFDgyirZ2xZZ6kRU8",
      "https://maps.app.goo.gl/zqStKbjf2iUg21Lg8"
    ]
  };

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${syne.variable} font-sans`} suppressHydrationWarning>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
        <Footer />
        <ChatWidget />
        <ExitIntentPopup />
        <SocialProofTicker />
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
