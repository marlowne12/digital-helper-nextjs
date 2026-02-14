import type { Metadata } from "next"
import { LocationPageContent } from "@/components/locations/LocationPageContent"

export const metadata: Metadata = {
    title: "Web Design & SEO Pasco, WA | Digital Helper",
    description: "Helping Pasco businesses scale with modern web design and hyper-local SEO. Dominate the search results in the fastest growing city in the Tri-Cities.",
    keywords: ["web design pasco wa", "seo pasco", "pasco marketing", "digital helper pasco"],
}

export default function PascoPage() {
    return (
        <LocationPageContent
            city="Pasco"
            description="With Pasco's rapid growth, standing out online is more critical than ever. We help local service businesses in West Pasco and the industrial zones capture the booming market demand."
            marketStats={[
                { label: "Market Growth", value: "Fastest" },
                { label: "Local Intent", value: "85%" },
                { label: "Mobile Users", value: "65%" }
            ]}
            neighborhoods={[
                "West Pasco",
                "Court Street",
                "Riverview",
                "Argent Road",
                "Road 68 Area",
                "Heritage Hills",
                "Chiawana",
                "Broadmoor"
            ]}
        />
    )
}
