'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, MapPin, Mail, ExternalLink, Loader2, AlertCircle, Check, Phone, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { findLeads, Lead } from '@/app/actions/lead-finder';
import { generateEmail, TemplateType } from '@/lib/email-templates';

interface LeadFinderProps {
    onDeepAudit?: (lead: Lead) => void;
}

export default function LeadFinder({ onDeepAudit }: LeadFinderProps) {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query || !location) return;

        setIsLoading(true);
        setLeads([]);
        try {
            const results = await findLeads(query, location);
            setLeads(results);
        } catch (error) {
            console.error(error);
            alert("Failed to find leads. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyEmail = (lead: Lead, template: TemplateType = 'default') => {
        const { subject, body } = generateEmail(lead, template);
        const fullEmail = `SUBJECT: ${subject}\n\n${body}`;

        navigator.clipboard.writeText(fullEmail);
        setCopiedId(lead.placeId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="glass p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Search className="w-6 h-6 text-accent-cyan" />
                    Batch Lead Finder
                </h2>

                <form onSubmit={handleSearch} className="grid md:grid-cols-[1fr_1fr_auto] gap-4">
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
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-12 px-8 bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 border-0"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Find Leads'}
                    </Button>
                </form>
            </div>

            {/* Results List */}
            {leads.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-zinc-400 font-medium px-2">Found {leads.length} leads</h3>

                    <div className="grid gap-4">
                        {leads.map((lead, i) => (
                            <motion.div
                                key={lead.placeId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="glass p-6 rounded-xl hover:bg-white/[0.04] transition-colors group relative overflow-hidden"
                            >
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${lead.tier === 'hot' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                    lead.tier === 'warm' ? 'bg-yellow-500' : 'bg-blue-500'
                                    }`} />

                                <div className="flex flex-col md:flex-row gap-6 items-start justify-between pl-4">
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
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-xl font-bold text-white max-w-[300px] truncate">{lead.name}</h4>
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${lead.tier === 'hot' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                lead.tier === 'warm' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                                    'bg-blue-500/10 border-blue-500/20 text-blue-500'
                                                }`}>
                                                {lead.tier} Lead
                                            </span>
                                        </div>
                                        <div className="text-sm text-zinc-400 flex flex-wrap gap-4">
                                            <span>{lead.rating} ★ ({lead.totalReviews})</span>
                                            {lead.website ? (
                                                <div className="flex items-center gap-2">
                                                    <a href={lead.website} target="_blank" className="hover:text-accent-cyan flex items-center gap-1">
                                                        Website <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                    {lead.website.startsWith('https') ? (
                                                        <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded border border-green-500/20">SSL</span>
                                                    ) : (
                                                        <span className="text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">NO SSL</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-red-400 flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" /> No Website
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-3 h-3" /> {lead.phone || "No Phone"}
                                            </span>
                                            {lead.email && (
                                                <span className="flex items-center gap-1 text-accent-cyan">
                                                    <Mail className="w-3 h-3" /> {lead.email}
                                                </span>
                                            )}
                                        </div>

                                        {/* Opportunities */}
                                        <div className="mt-4 flex flex-col gap-3">
                                            <div className="flex flex-wrap gap-2">
                                                {lead.opportunities.slice(0, 3).map((opp, idx) => (
                                                    <span key={idx} className="text-[10px] px-2 py-1 bg-white/5 rounded text-zinc-300 border border-white/5">
                                                        {opp}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-3 text-zinc-600 border-r border-white/10 pr-4">
                                                    <Facebook className="w-3.5 h-3.5 hover:text-blue-500 cursor-pointer transition-colors" />
                                                    <Instagram className="w-3.5 h-3.5 hover:text-pink-500 cursor-pointer transition-colors" />
                                                    <Twitter className="w-3.5 h-3.5 hover:text-sky-400 cursor-pointer transition-colors" />
                                                    <Linkedin className="w-3.5 h-3.5 hover:text-blue-600 cursor-pointer transition-colors" />
                                                </div>
                                                <div className="flex items-center gap-3 text-[10px] font-bold tracking-wider">
                                                    <span className={lead.website?.startsWith('https') ? 'text-green-500/60' : 'text-red-500/60'}>
                                                        {lead.website?.startsWith('https') ? 'SSL SECURE' : 'NO SSL'}
                                                    </span>
                                                    <span className="text-accent-blue/60">SPEED: FAST</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                                        <div className="flex flex-col items-center justify-center mr-4">
                                            <span className="text-2xl font-bold text-white">{lead.leadScore}</span>
                                            <span className="text-[10px] uppercase text-zinc-500 tracking-wider">Score</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                onClick={() => handleCopyEmail(lead)}
                                                variant="outline"
                                                className="gap-2 border-white/10 hover:bg-white/5 text-zinc-200 h-9 w-full justify-start"
                                                size="sm"
                                            >
                                                {copiedId === lead.placeId ? (
                                                    <><Check className="w-4 h-4 text-green-500" /> Copied</>
                                                ) : (
                                                    <><Mail className="w-4 h-4" /> Draft Email</>
                                                )}
                                            </Button>
                                            <Button
                                                onClick={() => onDeepAudit?.(lead)}
                                                className="gap-2 bg-accent-purple text-white hover:bg-accent-purple/90 h-9 w-full justify-start border-0"
                                                size="sm"
                                            >
                                                <Search className="w-4 h-4" /> Run Deep Audit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
