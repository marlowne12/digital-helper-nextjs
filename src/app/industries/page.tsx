import type { Metadata } from "next";
import IndustriesPageContent from "./IndustriesPageContent";

export const metadata: Metadata = {
  title: "Industries We Serve | Tri-Cities Web Design",
  description:
    "Specialized web design and digital marketing for Tri-Cities industries: healthcare, manufacturing, agriculture, retail, and wineries. Local expertise for local businesses.",
  keywords: [
    "healthcare web design tri-cities",
    "manufacturing website kennewick",
    "winery website richland",
    "retail ecommerce pasco",
    "agriculture digital marketing",
  ],
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industries We Serve | Tri-Cities Web Design & Marketing",
    description:
      "Specialized digital solutions for healthcare, manufacturing, agriculture, retail, and wineries in the Tri-Cities.",
    url: "https://digital-helper.com/industries",
  },
};

export default function IndustriesPage() {
  return <IndustriesPageContent />;
}
