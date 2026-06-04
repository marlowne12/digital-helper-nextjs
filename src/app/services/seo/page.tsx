import type { Metadata } from "next"
import { SEOPageContent } from "@/components/services/SEOPageContent"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/StructuredData"

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
        canonical: "/seo",
    },
}

const seoFaqs = [
    {
        q: "How long does it take to see results?",
        a: "Local SEO is a marathon, not a sprint. While some improvements (like GBP optimization) show results in weeks, meaningful Page 1 rankings typically take 3 to 6 months depending on competition.",
    },
    {
        q: "Will I rank #1 on Google?",
        a: "While no one can guarantee #1 rankings (beware of anyone who does), our systems are designed to push you into the 'Map Pack' (top 3) where the vast majority of local leads originate.",
    },
    {
        q: "Do you handle my Google Business Profile?",
        a: "Yes! We manage everything from initial verification and set-up to weekly posts, photo updates, and review monitoring to keep your profile active and favored by Google's algorithm.",
    },
    {
        q: "What is a 'Local Citation'?",
        a: "A citation is any mention of your Name, Address, and Phone (NAP) on other websites like Yelp, YellowPages, or local chambers. Consistent citations are a critical ranking factor for local SEO.",
    },
]

export default function SEOPage() {
    return (
        <>
            <ServiceSchema
                name="Local SEO Services"
                description="Get found first in Richland, Kennewick, and Pasco. Our local SEO services optimize your Google Business Profile, build local citations, and drive qualified leads to your door."
                url="https://digital-helper.com/services/seo"
            />
            <FAQPageSchema faqs={seoFaqs} />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Services", url: "https://digital-helper.com/services" },
                    { name: "SEO", url: "https://digital-helper.com/services/seo" },
                ]}
            />
            <SEOPageContent />
        </>
    )
}
