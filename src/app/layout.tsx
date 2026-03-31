import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { NavbarV2 } from "@/components/v2/NavbarV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { LazyChat } from "@/components/LazyChat";
import { LocalBusinessSchema, WebSiteSchema } from "@/components/StructuredData";
import { ABTestProvider } from "@/components/ABTestProvider";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { MobileScrollOptimizer } from "@/components/MobileScrollOptimizer";
import { MobileCallButton } from "@/components/MobileCallButton";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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
  return (
    <html lang="en" className={`dark scroll-smooth ${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <link rel="preconnect" href="https://generativelanguage.googleapis.com" />
      </head>
      <body className={`${dmSans.className} overflow-x-hidden`} suppressHydrationWarning>
        <ABTestProvider>
          <MobileScrollOptimizer />
          <LocalBusinessSchema />
          <WebSiteSchema />
          <NavbarV2 />
          <main>{children}</main>
          <FooterV2 />
          <LazyChat />
          <ExitIntentPopup />
          <MobileBottomNav />
          <MobileCallButton />
        </ABTestProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
