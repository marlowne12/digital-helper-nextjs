'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    Search,
    MapPin,
    Mail,
    ExternalLink,
    Loader2,
    AlertCircle,
    Check,
    Phone,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Eye,
    EyeOff,
    Download,
    Filter,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { EnrichedLead, LeadScraperFilters } from '@/types/reputation';
import { cn } from '@/lib/utils';

interface LeadScraperProps {
    onDeepAudit?: (lead: EnrichedLead) => void;
}

const DEFAULT_FILTERS: LeadScraperFilters = {
    noWebsite: false,
    noSSL: false,
    lowReviews: false,
    poorRating: false,
};

export default function LeadScraper({ onDeepAudit }: LeadScraperProps) {
    const [apiKey, setApiKey] = useState('');
    const [showApiKey, setShowApiKey] = useState(false);
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [maxResults, setMaxResults] = useState(20);
    const [filters, setFilters] = useState<LeadScraperFilters>(DEFAULT_FILTERS);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState({ fetched: 0, total: 0 });
    const [leads, setLeads] = useState<EnrichedLead[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLAnchorElement>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiKey || !query || !location) return;

        setIsLoading(true);
        setError(null);
        setLeads([]);
        setProgress({ fetched: 0, total: maxResults });

        try {
            const response = await fetch('/api/lead-scraper', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    apiKey,
                    query,
                    location,
                    maxResults,
                    filters,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Failed to fetch leads');
            }

            setLeads(data.leads || []);
            setProgress({ fetched: data.leads?.length || 0, total: maxResults });
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Failed to fetch leads');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleFilter = (key: keyof LeadScraperFilters) => {
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const clearFilters = () => {
        setFilters(DEFAULT_FILTERS);
    };

    const handleCopyEmail = (lead: EnrichedLead) => {
        const email = lead.contactEmail || 'No email found';
        navigator.clipboard.writeText(email);
        setCopiedId(lead.placeId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const generateCSV = () => {
        if (leads.length === 0) return;

        const headers = [
            'Business Name',
            'Address',
            'Phone',
            'Email',
            'Website',
            'SSL Status',
            'Rating',
            'Total Reviews',
            'Lead Score',
            'Tier',
            'GBP Profile Link',
            'Facebook',
            'Instagram',
            'Twitter/X',
            'LinkedIn',
            'YouTube',
            'TikTok',
            'Opportunities',
            'Categories',
        ];

        const rows = leads.map((lead) => [
            lead.name,
            lead.address,
            lead.phone || '',
            lead.contactEmail || '',
            lead.website || '',
            lead.sslStatus,
            lead.rating.toFixed(1),
            lead.totalReviews,
            lead.leadScore,
            lead.tier,
            lead.gbpProfileUrl,
            lead.socialMedia?.facebook || '',
            lead.socialMedia?.instagram || '',
            lead.socialMedia?.twitter || '',
            lead.socialMedia?.linkedin || '',
            lead.socialMedia?.youtube || '',
            lead.socialMedia?.tiktok || '',
            lead.opportunities.join(' | '),
            lead.categories.join(' | '),
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map((row) =>
                row.map((cell) => {
                    // Escape quotes and wrap in quotes if contains comma
                    const strCell = String(cell);
                    if (strCell.includes(',') || strCell.includes('"') || strCell.includes('\n')) {
                        return `"${strCell.replace(/"/g, '""')}"`;
                    }
                    return strCell;
                }).join(',')
            ),
        ].join('\n');

        // Add BOM for Excel compatibility with UTF-8
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = `leads_${query.toLowerCase().replace(/\s+/g, '_')}_${location.toLowerCase().replace(/\s+/g, '_')}_${timestamp}.csv`;

        if (fileInputRef.current) {
            fileInputRef.current.href = url;
            fileInputRef.current.download = filename;
            fileInputRef.current.click();
        }

        URL.revokeObjectURL(url);
    };

    const getTierColor = (tier: EnrichedLead['tier']) => {
        switch (tier) {
            case 'hot':
                return { bg: 'bg-red-500/10 border-red-500/20 text-red-500', bar: 'bg-red-500' };
            case 'warm':
                return { bg: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500', bar: 'bg-yellow-500' };
            case 'cold':
                return { bg: 'bg-blue-500/10 border-blue-500/20 text-blue-500', bar: 'bg-blue-500' };
            default:
                return { bg: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-500', bar: 'bg-zinc-500' };
        }
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;
    const hotCount = leads.filter((l) => l.tier === 'hot').length;
    const warmCount = leads.filter((l) => l.tier === 'warm').length;
    const coldCount = leads.filter((l) => l.tier === 'cold').length;

    return (
        <div className="space-y-8">
            {/* Input Section */}
            <div className="glass p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Search className="w-6 h-6 text-accent-cyan" />
                    Lead Scraper Tool
                </h2>

                <form onSubmit={handleSearch} className="space-y-4">
                    {/* API Key Input */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500">
                            <KeyIcon className="w-5 h-5" />
                        </div>
                        <Input
                            type={showApiKey ? 'text' : 'password'}
                            placeholder="Google Places API Key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="pl-10 pr-24 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-accent-cyan/50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="grid md:grid-cols-[1fr_1fr_auto] gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                            <Input
                                placeholder="Keyword (e.g. Plumbers, Dentists)"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-accent-cyan/50"
                            />
                        </div>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                            <Input
                                placeholder="Location (e.g. Miami, FL)"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-accent-cyan/50"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                min={1}
                                max={60}
                                value={maxResults}
                                onChange={(e) => setMaxResults(Math.min(60, Math.max(1, Number(e.target.value) || 1)))}
                                className="h-12 w-24 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-accent-cyan/50"
                            />
                            <span className="text-sm text-zinc-500">leads</span>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Filter className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-zinc-400">Filters:</span>

                        <button
                            type="button"
                            onClick={() => toggleFilter('noWebsite')}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-sm border transition-colors',
                                filters.noWebsite
                                    ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
                                    : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                            )}
                        >
                            No Website
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleFilter('noSSL')}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-sm border transition-colors',
                                filters.noSSL
                                    ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
                                    : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                            )}
                        >
                            No SSL
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleFilter('lowReviews')}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-sm border transition-colors',
                                filters.lowReviews
                                    ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
                                    : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                            )}
                        >
                            Low Reviews (&lt;10)
                        </button>
                        <button
                            type="button"
                            onClick={() => toggleFilter('poorRating')}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-sm border transition-colors',
                                filters.poorRating
                                    ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
                                    : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                            )}
                        >
                            Poor Rating (&lt;4.0)
                        </button>

                        {activeFiltersCount > 0 && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="px-2 py-1.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || !apiKey || !query || !location}
                        className="h-12 px-8 bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 border-0"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Find Leads'}
                    </Button>
                </form>

                {/* Progress Bar */}
                {isLoading && (
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-sm text-zinc-400">
                            <span>Searching...</span>
                            <span>{progress.fetched} leads found</span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((progress.fetched / maxResults) * 100, 100)}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-red-400 font-medium">Error</p>
                            <p className="text-sm text-red-400/70">{error}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Section */}
            {leads.length > 0 && (
                <div className="space-y-4">
                    {/* Results Header */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <h3 className="text-zinc-400 font-medium px-2">
                            Found {leads.length} leads
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 text-sm">
                                <span className="text-red-500">Hot: {hotCount}</span>
                                <span className="text-yellow-500">Warm: {warmCount}</span>
                                <span className="text-blue-500">Cold: {coldCount}</span>
                            </div>
                            <Button
                                onClick={generateCSV}
                                variant="outline"
                                className="gap-2 border-white/10 hover:bg-white/5 text-zinc-200"
                            >
                                <Download className="w-4 h-4" /> Export CSV
                            </Button>
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="grid gap-4">
                        {leads.map((lead, i) => {
                            const tierColors = getTierColor(lead.tier);
                            return (
                                <motion.div
                                    key={lead.placeId}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="glass p-6 rounded-xl hover:bg-white/[0.04] transition-colors group relative overflow-hidden"
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${tierColors.bar} shadow-lg`} />

                                    <div className="flex flex-col md:flex-row gap-6 items-start justify-between pl-4">
                                        {/* Photo */}
                                        {lead.photoUrl && (
                                            <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-zinc-800 border border-white/10 hidden md:block relative">
                                                <Image
                                                    src={lead.photoUrl}
                                                    alt={lead.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}

                                        {/* Business Info */}
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h4 className="text-xl font-bold text-white max-w-[300px] truncate">
                                                    {lead.name}
                                                </h4>
                                                <span className={cn('px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border', tierColors.bg)}>
                                                    {lead.tier}
                                                </span>
                                                <span className="text-lg font-bold text-white">{lead.leadScore}</span>
                                            </div>

                                            <div className="text-sm text-zinc-400 flex flex-wrap gap-4">
                                                <span>{lead.rating.toFixed(1)} ★ ({lead.totalReviews})</span>
                                                {lead.website ? (
                                                    <a
                                                        href={lead.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-accent-cyan flex items-center gap-1"
                                                    >
                                                        Website <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                ) : (
                                                    <span className="text-red-400 flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" /> No Website
                                                    </span>
                                                )}
                                                {lead.website && (
                                                    <span className={cn(
                                                        'text-[10px] px-1.5 py-0.5 rounded border',
                                                        lead.sslStatus === 'secure'
                                                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    )}>
                                                        {lead.sslStatus === 'secure' ? 'SSL SECURE' : 'NO SSL'}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-3 h-3" /> {lead.phone || 'No Phone'}
                                                </span>
                                            </div>

                                            {/* Contact Info */}
                                            {(lead.contactEmail || lead.socialMedia) && (
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                                                    {lead.contactEmail && (
                                                        <span className="flex items-center gap-1 text-accent-cyan">
                                                            <Mail className="w-3 h-3" /> {lead.contactEmail}
                                                        </span>
                                                    )}
                                                    {lead.socialMedia && (
                                                        <div className="flex items-center gap-2">
                                                            {lead.socialMedia.facebook && (
                                                                <a
                                                                    href={lead.socialMedia.facebook}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="hover:text-blue-500 transition-colors"
                                                                >
                                                                    <Facebook className="w-3.5 h-3.5" />
                                                                </a>
                                                            )}
                                                            {lead.socialMedia.instagram && (
                                                                <a
                                                                    href={lead.socialMedia.instagram}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="hover:text-pink-500 transition-colors"
                                                                >
                                                                    <Instagram className="w-3.5 h-3.5" />
                                                                </a>
                                                            )}
                                                            {lead.socialMedia.twitter && (
                                                                <a
                                                                    href={lead.socialMedia.twitter}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="hover:text-sky-400 transition-colors"
                                                                >
                                                                    <Twitter className="w-3.5 h-3.5" />
                                                                </a>
                                                            )}
                                                            {lead.socialMedia.linkedin && (
                                                                <a
                                                                    href={lead.socialMedia.linkedin}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="hover:text-blue-600 transition-colors"
                                                                >
                                                                    <Linkedin className="w-3.5 h-3.5" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Opportunities */}
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {lead.opportunities.slice(0, 4).map((opp, idx) => (
                                                    <span key={idx} className="text-[10px] px-2 py-1 bg-white/5 rounded text-zinc-300 border border-white/5">
                                                        {opp}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                                            <div className="flex flex-col gap-2">
                                                <a
                                                    href={lead.gbpProfileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 text-sm transition-colors border border-white/10"
                                                >
                                                    <ExternalLink className="w-4 h-4" /> View Profile
                                                </a>
                                                <Button
                                                    onClick={() => handleCopyEmail(lead)}
                                                    variant="outline"
                                                    className="gap-2 border-white/10 hover:bg-white/5 text-zinc-200 h-9 justify-start"
                                                    size="sm"
                                                >
                                                    {copiedId === lead.placeId ? (
                                                        <><Check className="w-4 h-4 text-green-500" /> Copied</>
                                                    ) : (
                                                        <><Mail className="w-4 h-4" /> Copy Email</>
                                                    )}
                                                </Button>
                                                {onDeepAudit && (
                                                    <Button
                                                        onClick={() => onDeepAudit(lead)}
                                                        className="gap-2 bg-accent-purple text-white hover:bg-accent-purple/90 h-9 justify-start border-0"
                                                        size="sm"
                                                    >
                                                        <Search className="w-4 h-4" /> Deep Audit
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Hidden download link for CSV export */}
            <a ref={fileInputRef} className="hidden" />
        </div>
    );
}

// Key icon component
function KeyIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
        </svg>
    );
}
