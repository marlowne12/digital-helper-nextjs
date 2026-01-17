import { Metadata } from 'next';
import { CaseStudies } from '@/components/CaseStudies';

export const metadata: Metadata = {
    title: "Case Studies & Results | Digital Helper Agency",
    description: "See how we've helped local businesses grow. Read case studies and success stories from our web design, SEO, and AI automation clients in the Tri-Cities.",
    keywords: "digital marketing case studies, web design portfolio, SEO results, business growth stories",
    alternates: {
        canonical: "https://digital-helper.com/case-studies"
    }
};

export default function CaseStudiesPage() {
    return <CaseStudies />;
}
