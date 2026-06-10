import type { Metadata } from "next"
import { WorkflowAutomationPageContent } from "@/components/services/WorkflowAutomationPageContent"
import { ServiceSchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "n8n Workflow Automation | Digital Helper",
    description: "Custom business automation with n8n. Connect your CRM, email, and tools to save 10+ hours weekly.",
    keywords: ["n8n automation richland", "business workflow automation", "zapier alternative", "ai workflows tri-cities"],
    alternates: {
        canonical: "/services/ai-automation/workflow-automation",
    },
}

export default function WorkflowAutomationPage() {
    return (
        <>
            <ServiceSchema
                name="n8n Workflow Automation"
                description="Custom business automation with n8n. Connect your CRM, email, and tools to save 10+ hours weekly. Intelligent workflow automation for Tri-Cities small businesses."
                url="https://digital-helper.com/services/ai-automation/workflow-automation"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Services", url: "https://digital-helper.com/services" },
                    { name: "AI Automation", url: "https://digital-helper.com/services/ai-automation" },
                    { name: "Workflow Automation", url: "https://digital-helper.com/services/ai-automation/workflow-automation" },
                ]}
            />
            <WorkflowAutomationPageContent />
        </>
    )
}
