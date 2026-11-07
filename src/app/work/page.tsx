import type { Metadata } from "next";
import { WorkPage as WorkView } from "@/components/dh/pages/WorkPage";

export const metadata: Metadata = {
  title: "Portfolio | Tri-Cities Web Design Projects",
  description:
    "Sample websites designed for Tri-Cities trades: HVAC, landscaping and pest control. See how digital Helper builds call-first sites for Richland, Kennewick and Pasco businesses.",
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
    title: "Sample Work | Tri-Cities Web Design",
    description:
      "Sample websites designed for Tri-Cities trades, built call-first for phones.",
    url: "https://digital-helper.com/work",
  },
};

export default function WorkPage() {
  return <WorkView />;
}
