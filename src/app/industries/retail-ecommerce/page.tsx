import type { Metadata } from "next"
import { IndustryPageContent } from "@/components/industries/IndustryPageContent"
import { ShoppingBag, Zap, Users } from 'lucide-react'
import { IndustryServiceSchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "E-commerce & Retail Web Design | Digital Helper",
    description: "High-converting online stores and retail websites for Tri-Cities businesses. We build fast, mobile-first shopping experiences that drive sales.",
    keywords: ["retail web design richland", "ecommerce development tri-cities", "shopify alternative nextjs", "online store design"],
    alternates: {
        canonical: "/industries/retail-ecommerce",
    },
}

export default function RetailEcommercePage() {
    return (
        <>
            <IndustryServiceSchema
                industry="Retail & E-commerce"
                description="High-converting online stores and retail websites for Tri-Cities businesses. We build fast, mobile-first shopping experiences that drive sales."
                url="https://digital-helper.com/industries/retail-ecommerce"
                audience="Retail stores, boutiques, and e-commerce businesses in the Tri-Cities region"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Industries", url: "https://digital-helper.com/industries" },
                    { name: "Retail & E-commerce", url: "https://digital-helper.com/industries/retail-ecommerce" },
                ]}
            />
            <IndustryPageContent
                industry="Retail & E-commerce"
                description="The retail landscape in Richland and Kennewick is shifting online. We build blazing-fast shopping experiences that load in under 1 second and provide the seamless mobile checkout your customers expect."
                features={[
                    { title: "Speed-First Checkout", desc: "Next.js architecture ensures no lag during the buying process.", icon: <Zap /> },
                    { title: "Inventory Sync", desc: "Automated systems that keep your physical and digital stock in sync.", icon: <ShoppingBag /> },
                    { title: "Customer Retention", desc: "AI-driven emails and SMS to bring shoppers back for more.", icon: <Users /> }
                ]}
                benefits={[
                    "Sub-second page speeds for higher conversion.",
                    "Mobile-first UI designed for modern shoppers.",
                    "Integrated payment processing (Stripe/PayPal).",
                    "Advanced SEO for product-specific search terms."
                ]}
            />
        </>
    )
}
