'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    FileText,
    Briefcase,
    MapPin,
    Sparkles,
    Loader2,
    X,
    Plus,
    AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ContentType, ContentTone } from '@/types/content';

const contentTypes: { value: ContentType; label: string; icon: React.ElementType; description: string }[] = [
    {
        value: 'blog',
        label: 'Blog Post',
        icon: FileText,
        description: 'SEO-optimized blog articles with engaging content',
    },
    {
        value: 'service',
        label: 'Service Page',
        icon: Briefcase,
        description: 'Detailed service pages with benefits and pricing',
    },
    {
        value: 'location',
        label: 'Location Page',
        icon: MapPin,
        description: 'Local SEO pages for specific geographic areas',
    },
];

const toneOptions: { value: ContentTone; label: string; description: string }[] = [
    { value: 'professional', label: 'Professional', description: 'Formal, authoritative tone' },
    { value: 'casual', label: 'Casual', description: 'Friendly, conversational tone' },
    { value: 'urgent', label: 'Urgent', description: 'Action-oriented, compelling tone' },
];

interface ContentFormProps {
    onSuccess?: (contentItemId: string) => void;
}

export function ContentForm({ onSuccess }: ContentFormProps) {
    const router = useRouter();

    // Form state
    const [contentType, setContentType] = useState<ContentType>('blog');
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordInput, setKeywordInput] = useState('');
    const [location, setLocation] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [tone, setTone] = useState<ContentTone>('professional');
    const [targetLength, setTargetLength] = useState(1000);
    const [additionalContext, setAdditionalContext] = useState('');

    // UI state
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddKeyword = () => {
        const trimmed = keywordInput.trim();
        if (trimmed && !keywords.includes(trimmed)) {
            setKeywords([...keywords, trimmed]);
            setKeywordInput('');
        }
    };

    const handleRemoveKeyword = (keyword: string) => {
        setKeywords(keywords.filter((k) => k !== keyword));
    };

    const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddKeyword();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!topic.trim()) {
            setError('Please enter a topic or title');
            return;
        }

        if (contentType === 'location' && !location.trim()) {
            setError('Please enter a location for location pages');
            return;
        }

        setIsGenerating(true);

        try {
            const response = await fetch('/api/content-generator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: contentType,
                    topic: topic.trim(),
                    keywords,
                    location: contentType === 'location' ? location.trim() : undefined,
                    targetAudience: targetAudience.trim() || undefined,
                    tone,
                    targetLength,
                    additionalContext: additionalContext.trim() || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate content');
            }

            // Navigate to the variant comparison page
            const contentItemId = data.contentItem?.id || data.id;
            if (contentItemId) {
                if (onSuccess) {
                    onSuccess(contentItemId);
                } else {
                    router.push(`/admin/content-generator/${contentItemId}`);
                }
            }
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Failed to generate content');
        } finally {
            setIsGenerating(false);
        }
    };

    // Note: selectedType and selectedTone are available if needed for future features
    // const selectedType = contentTypes.find((t) => t.value === contentType);
    // const selectedTone = toneOptions.find((t) => t.value === tone);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="glass p-8 rounded-2xl relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                {/* Header */}
                <div className="relative mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-accent-cyan" />
                        Generate New Content
                    </h1>
                    <p className="text-zinc-400">
                        AI-powered content generation with multiple variants to choose from
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-red-400">{error}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Content Type Selector */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-3">
                            Content Type
                        </label>
                        <div className="grid md:grid-cols-3 gap-4">
                            {contentTypes.map((type) => {
                                const Icon = type.icon;
                                const isSelected = contentType === type.value;
                                return (
                                    <button
                                        key={type.value}
                                        type="button"
                                        onClick={() => setContentType(type.value)}
                                        className={cn(
                                            'relative p-4 rounded-xl border-2 text-left transition-all duration-200',
                                            'hover:border-white/20',
                                            isSelected
                                                ? 'border-accent-cyan bg-accent-cyan/5'
                                                : 'border-white/10 bg-white/5'
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={cn(
                                                'p-2 rounded-lg transition-colors',
                                                isSelected ? 'bg-accent-cyan/20 text-accent-cyan' : 'bg-white/5 text-zinc-400'
                                            )}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className={cn(
                                                    'font-semibold mb-1',
                                                    isSelected ? 'text-white' : 'text-zinc-300'
                                                )}>
                                                    {type.label}
                                                </h3>
                                                <p className="text-sm text-zinc-500">{type.description}</p>
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent-cyan shadow-lg shadow-accent-cyan/50" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Topic/Title Input */}
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-zinc-300 mb-2">
                            Topic / Title <span className="text-red-400">*</span>
                        </label>
                        <Input
                            id="topic"
                            placeholder={contentType === 'blog'
                                ? 'e.g., "10 Ways to Improve Your Local SEO"'
                                : contentType === 'service'
                                    ? 'e.g., "Web Design Services"'
                                    : 'e.g., "Web Design in Miami"'
                            }
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-accent-cyan/50"
                        />
                    </div>

                    {/* Keywords Input */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Keywords <span className="text-zinc-500 font-normal">(optional)</span>
                        </label>
                        <div className="relative">
                            <Input
                                placeholder="Add keywords and press Enter"
                                value={keywordInput}
                                onChange={(e) => setKeywordInput(e.target.value)}
                                onKeyDown={handleKeywordKeyDown}
                                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-accent-cyan/50 pr-24"
                            />
                            <Button
                                type="button"
                                onClick={handleAddKeyword}
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-accent-cyan hover:bg-accent-cyan/10"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        {keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {keywords.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-sm"
                                    >
                                        {keyword}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveKeyword(keyword)}
                                            className="hover:text-white transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Location Input (for location pages) */}
                    {contentType === 'location' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <label htmlFor="location" className="block text-sm font-medium text-zinc-300 mb-2">
                                Location <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <Input
                                    id="location"
                                    placeholder="e.g., Miami, FL"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-accent-cyan/50"
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Target Audience Input */}
                    <div>
                        <label htmlFor="audience" className="block text-sm font-medium text-zinc-300 mb-2">
                            Target Audience <span className="text-zinc-500 font-normal">(optional)</span>
                        </label>
                        <Input
                            id="audience"
                            placeholder="e.g., Small business owners, marketing managers"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-accent-cyan/50"
                        />
                    </div>

                    {/* Tone Selector */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-3">
                            Content Tone
                        </label>
                        <div className="grid md:grid-cols-3 gap-4">
                            {toneOptions.map((toneOption) => {
                                const isSelected = tone === toneOption.value;
                                return (
                                    <button
                                        key={toneOption.value}
                                        type="button"
                                        onClick={() => setTone(toneOption.value)}
                                        className={cn(
                                            'p-4 rounded-xl border-2 text-left transition-all duration-200',
                                            'hover:border-white/20',
                                            isSelected
                                                ? 'border-accent-cyan bg-accent-cyan/5'
                                                : 'border-white/10 bg-white/5'
                                        )}
                                    >
                                        <h3 className={cn(
                                            'font-semibold mb-1',
                                            isSelected ? 'text-white' : 'text-zinc-300'
                                        )}>
                                            {toneOption.label}
                                        </h3>
                                        <p className="text-sm text-zinc-500">{toneOption.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Target Length Slider */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-3">
                            Target Length: <span className="text-accent-cyan">{targetLength} words</span>
                        </label>
                        <input
                            type="range"
                            min={300}
                            max={3000}
                            step={100}
                            value={targetLength}
                            onChange={(e) => setTargetLength(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-accent-cyan"
                            style={{
                                background: `linear-gradient(to right, #00d4aa ${(targetLength - 300) / (3000 - 300) * 100}%, #27272a ${(targetLength - 300) / (3000 - 300) * 100}%)`,
                            }}
                        />
                        <div className="flex justify-between text-xs text-zinc-500 mt-2">
                            <span>300 words</span>
                            <span>3000 words</span>
                        </div>
                    </div>

                    {/* Additional Context Textarea */}
                    <div>
                        <label htmlFor="context" className="block text-sm font-medium text-zinc-300 mb-2">
                            Additional Context <span className="text-zinc-500 font-normal">(optional)</span>
                        </label>
                        <Textarea
                            id="context"
                            placeholder="Add any additional context, specific points to include, or requirements for the content..."
                            value={additionalContext}
                            onChange={(e) => setAdditionalContext(e.target.value)}
                            rows={4}
                            className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-accent-cyan/50"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-white/10">
                        <Button
                            type="submit"
                            disabled={isGenerating || !topic.trim() || (contentType === 'location' && !location.trim())}
                            className="w-full h-14 text-lg bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 border-0 disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Generating Content...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Generate Content Variants
                                </>
                            )}
                        </Button>
                        <p className="text-center text-sm text-zinc-500 mt-3">
                            AI will generate 3 different variants for you to choose from
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
