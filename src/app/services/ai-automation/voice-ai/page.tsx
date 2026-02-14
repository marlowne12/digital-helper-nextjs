import type { Metadata } from "next"
import { VoiceAIPageContent } from "@/components/services/VoiceAIPageContent"

export const metadata: Metadata = {
    title: "AI Voice Agents & Automated Reception | Digital Helper",
    description: "Natural-sounding AI voice agents for inbound calls and missed call text-back. Never miss a lead in the Tri-Cities again.",
    keywords: ["ai voice agents", "automated reception richland", "missed call text back", "ai phone support"],
}

export default function VoiceAIPage() {
    return <VoiceAIPageContent />
}
