import type { Metadata } from "next"
import { VoiceAIPageContent } from "@/components/services/VoiceAIPageContent"
import { ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "AI Voice Agents & Automated Reception | Digital Helper",
    description: "Natural-sounding AI voice agents for inbound calls and missed call text-back. Never miss a lead in the Tri-Cities again.",
    keywords: ["ai voice agents", "automated reception richland", "missed call text back", "ai phone support"],
}

export default function VoiceAIPage() {
    return (
        <>
            <ServiceSchema
                name="AI Voice Agents & Automated Reception"
                description="Natural-sounding AI voice agents for inbound calls and missed call text-back. Never miss a lead in the Tri-Cities again. 24/7 automated phone answering for Richland, Kennewick, and Pasco businesses."
                url="https://digital-helper.com/services/ai-automation/voice-ai"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Services", url: "https://digital-helper.com/services" },
                    { name: "AI Automation", url: "https://digital-helper.com/services/ai-automation" },
                    { name: "Voice AI", url: "https://digital-helper.com/services/ai-automation/voice-ai" },
                ]}
            />
            <VoiceAIPageContent />
        </>
    )
}
