import type { Metadata } from "next"
import { IndustryPageContent } from "@/components/industries/IndustryPageContent"
import { Sprout, BarChart3, Workflow } from 'lucide-react'

export const metadata: Metadata = {
    title: "Web Design & SEO for Agriculture | Digital Helper",
    description: "Empowering Tri-Cities agriculture and agribusiness with modern digital solutions. Specialized web design and SEO for farms, suppliers, and processing facilities.",
    keywords: ["agriculture web design", "agribusiness marketing tri-cities", "farm website development", "ag-tech seo"],
}

export default function AgriculturePage() {
    return (
        <IndustryPageContent
            industry="Agriculture"
            description="Agriculture is the backbone of the Tri-Cities. We help agribusinesses modernize their operations and outreach with intelligent web design and automation that simplifies supply chain communication and local B2B growth."
            features={[
                { title: "Smart Portals", desc: "Private portals for suppliers and partners to access data.", icon: <Sprout /> },
                { title: "Market Visibility", desc: "Targeting national and global buyers searching for local producers.", icon: <BarChart3 /> },
                { title: "Automated Reporting", desc: "Systems that simplify logistics and inventory communication.", icon: <Workflow /> }
            ]}
            benefits={[
                "Professional brand presence for traditional businesses.",
                "Streamlined communication with partners and buyers.",
                "SEO optimized for national Ag-spec keywords.",
                "Easy-to-manage content for seasonal updates."
            ]}
        />
    )
}
