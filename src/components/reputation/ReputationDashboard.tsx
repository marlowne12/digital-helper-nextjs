'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search } from 'lucide-react';
import SingleAudit from './SingleAudit';
import LeadFinder from './LeadFinder';

export default function ReputationDashboard() {
    const [mode, setMode] = useState<'audit' | 'leads'>('leads');
    const [deepAuditQuery, setDeepAuditQuery] = useState<string | undefined>(undefined);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDeepAudit = (lead: any) => {
        // Construct a query that targets this business specifically
        const query = `${lead.name} ${lead.address}`;
        setDeepAuditQuery(query);
        setMode('audit');
    };

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8 bg-background-primary min-h-screen">
            {/* Mode Toggle */}
            <div className="flex justify-center mb-8">
                <div className="bg-white/5 p-1 rounded-xl flex gap-1 border border-white/10">
                    <button
                        onClick={() => setMode('audit')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${mode === 'audit'
                                ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/20'
                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Search className="w-4 h-4" /> Single Audit
                    </button>
                    <button
                        onClick={() => setMode('leads')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${mode === 'leads'
                                ? 'bg-accent-cyan text-black shadow-lg shadow-accent-cyan/20'
                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Users className="w-4 h-4" /> Batch Lead Finder
                    </button>
                </div>
            </div>

            <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === 'audit' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                {mode === 'audit' ? (
                    <SingleAudit initialQuery={deepAuditQuery} />
                ) : (
                    <LeadFinder onDeepAudit={handleDeepAudit} />
                )}
            </motion.div>
        </div>
    );
}
