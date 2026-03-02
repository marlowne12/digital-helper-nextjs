import type { Metadata } from "next"
import { GBPPageContent } from "@/components/services/GBPPageContent"
import { ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "Google Business Profile Optimization | Digital Helper",
    description: "Dominate the Google Map Pack in Richland. We manage and optimize your GMB profile for maximum local visibility.",
    keywords: ["google business profile optimization", "gmb richland", "map pack ranking", "google maps seo"],
}

export default function GBPPage() {
    return (
        <>
            <ServiceSchema
                name="Google Business Profile Optimization"
                description="Dominate the Google Map Pack in Richland, Kennewick, and Pasco. We manage and optimize your GMB profile for maximum local visibility and more inbound leads."
                url="https://digital-helper.com/services/seo/google-business-profile"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Services", url: "https://digital-helper.com/services" },
                    { name: "SEO", url: "https://digital-helper.com/services/seo" },
                    { name: "Google Business Profile", url: "https://digital-helper.com/services/seo/google-business-profile" },
                ]}
            />
            <GBPPageContent />
        </>
    )
}
