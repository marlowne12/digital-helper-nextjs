import type { Metadata } from "next";
import { LocationsContent } from "./LocationsContent";

export const metadata: Metadata = {
    title: "Service Areas | Richland, Kennewick, Pasco & West Richland",
    description: "Digital Helper serves businesses across the Tri-Cities: Richland, Kennewick, Pasco & West Richland. Local web design, SEO, and AI automation experts.",
    keywords: ["tri-cities web design", "richland digital marketing", "kennewick seo", "pasco web developer", "west richland marketing"],
    alternates: {
        canonical: "/locations",
    },
    openGraph: {
        title: "Tri-Cities Service Areas | Digital Helper",
        description: "Serving Richland, Kennewick, Pasco & West Richland with web design, SEO, and AI automation services.",
        url: "https://digital-helper.com/locations",
        images: ["/og-image.png"],
    },
};

export default function LocationsPage() {
    return <LocationsContent />;
}
