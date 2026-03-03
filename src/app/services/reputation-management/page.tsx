import type { Metadata } from "next"
import { ReputationManagementPageContent } from "@/components/services/ReputationManagementPageContent"
import { ServiceSchema, FAQPageSchema, BreadcrumbSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
    title: "Reputation Management | AI-Powered Review Monitoring & Response",
    description: "Turn reviews into revenue. Monitor, analyze, and improve your Google Business Profile with AI-driven reputation management. Smart auto-replies and competitor benchmarking included.",
    keywords: ["reputation management richland", "google review management", "online reputation tri-cities", "review monitoring", "business reputation software"],
    openGraph: {
        title: "Reputation Management | Digital Helper",
        description: "Trust is the new currency. AI-powered reputation management to monitor, respond, and grow your online presence.",
        url: "https://digital-helper.com/services/reputation-management",
        images: [
            {
                url: "/og-reputation.png",
                width: 1200,
                height: 630,
                alt: "Digital Helper Reputation Management - Turn Reviews Into Revenue",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Reputation Management | Digital Helper",
        description: "AI-powered reputation control for Richland businesses.",
        images: ["/og-reputation.png"],
    },
    alternates: {
        canonical: "/services/reputation-management",
    },
}

const reputationFaqs = [
    {
        q: "Can you remove negative reviews?",
        a: "While we cannot directly 'delete' reviews (Google's policy), we help you bury them with fresh, positive feedback and provide a professional framework for responding that builds trust with future readers.",
    },
    {
        q: "How do you 'automate' review requests?",
        a: "We integrate with your CRM or POS system to automatically send review requests via SMS or email immediately after a successful service, when satisfaction is highest.",
    },
    {
        q: "Do I have to approve the AI responses?",
        a: "Yes, you have full control. You can choose to have the AI draft responses for your approval, or set specific parameters for automatic replies to 5-star reviews.",
    },
    {
        q: "Is reputation management worth the monthly cost?",
        a: "A 1-star increase in rating can boost revenue by 5-9%. Our system pays for itself by capturing leads that would otherwise walk away due to a lower rating.",
    },
]

export default function ReputationManagementPage() {
    return (
        <>
            <ServiceSchema
                name="Reputation Management"
                description="Turn reviews into revenue. Monitor, analyze, and improve your Google Business Profile with AI-driven reputation management. Smart auto-replies and competitor benchmarking for Tri-Cities businesses."
                url="https://digital-helper.com/services/reputation-management"
            />
            <FAQPageSchema faqs={reputationFaqs} />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Services", url: "https://digital-helper.com/services" },
                    { name: "Reputation Management", url: "https://digital-helper.com/services/reputation-management" },
                ]}
            />
            <ReputationManagementPageContent />
        </>
    )
}
