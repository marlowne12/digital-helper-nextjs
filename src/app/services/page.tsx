import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
    title: "Digital Marketing Services in Richland, WA",
    description: "Web design, SEO, AI automation, lead generation & reputation management for Tri-Cities businesses. Modern solutions that drive real results.",
    keywords: ["digital marketing services richland wa", "web design tri-cities", "seo services kennewick", "ai automation pasco", "local business marketing"],
    alternates: {
        canonical: "/services",
    },
    openGraph: {
        title: "Digital Marketing Services | Digital Helper",
        description: "From high-performance websites to AI-powered automation. Services built to grow your Tri-Cities business.",
        url: "https://digital-helper.com/services",
        images: ["/og-image.png"],
    },
};

export default function ServicesPage() {
    return <ServicesContent />;
}
