import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto mb-8">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:bg-white/[0.08] focus:border-accent-primary/50 rounded-xl text-lg transition-all"
        aria-label="Search keywords and categories"
      />
    </div>
  );
}
