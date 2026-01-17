import { Metadata } from 'next';
import { WebDesign } from '@/components/WebDesign';

export const metadata: Metadata = {
    title: "Web Design Services | Richland, WA",
    description: "Professional web design services in Richland, WA. We create modern, mobile-first websites that convert visitors into customers. Serving Tri-Cities businesses.",
    keywords: "web design Richland, website design Tri-Cities, responsive web design, mobile-first design",
    alternates: {
        canonical: "https://digital-helper.com/web-design"
    }
};

export default function WebDesignPage() {
    return <WebDesign />;
}
