import { Metadata } from 'next';
import { PricingV2 } from '@/components/v2/PricingV2';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Pricing Packages | Digital Helper Agency",
    description: "Transparent pricing for web design, local SEO, and AI automation. Choose the package that fits your business needs and budget.",
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
            <PricingV2 />
        </>
    );
}
