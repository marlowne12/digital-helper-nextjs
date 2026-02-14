'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Command } from 'lucide-react';
import { motion } from 'framer-motion';

interface GbpSearchProps {
    onSearch: (query: string) => Promise<void>;
    isLoading: boolean;
}

export default function GbpSearch({ onSearch, isLoading }: GbpSearchProps) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-medium uppercase tracking-wider"
                >
                    <Command className="w-3 h-3" />
                    AI Intelligence Suite
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Audit Your <span className="text-gradient">Reputation</span>
                </h1>
                <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                    Enter your business name to unlock a comprehensive AI analysis of your Google Business Profile.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="relative group max-w-2xl mx-auto">
                <div className={`absolute inset-0 bg-accent-gradient rounded-full blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-30' : 'opacity-10 group-hover:opacity-20'}`} />
                <div className="relative flex items-center p-2 bg-background-secondary/80 backdrop-blur-xl border border-white/10 rounded-full transition-all focus-within:border-accent-purple/50 focus-within:ring-1 focus-within:ring-accent-purple/50 ring-offset-2 ring-offset-background-primary">
                    <Search className={`w-6 h-6 ml-4 transition-colors ${isFocused ? 'text-accent-purple' : 'text-zinc-500'}`} />
                    <input
                        className="flex-1 bg-transparent border-none text-white placeholder:text-zinc-600 focus:outline-none focus:ring-0 px-4 h-12 text-lg"
                        placeholder="e.g. Joe's Pizza, Richland WA..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading || !query.trim()}
                        className="h-12 px-8 rounded-full btn-primary"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            'Audit Now'
                        )}
                    </Button>
                </div>
            </form>

            <div className="flex justify-center gap-8 text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Sentiment Analysis</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Keyword Gaps</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Auto-Replies</span>
            </div>
        </div>
    );
}
