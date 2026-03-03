import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free SEO Audit Tool | AI-Powered Website Analysis | Digital Helper',
    description: 'Get a free, instant SEO audit of any website. Our AI analyzes 50+ ranking factors and gives you actionable fixes to improve your search rankings.',
    keywords: ['SEO audit', 'free SEO tool', 'website analyzer', 'SEO checker', 'search engine optimization', 'website audit'],
    openGraph: {
        title: 'Free SEO Audit Tool | AI-Powered Analysis',
        description: 'Get a free, instant SEO audit of any website. Our AI analyzes 50+ ranking factors and gives you actionable fixes.',
        type: 'website',
        url: 'https://digital-helper.com/tools/seo-audit',
        images: [
            {
                url: '/images/og/seo-audit-tool.png',
                width: 1200,
                height: 630,
                alt: 'Digital Helper SEO Audit Tool'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free SEO Audit Tool | AI-Powered Analysis',
        description: 'Get a free, instant SEO audit of any website. Our AI analyzes 50+ ranking factors and gives you actionable fixes.',
    },
    alternates: {
        canonical: 'https://digital-helper.com/tools/seo-audit'
    }
};

export default function SEOAuditLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
