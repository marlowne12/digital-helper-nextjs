import type { Metadata } from "next"
import { GBPPageContent } from "@/components/services/GBPPageContent"

export const metadata: Metadata = {
    title: "Google Business Profile Optimization | Digital Helper",
    description: "Dominate the Google Map Pack in Richland. We manage and optimize your GMB profile for maximum local visibility.",
    keywords: ["google business profile optimization", "gmb richland", "map pack ranking", "google maps seo"],
}

export default function GBPPage() {
    return <GBPPageContent />
}
