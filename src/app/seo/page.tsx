import { Metadata } from 'next';
import { SEOService } from '@/components/SEOService';

export const metadata: Metadata = {
    title: "Local SEO Services in Richland, WA",
    description: "Get found on Google! Digital Helper provides expert local SEO services for Richland and Tri-Cities businesses. Improve rankings, increase traffic, and dominate local search.",
    keywords: "local SEO Richland WA, SEO services Tri-Cities, Google ranking optimization, local search marketing",
    alternates: {
        canonical: "https://digital-helper.com/seo"
    }
};

export default function SEOPage() {
    return <SEOService />;
}
