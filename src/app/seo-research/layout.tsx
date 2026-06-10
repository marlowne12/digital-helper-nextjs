import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tri-Cities Keyword Research | Local SEO Targets | Digital Helper',
    description:
        'Researched keyword targets and local SEO strategy for Richland, Kennewick, and Pasco businesses. Browse high-intent, AI automation, near-me, and problem-solving keywords by priority.',
    keywords: [
        'tri-cities keyword research',
        'richland wa seo keywords',
        'kennewick local seo',
        'pasco wa search terms',
        'local keyword strategy',
    ],
    alternates: {
        canonical: 'https://digital-helper.com/seo-research',
    },
    openGraph: {
        title: 'Tri-Cities Keyword Research | Local SEO Targets',
        description:
            'High-intent keyword targets and local SEO strategy for Richland, Kennewick, and Pasco businesses.',
        type: 'website',
        url: 'https://digital-helper.com/seo-research',
    },
};

export default function SEOResearchLayout({ children }: { children: React.ReactNode }) {
    return children;
}
