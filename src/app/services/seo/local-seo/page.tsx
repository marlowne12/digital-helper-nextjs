import type { Metadata } from "next"
import { LocalSEOPageContent } from "@/components/services/LocalSEOPageContent"

export const metadata: Metadata = {
    title: "Local SEO Richland | Rank #1 in the Tri-Cities",
    description: "Expert local SEO for Richland, Kennewick, and Pasco businesses. We optimize for local intent and geographical search domination.",
    keywords: ["local seo richland", "seo tri-cities", "local search marketing", "rank in richland"],
}

export default function LocalSEOPage() {
    return <LocalSEOPageContent />
}
