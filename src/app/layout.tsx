import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LazyChat } from "@/components/LazyChat";
import { Contact } from "@/components/Contact";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { LocalBusinessSchema, WebSiteSchema } from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digital-helper.com"),
  title: {
    default: "Modern Web Design & SEO in Richland, WA | Digital Helper Agency",
    template: "%s | Digital Helper Agency",
  },
  description:
    "Digital Helper transforms outdated local business websites in Richland, WA into modern, high-converting sites. Web design, local SEO, AI automation & mobile optimization for Tri-Cities businesses.",
  keywords: [
    "web design Richland WA",
    "local SEO Tri-Cities",
    "website design Kennewick",
    "AI automation Pasco",
    "digital agency Tri-Cities",
    "mobile website optimization",
    "small business web design",
  ],
  authors: [{ name: "Digital Helper Agency" }],
  creator: "Digital Helper Agency",
  publisher: "Digital Helper Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Digital Helper Agency",
    title: "Modern Web Design & SEO in Richland, WA | Digital Helper Agency",
    description:
      "Transform your Tri-Cities business with modern web design, local SEO, and AI automation. Serving Richland, Kennewick, and Pasco.",
    url: "https://digital-helper.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Helper Agency - Web Design, SEO & AI Automation in Richland, WA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Helper Agency - Web Design & SEO in Richland, WA",
    description:
      "Transform your Tri-Cities business with modern web design, local SEO, and AI automation.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
  alternates: {
    canonical: "https://digital-helper.com",
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
      <body className={dmSans.className} suppressHydrationWarning>
        <LocalBusinessSchema />
        <WebSiteSchema />
        <Navbar />
        <main>{children}</main>
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
        <Footer />
        <LazyChat />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
