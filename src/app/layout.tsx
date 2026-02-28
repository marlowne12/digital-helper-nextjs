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
    default: "Web Design & SEO Tri-Cities WA | Digital Helper",
    template: "%s | Digital Helper"
  },
  description: "Professional web design and local SEO for Tri-Cities businesses. Modern Next.js websites that rank. Serving Richland, Kennewick, Pasco & West Richland.",
  keywords: ["tri cities web design", "tri cities seo", "web design richland wa", "seo kennewick", "web designer pasco", "local seo tri-cities", "web development tri-cities wa"],
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
    title: "Tri-Cities Web Design & SEO | Digital Helper",
    description: "Professional web design and local SEO for Tri-Cities businesses. Modern websites that rank. Serving Richland, Kennewick, Pasco & West Richland WA.",
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
    title: "Tri-Cities Web Design & SEO | Digital Helper",
    description: "Professional web design and local SEO for Tri-Cities WA businesses. Modern websites that rank.",
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
    "@id": "https://digital-helper.com",
    "name": "Digital Helper",
    "image": "https://digital-helper.com/logo.png",
    "url": "https://digital-helper.com",
    "logo": "https://digital-helper.com/logo.png",
    "telephone": "(509) 987-5060",
    "email": "digitalhelperwebsite@gmail.com",
    "priceRange": "$$",
    "description": "Professional web design and local SEO agency serving the Tri-Cities WA. Modern Next.js websites, local SEO, and AI automation for local businesses.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "50",
      "bestRating": "5"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Richland",
        "containedInPlace": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Kennewick",
        "containedInPlace": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "Pasco",
        "containedInPlace": { "@type": "State", "name": "Washington" }
      },
      {
        "@type": "City",
        "name": "West Richland",
        "containedInPlace": { "@type": "State", "name": "Washington" }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Design & Development",
            "description": "Modern, high-performance websites built with Next.js"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local SEO",
            "description": "Search engine optimization for Tri-Cities businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Automation",
            "description": "Chatbots, workflows, and voice AI for business automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Lead Generation",
            "description": "Pay-per-lead systems that deliver qualified prospects"
          }
        }
      ]
    },
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
      "postalCode": "99352",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 46.2857,
      "longitude": -119.2845
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
