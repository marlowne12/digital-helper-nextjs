import { Metadata } from 'next';
import { Features } from '@/components/Features';
import { Testimonials } from '@/components/Testimonials';
import { RevealOnScroll } from '@/components/RevealOnScroll';

export const metadata: Metadata = {
    title: "Website Features & Services | Digital Helper",
    description: "Explore our comprehensive web design features: mobile optimization, AI integration, Google Business sync, speed optimization, and more.",
    keywords: "website features, web design services, mobile optimization, website speed, AI integration",
    alternates: {
        canonical: "https://digital-helper.com/features"
    }
};

export default function FeaturesPage() {
    return (
        <div className="pt-24 bg-slate-950 min-h-screen">
            <RevealOnScroll>
                <Features />
            </RevealOnScroll>
            <RevealOnScroll>
                <Testimonials />
            </RevealOnScroll>
        </div>
    );
}
