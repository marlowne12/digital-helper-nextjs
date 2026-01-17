import { Metadata } from 'next';
import { AIAgency } from '@/components/AIAgency';

export const metadata: Metadata = {
    title: "AI Agency Automation Services | Tri-Cities, WA",
    description: "Automate your business with AI. Digital Helper provides custom AI agents, chatbots, and workflow automation for local businesses in Richland, Pasco, and Kennewick.",
    keywords: "AI automation agency, business automation, custom AI chatbots, workflow automation Tri-Cities",
    alternates: {
        canonical: "https://digital-helper.com/ai-agency"
    }
};

export default function AIAgencyPage() {
    return <AIAgency />;
}
