import { Metadata } from 'next';
import { CaseStudies } from '@/components/CaseStudies';

export const metadata: Metadata = {
    title: 'Case Studies | Digital Helper - Real Results for Local Businesses',
    description: 'See how Digital Helper transforms local businesses with AI-powered websites, automation, and lead generation. Example projects from our Tri-Cities agency.',
    keywords: [
        'case studies',
        'web design results',
        'local business marketing',
        'AI automation results',
        'lead generation success',
        'Tri-Cities web design',
        'small business transformation'
    ],
    alternates: {
        canonical: '/case-studies',
    },
    openGraph: {
        title: 'Case Studies | Real Results for Local Businesses',
        description: 'See example projects from Digital Helper — AI-powered websites, automation, and lead generation that delivers results for Tri-Cities local businesses.',
        type: 'website',
        images: ['/og-case-studies.jpg']
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Case Studies | Digital Helper',
        description: 'Example projects: AI-powered websites, 24/7 lead capture, local SEO. See what we build for Tri-Cities businesses.'
    }
};

// Schema.org structured data for case studies collection
const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Digital Helper Case Studies',
    description: 'Success stories from local businesses transformed by Digital Helper',
    url: 'https://digital-helper.com/case-studies',
    mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                item: {
                    '@type': 'Article',
                    name: 'Columbia Basin Plumbing - 400% Increase in Mobile Calls',
                    description: 'How we transformed an outdated plumbing website into a lead generation machine'
                }
            },
            {
                '@type': 'ListItem',
                position: 2,
                item: {
                    '@type': 'Article',
                    name: 'Tri-City Dental Care - 50+ New Patient Inquiries/Month',
                    description: 'AI chatbot implementation that reduced call volume and increased bookings'
                }
            },
            {
                '@type': 'ListItem',
                position: 3,
                item: {
                    '@type': 'Article',
                    name: 'Desert Comfort HVAC - $127K Additional Revenue',
                    description: '24/7 AI receptionist that captures every lead during peak seasons'
                }
            },
            {
                '@type': 'ListItem',
                position: 4,
                item: {
                    '@type': 'Article',
                    name: 'Kennewick Auto Repair - 4.9 Star Rating',
                    description: 'Automated reputation management that improved reviews and reduced calls'
                }
            }
        ]
    },
    provider: {
        '@type': 'Organization',
        name: 'Digital Helper',
        url: 'https://digital-helper.com'
    }
};

export default function CaseStudiesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <CaseStudies />
        </>
    );
}
