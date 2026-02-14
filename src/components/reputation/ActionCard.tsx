'use client';

import { useState } from 'react';
import { Recommendation } from '@/types/reputation';
import { Button } from '@/components/ui/button';
import { Loader2, Check, Copy, Sparkles, MessageSquare, FileText } from 'lucide-react';
import { generateResponse, optimizeDescription } from '@/app/actions/analyze';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionCardProps {
    recommendation: Recommendation;
}

export default function ActionCard({ recommendation }: ActionCardProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<string | string[] | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleExecute = async () => {
        setIsProcessing(true);
        setResult(null);

        try {
            if (recommendation.type === 'reply_review' && recommendation.context) {
                const reviewId = recommendation.context.reviewId as string;
                const author = recommendation.context.author as string;
                const drafts = await generateResponse(reviewId, author, 'negative');
                setResult(drafts);
            } else if (recommendation.type === 'optimize_description') {
                const optimized = await optimizeDescription("current desc placeholder");
                setResult(optimized);
            }
        } catch (error) {
            console.error("Action failed", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const copyToClipboard = (text: string, index?: number) => {
        navigator.clipboard.writeText(text);
        if (typeof index === 'number') {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        }
    };

    // Impact Styles for Dark Theme
    const impactStyles =
        recommendation.impact === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
            recommendation.impact === 'Medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                'bg-blue-500/10 text-blue-400 border-blue-500/20';

    return (
        <div className="glass p-6 rounded-2xl group border-white/5 hover:border-accent-purple/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${impactStyles}`}>
                            {recommendation.impact} Impact
                        </span>
                        {recommendation.type === 'reply_review' && (
                            <span className="flex items-center gap-1 text-xs text-zinc-500 font-medium">
                                <MessageSquare className="w-3 h-3" /> Review Reply
                            </span>
                        )}
                        {recommendation.type === 'optimize_description' && (
                            <span className="flex items-center gap-1 text-xs text-zinc-500 font-medium">
                                <FileText className="w-3 h-3" /> Optimization
                            </span>
                        )}
                    </div>

                    <h4 className="text-lg font-bold text-white">
                        {recommendation.title}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                        {recommendation.description}
                    </p>
                </div>

                <div className="flex-shrink-0 pt-2">
                    <Button
                        onClick={handleExecute}
                        disabled={isProcessing}
                        className={result ? "bg-white/10 text-white hover:bg-white/20 border border-white/10" : "btn-primary"}
                        size="sm"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Working...
                            </>
                        ) : result ? (
                            'Regenerate'
                        ) : (
                            <>
                                Fix This <Sparkles className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-white/5 overflow-hidden"
                    >
                        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-accent-purple uppercase tracking-widest">
                            <Sparkles className="w-3 h-3" />
                            AI Generated Output
                        </div>

                        {Array.isArray(result) ? (
                            <div className="space-y-3">
                                {result.map((draft, idx) => (
                                    <div key={idx} className="bg-white/[0.02] p-4 rounded-xl border border-white/5 hover:bg-white/[0.04] transition-colors relative group">
                                        <p className="text-zinc-300 text-sm leading-relaxed pr-10">&quot;{draft}&quot;</p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2 h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
                                            onClick={() => copyToClipboard(draft, idx)}
                                        >
                                            {copiedIndex === idx ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 relative group">
                                <p className="text-zinc-300 text-sm leading-relaxed pr-10">{result}</p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
                                    onClick={() => copyToClipboard(result as string, 99)}
                                >
                                    {copiedIndex === 99 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
