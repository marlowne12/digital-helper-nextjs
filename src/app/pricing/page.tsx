import { Metadata } from 'next';
import { Pricing } from '@/components/Pricing';

export const metadata: Metadata = {
    title: "Pricing Packages | Digital Helper Agency",
    description: "Transparent pricing for web design, local SEO, and AI automation. Choose the package that fits your business needs and budget.",
    keywords: "web design pricing, SEO packages, AI automation costs, digital marketing pricing Tri-Cities",
    alternates: {
        canonical: "https://digital-helper.com/pricing"
    }
};

export default function PricingPage() {
    return <Pricing />;
}
