import type { Metadata } from "next"
import { WebDesignPageContent } from "@/components/services/WebDesignPageContent"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/StructuredData"

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
        canonical: "/web-design",
    },
}

const webDesignFaqs = [
    {
        q: "Why Next.js instead of WordPress?",
        a: "WordPress is often slow, bloated, and requires constant maintenance. Next.js allows us to build lightning-fast, secure, and SEO-optimized sites that provide a far better user experience and higher conversion rates.",
    },
    {
        q: "How long does a new website take?",
        a: "A typical high-performance site takes 2 to 4 weeks from discovery to launch, depending on the complexity and content requirements.",
    },
    {
        q: "Will I be able to update content myself?",
        a: "Yes! We integrate user-friendly solutions that allow you to update text and images easily without needing any technical knowledge or worrying about breaking the site.",
    },
    {
        q: "Is hosting included?",
        a: "We offer high-performance edge hosting as part of our maintenance plans, ensuring your site remains fast and secure 24/7.",
    },
]

export default function WebDesignPage() {
    return (
        <>
            <ServiceSchema
                name="Web Design Services"
                description="Modern, blazing-fast websites built with Next.js. Conversion-focused sites that load in under 1 second and turn visitors into customers. Serving Richland, Kennewick, Pasco, and West Richland, WA."
                url="https://digital-helper.com/services/web-design"
            />
            <FAQPageSchema faqs={webDesignFaqs} />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Services", url: "https://digital-helper.com/services" },
                    { name: "Web Design", url: "https://digital-helper.com/services/web-design" },
                ]}
            />
            <WebDesignPageContent />
        </>
    )
}
