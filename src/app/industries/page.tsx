import type { Metadata } from "next";
import { IndustriesContent } from "./IndustriesContent";

export const metadata: Metadata = {
    title: "Industries We Serve | Healthcare, Manufacturing, Wineries & More",
    description: "Specialized digital marketing for Tri-Cities industries: healthcare, manufacturing, agriculture, retail, and wineries. Industry-specific solutions that work.",
    keywords: ["healthcare marketing tri-cities", "manufacturing web design", "winery website design", "agriculture digital marketing", "retail ecommerce tri-cities"],
    alternates: {
        canonical: "/industries",
    },
    openGraph: {
        title: "Industries We Serve | Digital Helper",
        description: "Specialized digital systems for healthcare, manufacturing, agriculture, retail, and wineries in the Tri-Cities.",
        url: "https://digital-helper.com/industries",
        images: ["/og-image.png"],
    },
};

export default function IndustriesPage() {
    return <IndustriesContent />;
}
