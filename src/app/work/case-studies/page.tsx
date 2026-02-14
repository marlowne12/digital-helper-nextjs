import { Metadata } from 'next';
import { CaseStudies } from '@/components/CaseStudies';
import { BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Case Studies & Results for Tri-Cities Businesses",
    description: "See real results from Digital Helper clients. Case studies showing 400%+ traffic increases, #1 Google rankings, and dramatic website transformations for local businesses.",
    keywords: [
        "web design case studies",
        "SEO results Tri-Cities",
        "website transformation examples",
        "digital marketing success stories",
        "local business growth",
    ],
    openGraph: {
        title: "Case Studies & Results | Digital Helper Agency",
        description: "Real results: 400%+ traffic increases, #1 rankings, and website transformations for Tri-Cities businesses.",
        url: "https://digital-helper.com/case-studies",
    },
    alternates: {
        canonical: "https://digital-helper.com/case-studies",
    },
};

export default function CaseStudiesPage() {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Case Studies", url: "https://digital-helper.com/case-studies" },
                ]}
            />
            <CaseStudies />
        </>
    );
}
