import type { Metadata } from "next"
import { IndustryPageContent } from "@/components/industries/IndustryPageContent"
import { ShieldCheck, Users, Zap } from 'lucide-react'
import { IndustryServiceSchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "Web Design & SEO for Healthcare | Digital Helper",
    description: "Specialized digital marketing and web design for dental practices, clinics, and healthcare providers in the Tri-Cities. Build trust and attract more patients.",
    keywords: ["healthcare web design", "dental marketing richland", "seo for doctors", "medical website design"],
}

export default function HealthcarePage() {
    return (
        <>
            <IndustryServiceSchema
                industry="Healthcare"
                description="Specialized digital marketing and web design for dental practices, clinics, and healthcare providers in the Tri-Cities. Build trust and attract more patients."
                url="https://digital-helper.com/industries/healthcare"
                audience="Healthcare providers, dental practices, and medical clinics in the Tri-Cities region"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Industries", url: "https://digital-helper.com/industries" },
                    { name: "Healthcare", url: "https://digital-helper.com/industries/healthcare" },
                ]}
            />
            <IndustryPageContent
                industry="Healthcare"
                description="Patient trust starts with your digital presence. We build secure, HIPAA-compliant-ready websites and SEO strategies that help Tri-Cities clinics and practices stand out and book more appointments."
                features={[
                    { title: "Trust Building", desc: "Showcase testimonials and credentials with high-authority layouts.", icon: <ShieldCheck /> },
                    { title: "Patient Intake", desc: "Automated forms and booking systems that save front-desk time.", icon: <Users /> },
                    { title: "Local Authority", desc: "Dominating local search for 'dentist near me' or 'urgent care Richland'.", icon: <Zap /> }
                ]}
                benefits={[
                    "Professional, calming UX designed for patients.",
                    "Mobile-first design for users searching on the go.",
                    "Automated review capture to build online reputation.",
                    "Integrated booking and appointment reminders."
                ]}
            />
        </>
    )
}
