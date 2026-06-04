import type { Metadata } from "next"
import { AIAutomationPageContent } from "@/components/services/AIAutomationPageContent"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "AI Automation Services | Build Your Digital Workforce",
    description: "Custom AI systems that qualify leads, schedule appointments, and handle customer support 24/7. Reduce costs by 30% and save 40% of your time with intelligent automation.",
    keywords: ["ai automation richland", "business automation tri-cities", "ai chatbot development", "workflow automation", "n8n automation"],
    openGraph: {
        title: "AI Automation Services | Digital Helper",
        description: "Buy back your freedom with AI. Custom automation systems that work 24/7 so you don't have to.",
        url: "https://digital-helper.com/services/ai-automation",
        images: [
            {
                url: "/og-ai-automation.png",
                width: 1200,
                height: 630,
                alt: "Digital Helper AI Automation - Your Digital Workforce",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Automation Services | Digital Helper",
        description: "Automate or be automated. Custom AI systems for Richland businesses.",
        images: ["/og-ai-automation.png"],
    },
    alternates: {
        canonical: "/ai-agency",
    },
}

const aiAutomationFaqs = [
    {
        q: "Do I need to be a tech expert to use these systems?",
        a: "Not at all. We build everything to be user-friendly and handle all the technical implementation for you. You'll just see the results in your inbox or CRM.",
    },
    {
        q: "What is n8n and why do you use it?",
        a: "n8n is a powerful, low-cost automation platform that allows us to build complex, custom logic that other tools can't handle. It gives you more flexibility and lower long-term costs.",
    },
    {
        q: "Can AI really handle customer support?",
        a: "Yes! Modern AI models can handle 70-80% of routine questions with high accuracy, only passing the most complex or high-value issues to your human team.",
    },
    {
        q: "How much time can I actually save?",
        a: "Most of our clients save 10 to 20 hours per week after automating their lead intake and administrative workflows. That's time you can put back into actual growth.",
    },
]

export default function AIAutomationPage() {
    return (
        <>
            <ServiceSchema
                name="AI Automation Services"
                description="Custom AI systems that qualify leads, schedule appointments, and handle customer support 24/7. Reduce costs by 30% and save 40% of your time with intelligent automation. Serving Tri-Cities businesses."
                url="https://digital-helper.com/services/ai-automation"
            />
            <FAQPageSchema faqs={aiAutomationFaqs} />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Services", url: "https://digital-helper.com/services" },
                    { name: "AI Automation", url: "https://digital-helper.com/services/ai-automation" },
                ]}
            />
            <AIAutomationPageContent />
        </>
    )
}
