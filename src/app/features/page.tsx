import { Metadata } from 'next';
import { Features } from '@/components/Features';
import { Testimonials } from '@/components/Testimonials';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Website Features & Capabilities",
    description: "Mobile-first design, lightning-fast speed, AI integration, enterprise security, analytics dashboard, and 24/7 support. Everything your Tri-Cities business needs to succeed online.",
    keywords: [
        "website features",
        "mobile optimization",
        "website speed optimization",
        "AI chatbot integration",
        "website analytics",
        "enterprise website security",
    ],
    openGraph: {
        title: "Features & Capabilities | Digital Helper Agency",
        description: "Everything your business needs: mobile-first design, AI integration, and enterprise security.",
        url: "https://digital-helper.com/features",
    },
    alternates: {
        canonical: "https://digital-helper.com/features",
    },
};

export default function FeaturesPage() {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Features", url: "https://digital-helper.com/features" },
                ]}
            />
            <div className="pt-24 bg-slate-950 min-h-screen">
                <RevealOnScroll>
                    <Features />
                </RevealOnScroll>
                <RevealOnScroll>
                    <Testimonials />
                </RevealOnScroll>
            </div>
        </>
    );
}
