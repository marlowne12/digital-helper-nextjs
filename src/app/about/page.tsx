import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About Digital Helper | Tri-Cities Web Design Agency",
  description:
    "Local web design and SEO agency based in Richland, WA serving the Tri-Cities. Modern Next.js websites, AI automation, and results-driven digital marketing for local businesses.",
  keywords: [
    "tri cities web design agency",
    "richland web designer",
    "local web development tri-cities",
    "kennewick digital agency",
    "pasco web design",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Digital Helper | Tri-Cities Web Design Agency",
    description:
      "Local web design agency in Richland, WA serving businesses throughout the Tri-Cities with modern websites and AI automation.",
    url: "https://digital-helper.com/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
