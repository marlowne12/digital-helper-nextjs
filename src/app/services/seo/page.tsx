import type { Metadata } from "next"
import { SEOPageContent } from "@/components/services/SEOPageContent"

export const metadata: Metadata = {
    title: "Local SEO Services | Dominate Tri-Cities Search Results",
    description: "Get found first in Richland, Kennewick, and Pasco. Our local SEO services optimize your Google Business Profile, build local citations, and drive qualified leads to your door.",
    keywords: ["local seo richland", "seo tri-cities", "google business profile optimization", "local search marketing", "seo agency richland wa"],
    openGraph: {
        title: "Local SEO Services | Digital Helper",
        description: "Dominate the Tri-Cities Google Map Pack. Our local SEO strategies get your business found first by customers ready to buy.",
        url: "https://digital-helper.com/services/seo",
        images: [
            {
                url: "/og-seo.png",
                width: 1200,
                height: 630,
                alt: "Digital Helper SEO Services - Dominate Local Search",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Local SEO Services | Digital Helper",
        description: "Be seen first in the Tri-Cities. Expert local SEO for Richland businesses.",
        images: ["/og-seo.png"],
    },
    alternates: {
        canonical: "/services/seo",
    },
}

export default function SEOPage() {
    return <SEOPageContent />
}
