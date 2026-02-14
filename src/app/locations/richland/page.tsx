import type { Metadata } from "next"
import { LocationPageContent } from "@/components/locations/LocationPageContent"

export const metadata: Metadata = {
    title: "Web Design & SEO Richland, WA | Digital Helper",
    description: "Richland's premier partner for high-performance web design and local SEO. We help Richland businesses dominate search results and scale with AI.",
    keywords: ["web design richland wa", "seo richland", "digital marketing richland", "reach customers in richland"],
}

export default function RichlandPage() {
    return (
        <LocationPageContent
            city="Richland"
            description="As a Richland-based agency ourselves, we specialize in helping local service providers in the Atomic City stand out. From the Uptown Shopping Center to Queensgate, we know exactly where your customers are searching."
            marketStats={[
                { label: "Local Search Intent", value: "88%" },
                { label: "Mobile Usage", value: "62%" },
                { label: "Growth Potential", value: "High" }
            ]}
            neighborhoods={[
                "South Richland",
                "North Richland",
                "Uptown",
                "Queensgate",
                "Badger Mountain",
                "Westcliffe",
                "Horn Rapids",
                "Island View"
            ]}
        />
    )
}
