'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchGBPData } from '@/app/actions/gbp';
import { analyzeProfile } from '@/app/actions/analyze';
import { sendReportEmail } from '@/app/actions/send-report';
import { GBPProfile, AuditResult } from '@/types/reputation';
import GbpSearch from './GbpSearch';
import HealthScore from './HealthScore';
import SwotAnalysis from './SwotAnalysis';
import ActionCard from './ActionCard';
import { ExportButton } from './ExportButton';
import CompetitorComparison from './CompetitorComparison';

import { Star, MapPin, Globe, Phone, AlertCircle, Facebook, Instagram, Linkedin, Twitter, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface SingleAuditProps {
    initialQuery?: string;
}

export default function SingleAudit({ initialQuery }: SingleAuditProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<GBPProfile | null>(null);
    const [audit, setAudit] = useState<AuditResult | null>(null);

    // Email Modal State
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { toast } = useToast();

    const handleSearch = useCallback(async (query: string) => {
        setIsLoading(true);
        setProfile(null);
        setAudit(null);

        try {
            // 1. Fetch Profile
            const gbpData = await fetchGBPData(query);
            setProfile(gbpData);

            // 2. Perform Analysis
            const auditResults = await analyzeProfile(gbpData);
            setAudit(auditResults);

        } catch (err) {
            console.error(err);
            toast({
                title: "Error",
                description: "Failed to analyze profile. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        if (initialQuery) {
            handleSearch(initialQuery);
        }
    }, [initialQuery, handleSearch]);

    const handleSendReport = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !profile || !audit) return;

        setIsSending(true);
        try {
            const reportData = {
                businessName: profile.name,
                location: profile.address,
                score: audit.score,
                profile: {
                    name: profile.name,
                    rating: profile.rating,
                    reviewCount: profile.totalReviews
                },
                issues: audit.summary ? [audit.summary] : [],
                recommendations: audit.recommendations.map(r => ({
                    priority: r.impact.toLowerCase() as 'high' | 'medium' | 'low',
                    action: r.title
                })),
            };

            const result = await sendReportEmail(email, reportData);

            if (result.success) {
                toast({
                    title: "Report Sent",
                    description: `Audit report sent to ${email}`,
                });
                setIsEmailModalOpen(false);
                setEmail('');
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            toast({
                title: "Failed to send",
                description: error instanceof Error ? error.message : "Could not send report",
                variant: "destructive"
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8 space-y-12 bg-background-primary min-h-screen relative">

            {/* Email Modal */}
            <AnimatePresence>
                {isEmailModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-xl"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-white">Send Report via Email</h3>
                                <button onClick={() => setIsEmailModalOpen(false)} className="text-zinc-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSendReport} className="space-y-4">
                                <div>
                                    <label className="text-sm text-zinc-400 mb-1.5 block">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="you@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-accent-purple/50"
                                    />
                                </div>
                                <div className="flex justify-end gap-3 pt-2">
                                    <Button type="button" variant="ghost" onClick={() => setIsEmailModalOpen(false)} className="text-zinc-400 hover:text-white">
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSending} className="bg-accent-purple hover:bg-accent-purple/90 text-white">
                                        {isSending ? (
                                            <>Converting & Sending...</>
                                        ) : (
                                            <><Mail className="w-4 h-4 mr-2" /> Send Report</>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Search Section */}
            <section className={`${profile ? 'py-8' : 'py-20'} transition-all duration-500`}>
                <GbpSearch onSearch={handleSearch} isLoading={isLoading} />
            </section>

            {/* Results Section */}
            {profile && audit && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >

                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row gap-6 items-start justify-between glass p-8 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                        <div className="space-y-3 relative z-10">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{profile.name}</h2>
                                {profile.isClaimed && (
                                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                                        <CheckIcon className="w-3 h-3" /> Verified
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6 text-zinc-400 text-sm">
                                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent-indigo" /> {profile.address}</div>
                                <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> <span className="text-white font-bold">{profile.rating}</span> ({profile.totalReviews} reviews)</div>
                            </div>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {profile.categories.map(cat => (
                                    <span key={cat} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-zinc-300">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 text-sm text-right relative z-10 w-full md:w-auto">
                            <div className="flex gap-2 justify-end mb-2">
                                <ExportButton
                                    businessName={profile.name}
                                    location={profile.address}
                                    reportData={{
                                        score: audit.score,
                                        profile: {
                                            name: profile.name,
                                            rating: profile.rating,
                                            reviewCount: profile.totalReviews,
                                            categories: profile.categories
                                        },
                                        issues: audit.summary ? [audit.summary] : [],
                                        opportunities: audit.recommendations.map(r => r.title),
                                        recommendations: audit.recommendations.map(r => ({
                                            priority: r.impact.toLowerCase() as 'high' | 'medium' | 'low',
                                            action: r.title
                                        })),
                                        swot: audit.swot
                                    }}
                                    onEmailSend={() => setIsEmailModalOpen(true)}
                                />
                            </div>

                            {profile.website && (
                                <div className="flex flex-col gap-2">
                                    <a href={profile.website} target="_blank" className="btn-secondary py-2 px-4 flex items-center justify-center md:justify-end gap-2 text-xs">
                                        <Globe className="w-4 h-4" /> Visit Website
                                    </a>
                                    {audit?.websiteAnalysis && (
                                        <div className="flex items-center justify-center md:justify-end gap-2">
                                            {audit.websiteAnalysis.ssl && (
                                                <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-bold">SSL SECURE</span>
                                            )}
                                            <span className="text-[10px] bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded border border-accent-blue/20 font-bold">
                                                LOAD: {audit.websiteAnalysis.loadTime}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                            {profile.phone && (
                                <div className="glass px-4 py-2 rounded-lg flex items-center justify-center md:justify-end gap-2 text-zinc-300">
                                    <Phone className="w-4 h-4 text-accent-blue" /> {profile.phone}
                                </div>
                            )}
                            {audit?.websiteAnalysis?.socials && (
                                <div className="flex items-center justify-center md:justify-end gap-3 mt-1">
                                    {audit.websiteAnalysis.socials.facebook && (
                                        <a href={audit.websiteAnalysis.socials.facebook} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                                            <Facebook className="w-4 h-4" />
                                        </a>
                                    )}
                                    {audit.websiteAnalysis.socials.instagram && (
                                        <a href={audit.websiteAnalysis.socials.instagram} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                    )}
                                    {audit.websiteAnalysis.socials.linkedin && (
                                        <a href={audit.websiteAnalysis.socials.linkedin} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    )}
                                    {audit.websiteAnalysis.socials.twitter && (
                                        <a href={audit.websiteAnalysis.socials.twitter} target="_blank" className="text-zinc-500 hover:text-white transition-colors">
                                            <Twitter className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Col: Health Score & Analysis */}
                        <div className="lg:col-span-1 space-y-6">
                            <HealthScore score={audit.score} />

                            <div className="glass p-6 rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-accent-blue/5" />
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-accent-blue" /> Audit Summary
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed italic border-l-2 border-accent-blue/30 pl-4">
                                    &quot;{audit.summary}&quot;
                                </p>
                            </div>
                        </div>

                        {/* Right Col: SWOT & Recommendations */}
                        <div className="lg:col-span-2 space-y-8">
                            <section>
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center text-accent-purple text-sm">01</span>
                                    Strategic Analysis
                                </h3>
                                <SwotAnalysis data={audit.swot} />
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-accent-indigo/20 flex items-center justify-center text-accent-indigo text-sm">02</span>
                                    Action Items
                                    <span className="ml-auto text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-medium">
                                        {audit.recommendations.length} High Priority
                                    </span>
                                </h3>
                                <div className="grid gap-4">
                                    {audit.recommendations.map(rec => (
                                        <ActionCard key={rec.id} recommendation={rec} />
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center text-accent-cyan text-sm">03</span>
                                    Competitor Benchmarking
                                </h3>
                                <CompetitorComparison
                                    businessName={profile.name}
                                    location={profile.address || ''}
                                    industry={profile.categories[0] || 'Local Business'}
                                    websiteUrl={profile.website}
                                />
                            </section>
                        </div>
                    </div>

                </motion.div>
            )}
        </div>
    );
}

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
