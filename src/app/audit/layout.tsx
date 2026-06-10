import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Website Audit | Instant Site Health Check | Digital Helper',
    description:
        'Run a free, instant audit of any website. We check mobile-friendliness, page speed, SEO basics, SSL, contact info, and AI readiness, then show you exactly what to fix first.',
    keywords: [
        'free website audit',
        'website health check',
        'site speed test',
        'mobile friendly test',
        'SSL checker',
        'tri-cities web design',
    ],
    alternates: {
        canonical: 'https://digital-helper.com/audit',
    },
    openGraph: {
        title: 'Free Website Audit | Instant Site Health Check',
        description:
            'Run a free, instant audit of any website. Mobile, speed, SEO, security, and AI readiness in 60 seconds.',
        type: 'website',
        url: 'https://digital-helper.com/audit',
    },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
    return children;
}
