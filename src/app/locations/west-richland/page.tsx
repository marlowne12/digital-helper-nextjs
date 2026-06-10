import type { Metadata } from "next"
import { LocationPageContent } from "@/components/locations/LocationPageContent"
import { LocalBusinessCitySchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "Web Design & SEO West Richland, WA | Digital Helper",
    description: "West Richland businesses deserve high-performance websites. Specialized web design and local SEO for businesses in the fastest-growing residential area.",
    keywords: ["web design west richland wa", "seo west richland", "west richland marketing", "local seo 99353"],
    alternates: { canonical: "https://digital-helper.com/locations/west-richland" },
}

export default function WestRichlandPage() {
    return (
        <>
            <LocalBusinessCitySchema
                city="West Richland"
                description="West Richland businesses deserve high-performance websites. Specialized web design and local SEO for businesses in the fastest-growing residential area of the Tri-Cities."
                url="https://digital-helper.com/locations/west-richland"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Locations", url: "https://digital-helper.com/locations" },
                    { name: "West Richland", url: "https://digital-helper.com/locations/west-richland" },
                ]}
            />
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
        </>
    )
}
