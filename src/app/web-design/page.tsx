import { Metadata } from 'next';
import { WebDesignPageContent } from '@/components/services/WebDesignPageContent';
import { FAQPageSchema, ServiceSchema, BreadcrumbSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
    title: "Professional Web Design Services in Richland, WA",
    description: "Custom web design for Tri-Cities businesses. Mobile-first, lightning-fast websites that convert visitors into customers. Starting at $1,999. Serving Richland, Kennewick, and Pasco.",
    keywords: [
        "web design Richland WA",
        "website design Tri-Cities",
        "responsive web design Kennewick",
        "mobile-first design Pasco",
        "small business website",
        "custom website development",
    ],
    openGraph: {
        title: "Professional Web Design Services | Digital Helper Agency",
        description: "Custom web design for Tri-Cities businesses. Mobile-first, fast websites that convert. Starting at $1,999.",
        url: "https://digital-helper.com/web-design",
        images: [{ url: "/assets/web_design_showcase.png", width: 1200, height: 675, alt: "Professional web design showcase for Tri-Cities businesses" }],
    },
    alternates: {
        canonical: "https://digital-helper.com/web-design",
    },
};

const webDesignFaqs = [
    { q: "How long does it take to build a website?", a: "Our proven 7-week process gets your site live guaranteed. That's weeks, not months. It includes strategy, design, development, testing, and training." },
    { q: "Can I update the site myself after launch?", a: "Yes! We can set up a CMS (Content Management System) so you can edit text, images, and blog posts without coding. Alternatively, we offer maintenance plans starting at $97/month." },
    { q: "What if I don't have content (text, photos)?", a: "No problem. We can write compelling copy, source stock photos, or work with your existing materials. Content writing is included with Professional and Enterprise packages." },
    { q: "Do you offer website maintenance and hosting?", a: "Yes. We offer managed hosting and maintenance starting at $97/month (Starter) or $147/month (Professional). Includes backups, security updates, SSL, and 99.9% uptime guarantee." },
    { q: "Can you redesign my existing website?", a: "Absolutely. We'll audit your current site, identify problems, and redesign it for speed, conversions, and SEO. Same 7-week timeline and guarantees apply." },
    { q: "Do you include SEO with the website design?", a: "Yes! All packages include SEO setup: optimized meta tags, structured data, mobile optimization, site speed, and Google Analytics. We can also add ongoing SEO services ($497+/month) for ranking growth." },
    { q: "What if my website still isn't live after 7 weeks?", a: "It will be. We guarantee launch within 8 weeks, or we refund 20% of your project cost. We only work on 4-5 projects at a time to ensure on-time delivery." },
    { q: "Do you offer e-commerce functionality?", a: "Yes, through our Enterprise package. We integrate Stripe, PayPal, inventory management, and order tracking. Perfect for shops, restaurants, or service booking." },
    { q: "How much does the AI chatbot cost?", a: "Our AI chatbot is optional and costs $197/month after launch. It's trained on your business, answers FAQs, qualifies leads, and books appointments 24/7. ROI typically pays for itself in 2-3 weeks." },
];

export default function WebDesignPage() {
    return (
        <>
            <FAQPageSchema faqs={webDesignFaqs} />
            <ServiceSchema
                name="Web Design Services"
                description="Professional web design and development for local businesses in Richland, Kennewick, and Pasco WA. Mobile-first, high-converting websites."
                url="https://digital-helper.com/web-design"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://digital-helper.com" },
                    { name: "Web Design", url: "https://digital-helper.com/web-design" },
                ]}
            />
            <WebDesignPageContent />
        </>
    );
}
