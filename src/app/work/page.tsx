import type { Metadata } from "next";
import WorkPageContent from "./WorkPageContent";

export const metadata: Metadata = {
  title: "Portfolio | Tri-Cities Web Design Projects",
  description:
    "View our web design and SEO case studies from Tri-Cities businesses. See real results: increased calls, leads, and conversions for Richland, Kennewick, and Pasco clients.",
  keywords: [
    "web design portfolio tri-cities",
    "richland web design examples",
    "kennewick seo case studies",
    "local business website projects",
  ],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Portfolio | Tri-Cities Web Design & SEO Case Studies",
    description:
      "Real results from Tri-Cities businesses. Web design and SEO projects that drive leads and growth.",
    url: "https://digital-helper.com/work",
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}
