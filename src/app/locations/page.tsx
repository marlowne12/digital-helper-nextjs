import type { Metadata } from "next";
import LocationsPageContent from "./LocationsPageContent";

export const metadata: Metadata = {
  title: "Service Areas | Web Design Tri-Cities WA",
  description:
    "Web design and SEO services for businesses throughout the Tri-Cities WA region. Serving Richland, Kennewick, Pasco, and West Richland with local expertise.",
  keywords: [
    "web design richland wa",
    "web design kennewick wa",
    "web design pasco wa",
    "seo west richland",
    "tri-cities web development",
  ],
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "Service Areas | Tri-Cities Web Design & SEO",
    description:
      "Local web design and SEO for Richland, Kennewick, Pasco & West Richland businesses.",
    url: "https://digital-helper.com/locations",
  },
};

export default function LocationsPage() {
  return <LocationsPageContent />;
}
