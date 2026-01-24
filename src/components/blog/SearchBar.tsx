
'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`/blog?${params.toString()}`);
    }, 300);

    return (
        <div className="relative mb-8 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-full py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-accent-purple/50 transition-colors"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('q')?.toString()}
            />
        </div>
    );
}
