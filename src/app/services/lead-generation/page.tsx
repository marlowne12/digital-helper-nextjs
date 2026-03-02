import type { Metadata } from "next"
import { LeadGenerationPageContent } from "@/components/services/LeadGenerationPageContent"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "Lead Generation Services | Qualified Leads Delivered to Your Inbox",
    description: "Pay-per-lead model with zero risk. We find, qualify, and deliver leads directly to you using automated prospecting systems. Predictable pipeline, predictable growth.",
    keywords: ["lead generation richland", "pay per lead tri-cities", "b2b lead generation", "qualified leads service", "automated prospecting"],
    openGraph: {
        title: "Lead Generation Services | Digital Helper",
        description: "Stop chasing. Start closing. Qualified leads delivered directly to your inbox with our pay-per-lead model.",
        url: "https://digital-helper.com/services/lead-generation",
        images: [
            {
                url: "/og-lead-generation.png",
                width: 1200,
                height: 630,
                alt: "Digital Helper Lead Generation - Qualified Leads On Demand",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Lead Generation Services | Digital Helper",
        description: "Performance-based lead generation for Richland businesses.",
        images: ["/og-lead-generation.png"],
    },
    alternates: {
        canonical: "/services/lead-generation",
    },
}

const leadGenFaqs = [
    {
        q: "How does the pay-per-lead model work?",
        a: "You only pay for leads that meet our agreed-upon qualification criteria. No monthly retainers, no management fees—just results.",
    },
    {
        q: "What defines a 'qualified' lead?",
        a: "We work with you to define specific filters (location, budget, service type). If a lead doesn't match your criteria, you don't pay for it.",
    },
    {
        q: "Do you use cold calling?",
        a: "We focus on digital prospecting and AI-driven outreach. Our systems find prospects when they are showing intent or matching your ideal customer profile.",
    },
    {
        q: "Can I scale the lead flow up or down?",
        a: "Absolutely. Our systems are built to be flexible. If you have too many leads, we can pause or narrow the filters. If you need more, we can broaden the reach.",
    },
]

export default function LeadGenerationPage() {
    return (
        <>
            <ServiceSchema
                name="Lead Generation Services"
                description="Pay-per-lead model with zero risk. We find, qualify, and deliver leads directly to you using automated prospecting systems. Predictable pipeline, predictable growth for Tri-Cities businesses."
                url="https://digital-helper.com/services/lead-generation"
            />
            <FAQPageSchema faqs={leadGenFaqs} />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Services", url: "https://digital-helper.com/services" },
                    { name: "Lead Generation", url: "https://digital-helper.com/services/lead-generation" },
                ]}
            />
            <LeadGenerationPageContent />
        </>
    )
}
