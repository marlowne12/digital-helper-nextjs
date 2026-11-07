import { Metadata } from 'next';
import { PricingPage as PricingView } from '@/components/dh/pages/PricingPage';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Web Design & SEO Pricing Tri-Cities WA",
    description: "Clear starting prices for web design, local SEO and automation in the Tri-Cities. Website Sprint from $2,500, Growth System from $1,500/mo. Free 30-minute diagnostic.",
    keywords: "web design pricing, SEO packages, AI automation costs, digital marketing pricing Tri-Cities",
    alternates: {
        canonical: "https://digital-helper.com/pricing"
    }
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
            <PricingView />
        </>
    );
}
