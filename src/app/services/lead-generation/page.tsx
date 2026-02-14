import type { Metadata } from "next"
import { LeadGenerationPageContent } from "@/components/services/LeadGenerationPageContent"

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

export default function LeadGenerationPage() {
    return <LeadGenerationPageContent />
}
