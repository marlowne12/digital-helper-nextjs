import type { Metadata } from "next"
import { IndustryPageContent } from "@/components/industries/IndustryPageContent"
import { Factory, Cog, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
    title: "Web Design & Lead Gen for Manufacturing | Digital Helper",
    description: "Modernizing manufacturing and industrial brands in the Tri-Cities. We build high-performance sites that showcase capability and generate high-value B2B leads.",
    keywords: ["manufacturing web design", "industrial marketing", "b2b lead gen richland", "manufacturing seo"],
}

export default function ManufacturingPage() {
    return (
        <IndustryPageContent
            industry="Manufacturing"
            description="The industrial sector needs more than just a brochure site. We build powerful digital platforms that showcase your precision engineering and logistics capabilities to high-value B2B partners."
            features={[
                { title: "Capability Showcases", desc: "Detailed product and service catalogs designed for engineers.", icon: <Factory /> },
                { title: "B2B Lead Funnels", desc: "Automated systems to capture and qualify industrial inquiries.", icon: <Cog /> },
                { title: "Supply Chain SEO", desc: "Targeting specific search terms used by procurement officers.", icon: <BarChart3 /> }
            ]}
            benefits={[
                "Showcase technical specs and machinery with precision.",
                "Attract higher-value contracts with professional design.",
                "Streamline RFQ processes with custom digital forms.",
                "Establish local and national industry authority."
            ]}
        />
    )
}
