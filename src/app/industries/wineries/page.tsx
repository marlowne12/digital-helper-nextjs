import type { Metadata } from "next"
import { IndustryPageContent } from "@/components/industries/IndustryPageContent"
import { Wine, Map, Camera } from 'lucide-react'

export const metadata: Metadata = {
    title: "Web Design & SEO for Wineries | Digital Helper",
    description: "Elevating Tri-Cities and Red Mountain wineries with premium web design and local tourism SEO. Build your brand and book more tasting room visits.",
    keywords: ["winery web design", "wine marketing tri-cities", "seo for wineries", "red mountain wine marketing"],
}

export default function WineriesPage() {
    return (
        <IndustryPageContent
            industry="Wineries"
            description="Tri-Cities wine tourism is booming. We help wineries in Richland, West Richland, and the Red Mountain AVA showcase their terroir and labels with premium aesthetics and booking-focused design."
            features={[
                { title: "Visual Storytelling", desc: "Cinema-grade layouts that capture the soul of your vineyard.", icon: <Camera /> },
                { title: "Tasting Room Bookings", desc: "Integrated scheduling for tours and tasting reservations.", icon: <Map /> },
                { title: "Wine Club Automation", desc: "Systems that simplify member signups and recurring billing.", icon: <Wine /> }
            ]}
            benefits={[
                "Premium, high-end aesthetics that match your labels.",
                "Tourism-focused SEO to attract weekend travelers.",
                "Mobile optimization for wine trail users.",
                "Seamless club membership and event integration."
            ]}
        />
    )
}
