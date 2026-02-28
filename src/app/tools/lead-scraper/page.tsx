import type { Metadata } from 'next';
import LeadScraper from '@/components/tools/LeadScraper';

export const metadata: Metadata = {
    title: 'Lead Scraper Tool | Digital Helper',
    description: 'Find businesses without websites, businesses with no SSL, and other vulnerable leads using Google Places API. Export results to CSV with enriched contact information.',
    keywords: ['lead scraper', 'lead generation', 'Google Places API', 'business leads', 'SSL checker', 'website audit'],
    openGraph: {
        title: 'Lead Scraper Tool | Digital Helper',
        description: 'Find businesses without websites, businesses with no SSL, and other vulnerable leads using Google Places API.',
        type: 'website',
    },
};

export default function LeadScraperPage() {
    return (
        <div className="min-h-screen bg-background-primary">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Lead <span className="text-gradient">Scraper</span> Tool
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Find businesses without websites, businesses with no SSL, and other vulnerable leads.
                        Export results with enriched contact information including emails and social media links.
                    </p>
                </div>
                <LeadScraper />
            </div>
        </div>
    );
}
