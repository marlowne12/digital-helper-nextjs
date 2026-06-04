import { Metadata } from 'next';
import { AIAgency } from '@/components/AIAgency';
import { FAQPageSchema, ServiceSchema, BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "AI Automation Agency for Tri-Cities Businesses",
    description: "Custom AI agents, chatbots, and workflow automation for Richland, Kennewick, and Pasco businesses. Automate lead gen, content, and customer support. Save 40+ hours/week.",
    keywords: [
        "AI automation agency",
        "business automation Tri-Cities",
        "AI chatbot Richland WA",
        "workflow automation",
        "lead generation automation",
        "AI for small business",
    ],
    openGraph: {
        title: "AI Automation Agency | Digital Helper - Tri-Cities, WA",
        description: "Custom AI agents and automation for local businesses. Save 40+ hours/week with intelligent workflows.",
        url: "https://digital-helper.com/ai-agency",
        images: [{ url: "/assets/ai_workflows.png", width: 1200, height: 675, alt: "AI automation workflows for Tri-Cities businesses" }],
    },
    alternates: {
        canonical: "https://digital-helper.com/ai-agency",
    },
};

const aiFaqs = [
    { q: "Is AI going to replace my employees?", a: "No. AI handles repetitive, time-consuming tasks so your team can focus on higher-value work like strategy, customer relationships, and growth. It's about augmenting your team, not replacing them." },
    { q: "What if the AI says something wrong?", a: "We build in multiple safeguards. All customer-facing AI responses are reviewed before sending. You maintain full control with a dashboard where you can approve, edit, or reject any AI-generated content." },
    { q: "Do I need technical skills to use this?", a: "Not at all. Our AI systems are designed for non-technical business owners. You interact through simple dashboards, no coding required." },
    { q: "How much does AI automation cost?", a: "Single services start at $197/month (chatbot), while comprehensive automation packages run $497-997/month. Most clients see ROI within 2-4 months." },
    { q: "Can AI write in my unique brand voice?", a: "Yes! We train the AI on your existing content, brand guidelines, and communication style. It takes 1-2 weeks of training." },
    { q: "What happens if I want to cancel?", a: "You can cancel anytime - no long-term contracts. We keep all your data and AI models, so if you ever want to resume, we can restart quickly." },
    { q: "How do you ensure data privacy?", a: "We use bank-grade encryption, secure APIs, and never sell your data. All AI models are trained on your data and remain your property. We're compliant with GDPR, CCPA, and HIPAA." },
    { q: "Can you integrate AI with my existing tools?", a: "Yes! We integrate with Zapier, Make, CRM systems, email platforms, and most business software. Most integrations take 2-3 days to set up." },
];

export default function AIAgencyPage() {
    return (
        <>
            <FAQPageSchema faqs={aiFaqs} />
            <ServiceSchema
                name="AI Automation Services"
                description="Custom AI agents, chatbots, and workflow automation for local businesses in Richland, Kennewick, and Pasco WA."
                url="https://digital-helper.com/ai-agency"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "AI Agency", url: "https://digital-helper.com/ai-agency" },
                ]}
            />
            <AIAgency />
        </>
    );
}
