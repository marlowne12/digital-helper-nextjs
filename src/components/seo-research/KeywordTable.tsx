import React from 'react';
import { Copy, Star, CheckCircle } from 'lucide-react';

interface Keyword {
  keyword: string;
  searchVolume?: string;
  competitionLevel: string;
  priority: 'high' | 'medium' | 'low';
  intent?: string;
  category: string;
}

interface KeywordTableProps {
  keywords: Keyword[];
  onCopy?: (keyword: string) => void;
  copiedKeyword?: string | null;
}

export function KeywordTable({ keywords, onCopy, copiedKeyword }: KeywordTableProps) {
  const getPriorityStars = (priority: string): React.ReactNode => {
    const count = priority === 'high' ? 3 : priority === 'medium' ? 2 : 1;
    return Array.from({ length: count }, (_, i) => (
      <Star key={`star-${i}`} className="w-3 h-3 fill-amber-400" />
    ));
  };

  const getCompetitionColor = (level: string): string => {
    if (level === 'Low' || level === 'Low-Medium' || level === 'Underserved' || level === 'Very Low') return 'text-green-400';
    if (level === 'Medium') return 'text-yellow-400';
    if (level === 'High' || level === 'High intent' || level === 'High value') return 'text-red-400';
    return 'text-orange-400';
  };

  return (
    <div className="space-y-4">
      {keywords.map((keyword, idx) => (
        <div
          key={idx}
          onClick={onCopy?.bind(null, keyword.keyword)}
          className="group flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/[0.08] border border-white/10 cursor-pointer transition-all"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-sm text-zinc-400">{keyword.keyword}</span>
              {getPriorityStars(keyword.priority)}
            </div>

            {keyword.searchVolume && (
              <span className={`text-xs px-2 py-1 rounded-full ${getCompetitionColor(keyword.competitionLevel)}`}>
                {keyword.searchVolume}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 text-zinc-400">
            {keyword.intent && <span className="text-xs">{keyword.intent}</span>}
            <span className="text-xs font-medium text-zinc-300">{keyword.category}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy?.(keyword.keyword);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
            aria-label={`Copy keyword ${keyword.keyword} to clipboard`}
          >
            {copiedKeyword === keyword.keyword ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-zinc-400" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
