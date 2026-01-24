import type { Metadata } from "next"
import { LocationPageContent } from "@/components/locations/LocationPageContent"

export const metadata: Metadata = {
    title: "Web Design & SEO West Richland, WA | Digital Helper",
    description: "West Richland businesses deserve high-performance websites. Specialized web design and local SEO for businesses in the fastest-growing residential area.",
    keywords: ["web design west richland wa", "seo west richland", "west richland marketing", "local seo 99353"],
}

export default function WestRichlandPage() {
    return (
        <LocationPageContent
            city="West Richland"
            description="West Richland is expanding fast. We help local residential-service businesses and specialists reach the growing community of families and professionals in the 99353 area."
            marketStats={[
                { label: "Residential Growth", value: "Peak" },
                { label: "Local Loyalty", value: "High" },
                { label: "Mobile Intent", value: "60%" }
            ]}
            neighborhoods={[
                "Red Mountain",
                "The Lakes",
                "Candy Mountain",
                "Belmont City",
                "Flat Top Park Area",
                "Snively Road",
                "Van Giesen Area",
                "Keene Road"
            ]}
        />
    )
}
