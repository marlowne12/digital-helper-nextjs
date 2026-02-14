import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Reputation Management & Lead Finder | Digital Helper',
    description: 'Automate your Google Business Profile growth. Find hot leads, audit SEO, and generate reviews with our AI-powered reputation engine.',
    keywords: ['reputation management', 'google reviews', 'seo audit', 'lead generation', 'digital marketing tools', 'local seo'],
    openGraph: {
        title: 'AI Reputation Management | Digital Helper',
        description: 'Turn reviews into revenue with AI-powered reputation control.',
        type: 'website',
    }
};

export default function ReputationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
