import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Services | Web Design & SEO Tri-Cities WA",
  description:
    "Professional web design, local SEO, AI automation, and lead generation services for Tri-Cities businesses. Serving Richland, Kennewick, Pasco & West Richland.",
  keywords: [
    "web design services tri-cities",
    "local seo tri-cities wa",
    "ai automation richland",
    "lead generation kennewick",
    "digital marketing pasco",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Marketing Services | Tri-Cities Web Design & SEO",
    description:
      "Web design, SEO, AI automation, and lead generation for Tri-Cities WA businesses.",
    url: "https://digital-helper.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
