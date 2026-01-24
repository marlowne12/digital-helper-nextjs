import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function CategorySection({ title, icon, description, isExpanded, onToggle, children }: CategorySectionProps) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.05] transition-colors"
        aria-expanded={isExpanded}
        aria-controls={`category-${title.replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        {isExpanded ? <ChevronUp className="w-6 h-6 text-zinc-400" /> : <ChevronDown className="w-6 h-6 text-zinc-400" />}
      </button>

      {isExpanded && (
        <div className="p-6 border-t border-white/10">
          <p className="text-zinc-300 mb-6">{description}</p>
          {children}
        </div>
      )}
    </div>
  );
}
