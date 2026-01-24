import type { Metadata } from "next"
import { WebDesignPageContent } from "@/components/services/WebDesignPageContent"

export const metadata: Metadata = {
    title: "Web Design Services | High-Performance Websites in Richland, WA",
    description: "Modern, blazing-fast websites built with Next.js. We design conversion-focused sites that load in under 1 second and turn visitors into customers.",
    keywords: ["web design richland wa", "nextjs developer tri-cities", "fast website design", "mobile-first web development", "modern website design"],
    openGraph: {
        title: "Web Design Services | Digital Helper",
        description: "High-performance websites that work as hard as you do. Sub-second load times, mobile-first design, and conversion-focused layouts.",
        url: "https://digital-helper.com/services/web-design",
        images: [
            {
                url: "/og-web-design.png",
                width: 1200,
                height: 630,
                alt: "Digital Helper Web Design - Modern, High-Performance Websites",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Web Design Services | Digital Helper",
        description: "Websites that convert. Modern Next.js development for Richland businesses.",
        images: ["/og-web-design.png"],
    },
    alternates: {
        canonical: "/services/web-design",
    },
}

export default function WebDesignPage() {
    return <WebDesignPageContent />
}
