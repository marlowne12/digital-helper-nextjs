'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Search,
    Plus,
    FileText,
    MapPin,
    Briefcase,
    Filter,
    ChevronDown,
    Calendar,
    Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ContentItem, ContentType, ContentStatus } from '@/types/content';

const contentTypes: { value: ContentType; label: string; icon: React.ElementType }[] = [
    { value: 'blog', label: 'Blog Post', icon: FileText },
    { value: 'service', label: 'Service Page', icon: Briefcase },
    { value: 'location', label: 'Location Page', icon: MapPin },
];

const statusConfig: Record<ContentStatus, { label: string; className: string }> = {
    draft: { label: 'Draft', className: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
    reviewing: { label: 'Reviewing', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    selected: { label: 'Selected', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    exported: { label: 'Exported', className: 'bg-green-500/10 text-green-400 border-green-500/20' },
};

const getTypeIcon = (type: ContentType) => contentTypes.find((t) => t.value === type)?.icon || FileText;

interface ContentDashboardProps {
    initialItems?: ContentItem[];
}

export function ContentDashboard({ initialItems = [] }: ContentDashboardProps) {
    const [items, setItems] = useState<ContentItem[]>(initialItems);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<ContentType | 'all'>('all');
    const [statusFilter, setStatusFilter] = useState<ContentStatus | 'all'>('all');
    const [showTypeFilter, setShowTypeFilter] = useState(false);
    const [showStatusFilter, setShowStatusFilter] = useState(false);

    // Fetch items - using useCallback to memoize the function
    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch('/api/content-generator');
            if (response.ok) {
                const data = await response.json();
                setItems(data.items || []);
            }
        } catch (error) {
            console.error('Failed to fetch content items:', error);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchItems();
    }, [fetchItems]);

    // Filter items
    const filteredItems = items.filter((item) => {
        const matchesSearch =
            searchQuery === '' ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.metadata.keywords?.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesType = typeFilter === 'all' || item.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(d);
    };

    const getContentTypeLabel = (type: ContentType) => {
        return contentTypes.find((t) => t.value === type)?.label || type;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Content Generator</h1>
                    <p className="text-zinc-400">Manage AI-generated content for your website</p>
                </div>
                <Link href="/admin/content-generator/new">
                    <Button className="gap-2 bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 border-0">
                        <Plus className="w-4 h-4" />
                        New Content
                    </Button>
                </Link>
            </div>

            {/* Filters and Search */}
            <div className="glass p-6 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <Input
                            placeholder="Search by title or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-accent-cyan/50"
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="relative">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowTypeFilter(!showTypeFilter);
                                setShowStatusFilter(false);
                            }}
                            className="h-12 gap-2 border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10 justify-between min-w-[160px]"
                        >
                            <Filter className="w-4 h-4" />
                            {typeFilter === 'all' ? 'All Types' : getContentTypeLabel(typeFilter)}
                            <ChevronDown className="w-4 h-4" />
                        </Button>

                        {showTypeFilter && (
                            <div className="absolute top-full mt-2 left-0 right-0 glass rounded-lg border border-white/10 overflow-hidden z-50">
                                {contentTypes.map((type) => {
                                    const Icon = type.icon;
                                    return (
                                        <button
                                            key={type.value}
                                            onClick={() => {
                                                setTypeFilter(type.value);
                                                setShowTypeFilter(false);
                                            }}
                                            className={cn(
                                                'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                                                'hover:bg-white/5',
                                                typeFilter === type.value && 'bg-accent-cyan/10 text-accent-cyan'
                                            )}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {type.label}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => {
                                        setTypeFilter('all');
                                        setShowTypeFilter(false);
                                    }}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-t border-white/10',
                                        'hover:bg-white/5',
                                        typeFilter === 'all' && 'bg-accent-cyan/10 text-accent-cyan'
                                    )}
                                >
                                    All Types
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowStatusFilter(!showStatusFilter);
                                setShowTypeFilter(false);
                            }}
                            className="h-12 gap-2 border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10 justify-between min-w-[160px]"
                        >
                            <Filter className="w-4 h-4" />
                            {statusFilter === 'all' ? 'All Status' : statusConfig[statusFilter].label}
                            <ChevronDown className="w-4 h-4" />
                        </Button>

                        {showStatusFilter && (
                            <div className="absolute top-full mt-2 left-0 right-0 glass rounded-lg border border-white/10 overflow-hidden z-50">
                                {(Object.keys(statusConfig) as ContentStatus[]).map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            setStatusFilter(status);
                                            setShowStatusFilter(false);
                                        }}
                                        className={cn(
                                            'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                                            'hover:bg-white/5',
                                            statusFilter === status && 'bg-accent-cyan/10 text-accent-cyan'
                                        )}
                                    >
                                        <span className={cn('w-2 h-2 rounded-full', statusConfig[status].className.split(' ')[0].replace('bg-', 'bg-'))} />
                                        {statusConfig[status].label}
                                    </button>
                                ))}
                                <button
                                    onClick={() => {
                                        setStatusFilter('all');
                                        setShowStatusFilter(false);
                                    }}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-t border-white/10',
                                        'hover:bg-white/5',
                                        statusFilter === 'all' && 'bg-accent-cyan/10 text-accent-cyan'
                                    )}
                                >
                                    All Status
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Clear Filters */}
                    {(typeFilter !== 'all' || statusFilter !== 'all' || searchQuery) && (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setSearchQuery('');
                                setTypeFilter('all');
                                setStatusFilter('all');
                            }}
                            className="h-12 text-zinc-400 hover:text-white"
                        >
                            Clear
                        </Button>
                    )}
                </div>

                {/* Results Count */}
                <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
                    <span>
                        Showing {filteredItems.length} of {items.length} items
                    </span>
                </div>
            </div>

            {/* Content Items Grid */}
            {filteredItems.length === 0 ? (
                <div className="glass p-12 rounded-2xl text-center">
                    <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No content found</h3>
                    <p className="text-zinc-400 mb-6">
                        {items.length === 0
                            ? 'Get started by generating your first content item.'
                            : 'Try adjusting your filters or search query.'}
                    </p>
                    {items.length === 0 && (
                        <Link href="/admin/content-generator/new">
                            <Button className="gap-2 bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 border-0">
                                <Plus className="w-4 h-4" />
                                Generate Content
                            </Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredItems.map((item, index) => {
                        const TypeIcon = getTypeIcon(item.type);
                        const status = statusConfig[item.status];

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/admin/content-generator/${item.id}`}>
                                    <div className="glass p-6 rounded-xl hover:bg-white/[0.04] transition-colors h-full flex flex-col group">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-accent-cyan/10 transition-colors">
                                                    <TypeIcon className="w-4 h-4 text-zinc-400 group-hover:text-accent-cyan transition-colors" />
                                                </div>
                                                <span className="text-sm text-zinc-400">{getContentTypeLabel(item.type)}</span>
                                            </div>
                                            <Badge className={cn('text-xs', status.className)} variant="outline">
                                                {status.label}
                                            </Badge>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-accent-cyan transition-colors">
                                            {item.title}
                                        </h3>

                                        {/* Keywords */}
                                        {item.metadata.keywords && item.metadata.keywords.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {item.metadata.keywords.slice(0, 3).map((keyword, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs px-2 py-1 rounded bg-white/5 text-zinc-400"
                                                    >
                                                        {keyword}
                                                    </span>
                                                ))}
                                                {item.metadata.keywords.length > 3 && (
                                                    <span className="text-xs px-2 py-1 rounded bg-white/5 text-zinc-400">
                                                        +{item.metadata.keywords.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="mt-auto flex items-center justify-between text-xs text-zinc-500 pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(item.createdAt)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FileText className="w-3.5 h-3.5" />
                                                {item.variants.length} variant{item.variants.length !== 1 ? 's' : ''}
                                            </div>
                                        </div>

                                        {/* Selected Variant Indicator */}
                                        {item.selectedVariantId && (
                                            <div className="mt-3 flex items-center gap-2 text-xs text-accent-cyan">
                                                <Clock className="w-3.5 h-3.5" />
                                                Variant selected
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
