
'use client';

import { useState } from 'react';
import { analyzeCompetitors, CompetitorAnalysis } from '@/app/actions/competitor';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, Users, Target, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompetitorComparisonProps {
    businessName: string;
    location: string;
    industry: string;
    websiteUrl?: string;
}

export default function CompetitorComparison({
    businessName,
    location,
    industry,
    websiteUrl
}: CompetitorComparisonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<CompetitorAnalysis | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await analyzeCompetitors({
                businessName,
                location,
                industry,
                websiteUrl
            });

            if (result.success && result.analysis) {
                setAnalysis(result.analysis);
            } else {
                setError(result.error || 'Failed to analyze competitors');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if (!analysis && !isLoading) {
        return (
            <div className="glass p-8 rounded-2xl text-center space-y-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 to-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">See How You Stack Up</h3>
                    <p className="text-zinc-400 max-w-lg mx-auto mb-6">
                        Unlock deep insights into your local market position. Our AI will analyze your top 3 competitors
                        to find gaps, opportunities, and strategic advantages.
                    </p>
                    <Button
                        onClick={handleAnalyze}
                        size="lg"
                        className="bg-gradient-to-r from-accent-indigo to-accent-purple hover:opacity-90 transition-all shadow-lg shadow-accent-indigo/20"
                    >
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Analyze Competitors
                    </Button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="glass p-12 rounded-2xl flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-10 h-10 text-accent-blue animate-spin" />
                <p className="text-zinc-400 animate-pulse">Analyzing local market data...</p>
                <div className="text-xs text-zinc-600 max-w-xs text-center">
                    This deep analysis may take 15-30 seconds. We&apos;re gathering customized insights for {businessName}.
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                <ShieldAlert className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <p className="text-red-400">{error}</p>
                <Button variant="ghost" onClick={handleAnalyze} className="mt-4 text-zinc-400 hover:text-white">Try Again</Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Users className="w-6 h-6 text-accent-cyan" />
                    Competitive Landscape
                </h3>
                {analysis && (
                    <div className="px-4 py-1.5 bg-accent-blue/10 border border-accent-blue/20 rounded-full text-accent-blue text-sm font-semibold">
                        Rank #{analysis.marketPosition.ranking} in Market
                    </div>
                )}
            </div>

            {analysis && (
                <div className="grid gap-6">
                    {/* Market Position Summary */}
                    <div className="glass p-6 rounded-xl border-l-4 border-accent-cyan">
                        <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                            <Target className="w-5 h-5 text-accent-cyan" /> Market Opportunity
                        </h4>
                        <p className="text-zinc-300 mb-2"><strong className="text-white">Gap:</strong> {analysis.marketPosition.gap}</p>
                        <p className="text-zinc-300"><strong className="text-white">Opportunity:</strong> {analysis.marketPosition.opportunity}</p>
                    </div>

                    {/* Competitor Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {analysis.competitors.map((comp, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass p-5 rounded-xl flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h5 className="font-bold text-white text-lg">{comp.name}</h5>
                                    <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded">
                                        <span className="text-yellow-500 font-bold text-xs">{comp.rating}</span>
                                        <span className="text-yellow-500/60 text-[10px]">({comp.reviewCount})</span>
                                    </div>
                                </div>
                                <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wide font-semibold">Key Differentiator</div>
                                <p className="text-sm text-zinc-300 mb-4 flex-grow">{comp.differentiator}</p>

                                <div className="mt-auto pt-4 border-t border-white/5 space-y-2">
                                    <div className="text-xs">
                                        <span className="text-green-400 font-semibold">+ </span>
                                        <span className="text-zinc-400">{comp.strengths[0]}</span>
                                    </div>
                                    <div className="text-xs">
                                        <span className="text-red-400 font-semibold">- </span>
                                        <span className="text-zinc-400">{comp.weaknesses[0]}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recommendations */}
                    <div className="glass p-6 rounded-xl">
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5 text-accent-purple" /> Competitive Strategy
                        </h4>
                        <div className="space-y-4">
                            {analysis.recommendations.map((rec, i) => (
                                <div key={i} className="flex gap-4 items-start p-3 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${rec.priority === 'high' ? 'bg-red-500' :
                                        rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                        }`} />
                                    <div>
                                        <p className="text-zinc-200 font-medium text-sm">{rec.action}</p>
                                        <div className="flex gap-4 mt-1">
                                            <span className="text-xs text-zinc-500">Impact: <span className="text-zinc-300">{rec.impact}</span></span>
                                            <span className="text-xs text-zinc-500">Effort: <span className="text-zinc-300">{rec.effort}</span></span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
