import type { Metadata } from "next"
import { WorkflowAutomationPageContent } from "@/components/services/WorkflowAutomationPageContent"

export const metadata: Metadata = {
    title: "n8n Workflow Automation | Digital Helper",
    description: "Custom business automation with n8n. Connect your CRM, email, and tools to save 10+ hours weekly.",
    keywords: ["n8n automation richland", "business workflow automation", "zapier alternative", "ai workflows tri-cities"],
}

export default function WorkflowAutomationPage() {
    return <WorkflowAutomationPageContent />
}
