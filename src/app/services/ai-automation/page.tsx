import type { Metadata } from "next"
import { AIAutomationPageContent } from "@/components/services/AIAutomationPageContent"

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
        canonical: "/services/ai-automation",
    },
}

export default function AIAutomationPage() {
    return <AIAutomationPageContent />
}
