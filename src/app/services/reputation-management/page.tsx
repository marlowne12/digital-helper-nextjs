import type { Metadata } from "next"
import { ReputationManagementPageContent } from "@/components/services/ReputationManagementPageContent"

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

export default function ReputationManagementPage() {
    return <ReputationManagementPageContent />
}
