import type { Metadata } from "next"
import { ChatbotsPageContent } from "@/components/services/ChatbotsPageContent"
import { ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "AI Chatbots for Businesses | Digital Helper",
    description: "24/7 lead qualification and support with intelligent AI agents. Custom chatbots for Tri-Cities local businesses.",
    keywords: ["ai chatbots richland", "automated customer support", "lead qualification bot", "ai agency tri-cities"],
    alternates: {
        canonical: "/services/ai-automation/chatbots",
    },
}

export default function ChatbotsPage() {
    return (
        <>
            <ServiceSchema
                name="AI Chatbots for Businesses"
                description="24/7 lead qualification and support with intelligent AI agents. Custom chatbots for Tri-Cities local businesses that handle inquiries, book appointments, and convert visitors around the clock."
                url="https://digital-helper.com/services/ai-automation/chatbots"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Services", url: "https://digital-helper.com/services" },
                    { name: "AI Automation", url: "https://digital-helper.com/services/ai-automation" },
                    { name: "Chatbots", url: "https://digital-helper.com/services/ai-automation/chatbots" },
                ]}
            />
            <ChatbotsPageContent />
        </>
    )
}
