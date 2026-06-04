import type { Metadata } from "next"
import { LocalSEOPageContent } from "@/components/services/LocalSEOPageContent"
import { ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "Local SEO Richland | Rank #1 in the Tri-Cities",
    description: "Expert local SEO for Richland, Kennewick, and Pasco businesses. We optimize for local intent and geographical search domination.",
    keywords: ["local seo richland", "seo tri-cities", "local search marketing", "rank in richland"],
}

export default function LocalSEOPage() {
    return (
        <>
            <ServiceSchema
                name="Local SEO Services — Richland & Tri-Cities"
                description="Expert local SEO for Richland, Kennewick, and Pasco businesses. We optimize for local intent and geographical search domination so you rank #1 in the Tri-Cities."
                url="https://digital-helper.com/services/seo/local-seo"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Services", url: "https://digital-helper.com/services" },
                    { name: "SEO", url: "https://digital-helper.com/services/seo" },
                    { name: "Local SEO", url: "https://digital-helper.com/services/seo/local-seo" },
                ]}
            />
            <LocalSEOPageContent />
        </>
    )
}
