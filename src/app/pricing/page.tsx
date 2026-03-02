import { Metadata } from 'next';
import { PricingV2 } from '@/components/v2/PricingV2';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Transparent Pricing for Web Design, SEO & AI Automation",
    description: "Simple, transparent pricing for web design ($1,999+), local SEO ($799/mo+), and AI automation ($997/mo). No hidden fees. Serving Richland, Kennewick, and Pasco businesses.",
    keywords: [
        "web design pricing",
        "SEO packages pricing",
        "AI automation costs",
        "digital marketing pricing Tri-Cities",
        "affordable web design",
        "small business marketing packages",
    ],
    openGraph: {
        title: "Pricing | Digital Helper Agency - Richland, WA",
        description: "Transparent pricing for web design, SEO, and AI automation. No hidden fees.",
        url: "https://digital-helper.com/pricing",
    },
    alternates: {
        canonical: "https://digital-helper.com/pricing",
    },
};

export default function PricingPage() {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Pricing", url: "https://digital-helper.com/pricing" },
                ]}
            />
            <PricingV2 />
        </>
    );
}
