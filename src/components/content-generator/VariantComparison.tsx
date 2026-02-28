'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Download,
    RefreshCw,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VariantCard } from './VariantCard';
import { cn } from '@/lib/utils';
import type { ContentItem } from '@/types/content';

interface VariantComparisonProps {
    contentItem: ContentItem;
}

const statusConfig: Record<string, { label: string; className: string }> = {
    draft: { label: 'Draft', className: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
    reviewing: { label: 'Reviewing', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    selected: { label: 'Selected', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    exported: { label: 'Exported', className: 'bg-green-500/10 text-green-400 border-green-500/20' },
};

export function VariantComparison({ contentItem }: VariantComparisonProps) {
    const router = useRouter();
    const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(contentItem.selectedVariantId);
    const [isSelecting, setIsSelecting] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [status, setStatus] = useState(contentItem.status);

    const handleScrollSync = (scrollTop: number) => {
        setScrollPosition(scrollTop);
    };

    const handleSelectVariant = async (variantId: string) => {
        if (isSelecting) return;

        setIsSelecting(true);
        try {
            const response = await fetch(`/api/content-generator/${contentItem.id}/select`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ variantId }),
            });

            if (!response.ok) {
                throw new Error('Failed to select variant');
            }

            setSelectedVariantId(variantId);
            setStatus('selected');
        } catch (error) {
            console.error('Failed to select variant:', error);
        } finally {
            setIsSelecting(false);
        }
    };

    const handleRegenerate = async (variantId: string) => {
        if (isRegenerating) return;

        setIsRegenerating(true);
        try {
            const response = await fetch(`/api/content-generator/${contentItem.id}/regenerate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ variantId }),
            });

            if (!response.ok) {
                throw new Error('Failed to regenerate variant');
            }

            // Refresh the page to get new data
            router.refresh();
        } catch (error) {
            console.error('Failed to regenerate variant:', error);
        } finally {
            setIsRegenerating(false);
        }
    };

    const handleExport = async () => {
        if (!selectedVariantId || isExporting) return;

        setIsExporting(true);
        try {
            const response = await fetch(`/api/content-generator/${contentItem.id}/export`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Failed to export content');
            }

            setStatus('exported');
        } catch (error) {
            console.error('Failed to export content:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const statusInfo = statusConfig[status] || statusConfig.draft;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/content-generator">
                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-white">{contentItem.title}</h1>
                            <Badge className={cn('text-xs', statusInfo.className)} variant="outline">
                                {statusInfo.label}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                            <span className="capitalize">{contentItem.type}</span>
                            {contentItem.metadata.location && (
                                <span className="flex items-center gap-1">
                                    <span>in</span>
                                    <span className="text-accent-cyan">{contentItem.metadata.location}</span>
                                </span>
                            )}
                            {contentItem.metadata.keywords && contentItem.metadata.keywords.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <span>Keywords:</span>
                                    {contentItem.metadata.keywords.slice(0, 3).map((keyword, idx) => (
                                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-zinc-300">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleExport}
                        disabled={!selectedVariantId || isExporting || status === 'exported'}
                        variant="outline"
                        className={cn(
                            'gap-2 border-white/10',
                            selectedVariantId && 'hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/30'
                        )}
                    >
                        {isExporting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : status === 'exported' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        {status === 'exported' ? 'Exported' : 'Export'}
                    </Button>

                    {selectedVariantId && status !== 'exported' && (
                        <Button
                            asChild
                            className="gap-2 bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 border-0"
                        >
                            <a href={`/preview/${contentItem.slug}`} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                                Preview
                            </a>
                        </Button>
                    )}
                </div>
            </div>

            {/* Variants Grid */}
            {contentItem.variants.length === 0 ? (
                <div className="glass p-12 rounded-2xl text-center">
                    <AlertCircle className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No variants available</h3>
                    <p className="text-zinc-400">The content generation is still in progress.</p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                    {contentItem.variants.map((variant) => (
                        <div key={variant.id} className="space-y-4">
                            <VariantCard
                                variant={variant}
                                isSelected={selectedVariantId === variant.id}
                                onSelect={() => handleSelectVariant(variant.id)}
                                onScrollSync={handleScrollSync}
                                externalScrollTop={scrollPosition}
                            />

                            {/* Regenerate Button */}
                            <Button
                                onClick={() => handleRegenerate(variant.id)}
                                disabled={isRegenerating}
                                variant="ghost"
                                className="w-full gap-2 text-zinc-400 hover:text-white hover:bg-white/5"
                            >
                                <RefreshCw className={cn('w-4 h-4', isRegenerating && 'animate-spin')} />
                                Regenerate Variant {variant.variantNumber}
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* Selection Notice */}
            {selectedVariantId && status !== 'exported' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-6 rounded-xl border border-accent-cyan/20 bg-accent-cyan/5"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-accent-cyan/20">
                            <CheckCircle2 className="w-6 h-6 text-accent-cyan" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">Variant Selected</h3>
                            <p className="text-sm text-zinc-400">
                                You can now export this content or preview it before finalizing.
                            </p>
                        </div>
                        <Button
                            onClick={handleExport}
                            disabled={isExporting}
                            className="gap-2 bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 border-0"
                        >
                            {isExporting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Download className="w-4 h-4" />
                            )}
                            Export Content
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Exported Notice */}
            {status === 'exported' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-6 rounded-xl border border-green-500/20 bg-green-500/5"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-green-500/20">
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white mb-1">Content Exported</h3>
                            <p className="text-sm text-zinc-400">
                                {contentItem.exportPath
                                    ? `Exported to: ${contentItem.exportPath}`
                                    : 'Content has been exported successfully.'}
                            </p>
                        </div>
                        <Button
                            asChild
                            className="gap-2 bg-white/10 text-white hover:bg-white/20 border-0"
                        >
                            <Link href="/admin/content-generator">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Dashboard
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
