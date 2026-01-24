import type { Metadata } from "next"
import { ChatbotsPageContent } from "@/components/services/ChatbotsPageContent"

export const metadata: Metadata = {
    title: "AI Chatbots for Businesses | Digital Helper",
    description: "24/7 lead qualification and support with intelligent AI agents. Custom chatbots for Tri-Cities local businesses.",
    keywords: ["ai chatbots richland", "automated customer support", "lead qualification bot", "ai agency tri-cities"],
}

export default function ChatbotsPage() {
    return <ChatbotsPageContent />
}
