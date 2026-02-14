import type { Metadata } from "next"
import { LocationPageContent } from "@/components/locations/LocationPageContent"

export const metadata: Metadata = {
    title: "Web Design & SEO Kennewick, WA | Digital Helper",
    description: "Driving growth for Kennewick businesses with conversion-focused web design and local SEO. Get found first on Columbia Center Blvd and beyond.",
    keywords: ["web design kennewick wa", "seo kennewick", "kennewick marketing agency", "local seo kennewick"],
}

export default function KennewickPage() {
    return (
        <LocationPageContent
            city="Kennewick"
            description="Kennewick is the commercial heart of the Tri-Cities. We help businesses from Columbia Center Mall to downtown Kennewick capture more leads and turn them into loyal local customers."
            marketStats={[
                { label: "Commercial Traffic", value: "Very High" },
                { label: "Mobile Search", value: "70%" },
                { label: "Lead Conversion", value: "Excellent" }
            ]}
            neighborhoods={[
                "Southridge",
                "Hansen Park",
                "Sagebrush",
                "Canyon Lakes",
                "Vista Field",
                "Zintel Canyon",
                "Cherry Hill",
                "Arbor-Ennis"
            ]}
        />
    )
}
