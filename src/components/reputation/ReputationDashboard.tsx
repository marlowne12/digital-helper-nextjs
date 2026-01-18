'use client';

import { useState } from 'react';
import { fetchGBPData } from '@/app/actions/gbp';
import { analyzeProfile } from '@/app/actions/analyze';
import { GBPProfile, AuditResult } from '@/types/reputation';
import GbpSearch from './GbpSearch';
import HealthScore from './HealthScore';
import SwotAnalysis from './SwotAnalysis';
import ActionCard from './ActionCard';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Globe, Phone, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReputationDashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState<GBPProfile | null>(null);
    const [audit, setAudit] = useState<AuditResult | null>(null);

    const handleSearch = async (query: string) => {
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
            alert("Failed to analyze profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8 space-y-12 bg-background-primary min-h-screen">

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
                            {profile.website && (
                                <a href={profile.website} target="_blank" className="btn-secondary py-2 px-4 flex items-center justify-center md:justify-end gap-2 text-xs">
                                    <Globe className="w-4 h-4" /> Visit Website
                                </a>
                            )}
                            {profile.phone && (
                                <div className="glass px-4 py-2 rounded-lg flex items-center justify-center md:justify-end gap-2 text-zinc-300">
                                    <Phone className="w-4 h-4 text-accent-blue" /> {profile.phone}
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
                                    "{audit.summary}"
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
