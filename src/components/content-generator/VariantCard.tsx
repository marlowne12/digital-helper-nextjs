'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, FileText, Clock, Target, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ContentVariant } from '@/types/content';

interface VariantCardProps {
    variant: ContentVariant;
    isSelected: boolean;
    onSelect: () => void;
    onScrollSync?: (scrollTop: number) => void;
    externalScrollTop?: number;
}

const variantStyleLabels: Record<ContentVariant['variantStyle'], { label: string; color: string }> = {
    'seo-focused': { label: 'SEO Focused', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    'story-driven': { label: 'Story Driven', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    'problem-solution': { label: 'Problem Solution', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
};

const getSeoScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
};

const getSeoScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/30';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
};

export function VariantCard({ variant, isSelected, onSelect, onScrollSync, externalScrollTop }: VariantCardProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);

    // Handle scroll sync from other variants
    useEffect(() => {
        if (externalScrollTop !== undefined && contentRef.current && !isScrolling.current) {
            isScrolling.current = true;
            contentRef.current.scrollTop = externalScrollTop;
            setTimeout(() => {
                isScrolling.current = false;
            }, 100);
        }
    }, [externalScrollTop]);

    // Handle local scroll and propagate to other variants
    const handleScroll = () => {
        if (contentRef.current && onScrollSync && !isScrolling.current) {
            isScrolling.current = true;
            onScrollSync(contentRef.current.scrollTop);
            setTimeout(() => {
                isScrolling.current = false;
            }, 100);
        }
    };

    const styleInfo = variantStyleLabels[variant.variantStyle];
    const seoScoreColor = getSeoScoreColor(variant.seoScore);
    const seoScoreBg = getSeoScoreBg(variant.seoScore);

    // Strip markdown for preview (basic)
    const stripMarkdown = (text: string) => {
        return text
            .replace(/^#+\s+/gm, '')
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/`/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                'glass rounded-2xl overflow-hidden transition-all duration-300',
                isSelected && 'ring-2 ring-accent-cyan ring-offset-2 ring-offset-background-primary'
            )}
        >
            {/* Card Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className={cn(
                            'flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm',
                            variant.variantNumber === 1 && 'bg-accent-cyan text-black',
                            variant.variantNumber === 2 && 'bg-accent-blue text-black',
                            variant.variantNumber === 3 && 'bg-accent-purple text-black'
                        )}>
                            {variant.variantNumber}
                        </span>
                        <Badge className={cn('text-xs', styleInfo.color)} variant="outline">
                            {styleInfo.label}
                        </Badge>
                    </div>

                    {isSelected && (
                        <div className="flex items-center gap-1.5 text-accent-cyan text-sm font-medium">
                            <Check className="w-4 h-4" />
                            Selected
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{variant.title}</h3>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                        <FileText className="w-4 h-4" />
                        <span>{variant.wordCount} words</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                        <Clock className="w-4 h-4" />
                        <span>{variant.readingTime}</span>
                    </div>
                    <div className={cn(
                        'flex items-center gap-1.5 px-2 py-0.5 rounded border',
                        seoScoreBg
                    )}>
                        <Target className="w-4 h-4" />
                        <span className={cn('font-semibold', seoScoreColor)}>{variant.seoScore}</span>
                        <span className="text-zinc-400 text-xs">SEO Score</span>
                    </div>
                </div>

                {/* Meta Info */}
                <div className="mt-4 p-3 rounded-lg bg-white/5 space-y-2">
                    <div>
                        <span className="text-xs text-zinc-500 block mb-1">Meta Title</span>
                        <p className="text-sm text-zinc-300">{variant.metaTitle}</p>
                    </div>
                    <div>
                        <span className="text-xs text-zinc-500 block mb-1">Meta Description</span>
                        <p className="text-sm text-zinc-300">{variant.metaDescription}</p>
                    </div>
                </div>
            </div>

            {/* Content Preview */}
            <div className="border-b border-white/10">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between px-6 py-3 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                    <span>Content Preview</span>
                    <ChevronDown className={cn(
                        'w-4 h-4 transition-transform',
                        isExpanded ? 'rotate-180' : ''
                    )} />
                </button>

                {isExpanded && (
                    <div
                        ref={contentRef}
                        onScroll={handleScroll}
                        className="px-6 pb-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
                    >
                        <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                                {stripMarkdown(variant.content)}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Card Footer */}
            <div className="p-6 bg-white/5">
                <Button
                    onClick={onSelect}
                    variant={isSelected ? 'default' : 'outline'}
                    className={cn(
                        'w-full h-12 font-semibold',
                        isSelected
                            ? 'bg-accent-cyan text-black hover:bg-accent-cyan/90 border-0'
                            : 'border-white/10 text-white hover:bg-white/10'
                    )}
                >
                    {isSelected ? (
                        <>
                            <Check className="w-4 h-4 mr-2" />
                            Selected Variant
                        </>
                    ) : (
                        <>
                            <span className="w-4 h-4 mr-2 rounded-full border-2 border-current" />
                            Select This Variant
                        </>
                    )}
                </Button>
            </div>
        </motion.div>
    );
}
