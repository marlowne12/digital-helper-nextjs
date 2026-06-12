import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ChatWidget } from "@/components/ChatWidget";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { BUSINESS_INFO } from "@/lib/business-info";
import Script from "next/script";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "AI Automation & Web Design for Tri-Cities Service Businesses | Digital Helper",
    template: "%s | Digital Helper",
  },
  description:
    "AI chatbots, local SEO, and Next.js web design for HVAC, plumbing, and service businesses in Richland, Kennewick & Pasco WA. Your business on autopilot, 24/7.",
  keywords: [
    "ai automation tri-cities",
    "ai chatbot kennewick",
    "tri cities web design",
    "tri cities seo",
    "web design richland wa",
    "seo kennewick",
    "web designer pasco",
    "local seo tri-cities",
    "ai for hvac businesses",
    "ai for plumbers tri-cities",
  ],
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
    title:
      "AI Automation & Web Design for Tri-Cities Service Businesses | Digital Helper",
    description:
      "AI chatbots, local SEO, and fast Next.js websites for HVAC, plumbing, and service businesses in Richland, Kennewick & Pasco WA.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Helper - AI Automation & Web Design for Tri-Cities Service Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Automation & Web Design for Tri-Cities Service Businesses | Digital Helper",
    description:
      "AI chatbots, local SEO, and Next.js websites for service businesses in Richland, Kennewick & Pasco WA.",
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
    name: BUSINESS_INFO.name,
    image: "https://digital-helper.com/logo.png",
    url: BUSINESS_INFO.urls.website,
    logo: "https://digital-helper.com/logo.png",
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    priceRange: BUSINESS_INFO.priceRange,
    description:
      "Professional web design and local SEO agency serving the Tri-Cities WA. Modern Next.js websites, local SEO, and AI automation for local businesses.",
    // aggregateRating intentionally omitted until real, verifiable reviews exist
    // (fabricated review schema risks a Google manual action). Re-add from
    // BUSINESS_INFO.rating once reviews are genuine.
    areaServed: [
      {
        "@type": "City",
        name: "Richland",
        containedInPlace: { "@type": "State", name: "Washington" },
      },
      {
        "@type": "City",
        name: "Kennewick",
        containedInPlace: { "@type": "State", name: "Washington" },
      },
      {
        "@type": "City",
        name: "Pasco",
        containedInPlace: { "@type": "State", name: "Washington" },
      },
      {
        "@type": "City",
        name: "West Richland",
        containedInPlace: { "@type": "State", name: "Washington" },
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design & Development",
            description: "Modern, high-performance websites built with Next.js",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local SEO",
            description: "Search engine optimization for Tri-Cities businesses",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Automation",
            description:
              "Chatbots, workflows, and voice AI for business automation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lead Generation",
            description:
              "Pay-per-lead systems that deliver qualified prospects",
          },
        },
      ],
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: "https://calendar.app.google/jFDgyirZ2xZZ6kRU8",
      result: {
        "@type": "Reservation",
        name: "Free Strategy Call",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS_INFO.address.locality,
      addressRegion: BUSINESS_INFO.address.region,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: BUSINESS_INFO.hours.days,
      opens: BUSINESS_INFO.hours.opens,
      closes: BUSINESS_INFO.hours.closes,
    },
    sameAs: [
      BUSINESS_INFO.urls.github,
      BUSINESS_INFO.urls.calendar,
      BUSINESS_INFO.urls.googleMaps,
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
        <ExitIntentPopup />
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
