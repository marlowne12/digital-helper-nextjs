import { Metadata } from 'next';
import { SEOService } from '@/components/SEOService';
import { FAQPageSchema, ServiceSchema, BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Local SEO Services for Tri-Cities Businesses | Richland, WA",
    description: "Dominate Google local search in Richland, Kennewick & Pasco. Expert local SEO services including Google Business Profile optimization, keyword targeting, and transparent ROI reporting.",
    keywords: "local SEO Richland WA, SEO services Tri-Cities, Google ranking optimization, local search marketing, Google Business Profile, SEO agency Kennewick",
    openGraph: {
        title: "Local SEO Services for Tri-Cities Businesses | Digital Helper",
        description: "Dominate Google local search in Richland, Kennewick & Pasco. Expert local SEO with transparent ROI reporting.",
        url: "https://digital-helper.com/seo",
        images: [{ url: "/assets/seo_analytics.png", width: 1200, height: 675, alt: "Local SEO analytics dashboard for Tri-Cities businesses" }],
    },
    alternates: {
        canonical: "https://digital-helper.com/seo"
    }
};

const seoFaqs = [
    { q: "How long does it take to see SEO results?", a: "Most clients see measurable improvements in 60-90 days. Local rankings can improve faster (30-60 days) with Google Business Profile optimization, while organic rankings typically take 3-6 months for competitive keywords." },
    { q: "What's the difference between local SEO and regular SEO?", a: "Local SEO focuses on geographic-specific searches like 'plumber near me' or 'web design Richland WA'. It emphasizes Google Business Profile, local citations, and location-based content to attract nearby customers." },
    { q: "Do you require long-term contracts?", a: "No. We offer month-to-month services because we're confident in our results. Most clients stay with us because we consistently deliver qualified leads and measurable ROI." },
    { q: "How do you measure SEO success?", a: "We track keyword rankings, organic traffic, Google Business Profile insights, phone calls, form submissions, and most importantly - actual revenue generated from SEO leads." },
    { q: "Can you guarantee first page rankings?", a: "No ethical SEO agency can guarantee specific rankings due to Google's constantly changing algorithm. However, we can guarantee transparent reporting, proven strategies, and our best effort to dominate your local market." },
    { q: "What industries do you work with in Tri-Cities?", a: "We specialize in local service businesses: HVAC, plumbing, legal services, healthcare, real estate, restaurants, and professional services. Any business that relies on local customers can benefit from our SEO services." },
];

export default function SEOPage() {
    return (
        <>
            <FAQPageSchema faqs={seoFaqs} />
            <ServiceSchema
                name="Local SEO Services"
                description="Expert local SEO services for Tri-Cities businesses including Google Business Profile optimization, keyword targeting, citation building, and transparent ROI reporting."
                url="https://digital-helper.com/seo"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "SEO Services", url: "https://digital-helper.com/seo" },
                ]}
            />
            <SEOService />
        </>
    );
}
