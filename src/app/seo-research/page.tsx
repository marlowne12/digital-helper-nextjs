"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Copy, ChevronDown, ChevronUp, Star, Target, TrendingUp, Lightbulb } from 'lucide-react';

interface Keyword {
  keyword: string;
  searchVolume?: string;
  competitionLevel: string;
  priority: 'high' | 'medium' | 'low';
  intent?: string;
  category: string;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  keywords: Keyword[];
  description: string;
}

const primaryKeywords: Keyword[] = [
  { keyword: 'web design richland wa', searchVolume: 'High', competitionLevel: 'Medium', priority: 'high', intent: 'High commercial', category: 'Web Design' },
  { keyword: 'seo richland wa', searchVolume: 'High', competitionLevel: 'Medium', priority: 'high', intent: 'High commercial', category: 'SEO' },
  { keyword: 'web design tri cities wa', searchVolume: 'High', competitionLevel: 'Medium', priority: 'high', intent: 'High commercial', category: 'Web Design' },
  { keyword: 'seo tri cities', searchVolume: 'High', competitionLevel: 'Medium', priority: 'high', intent: 'High commercial', category: 'SEO' },
  { keyword: 'web design kennewick wa', searchVolume: 'High', competitionLevel: 'Low-Medium', priority: 'high', intent: 'High commercial', category: 'Web Design' },
  { keyword: 'web design pasco wa', searchVolume: 'High', competitionLevel: 'Low-Medium', priority: 'high', intent: 'High commercial', category: 'Web Design' },
  { keyword: 'digital marketing agency richland wa', searchVolume: 'High', competitionLevel: 'Medium', priority: 'high', intent: 'High commercial', category: 'Marketing' },
  { keyword: 'digital marketing tri cities', searchVolume: 'High', competitionLevel: 'Medium', priority: 'high', intent: 'High commercial', category: 'Marketing' },
];

const aiAutomationKeywords: Keyword[] = [
  { keyword: 'ai chatbot for small business richland', searchVolume: '64% planning', competitionLevel: 'Emerging', priority: 'high', intent: 'High-value', category: 'AI' },
  { keyword: 'business automation tri cities', searchVolume: 'Cost reduction', competitionLevel: 'Low competition', priority: 'high', intent: 'Efficiency', category: 'AI' },
  { keyword: 'ai automation agency richland wa', searchVolume: 'Emerging', competitionLevel: 'Low competition', priority: 'high', intent: 'Market opportunity', category: 'AI' },
  { keyword: 'chatbot development tri cities', searchVolume: 'Growing', competitionLevel: 'Revenue-focused', priority: 'high', intent: 'High-value', category: 'AI' },
  { keyword: 'workflow automation richland wa', searchVolume: 'Underserved', competitionLevel: 'Low competition', priority: 'high', intent: 'Efficiency', category: 'AI' },
  { keyword: 'voice ai for business tri cities', searchVolume: 'Emerging', competitionLevel: 'Early adopter', priority: 'high', intent: 'Cutting-edge', category: 'AI' },
  { keyword: 'ai lead generation richland', searchVolume: 'Revenue-focused', competitionLevel: 'High-value', priority: 'high', intent: 'Results-focused', category: 'AI' },
];

const nearMeKeywords: Keyword[] = [
  { keyword: 'web designer near me', searchVolume: '76% voice', competitionLevel: 'Voice optimized', priority: 'high', intent: 'Local intent', category: 'Discovery' },
  { keyword: 'seo company near me', searchVolume: '84% mobile', competitionLevel: 'Mobile-first', priority: 'high', intent: 'Local intent', category: 'Discovery' },
  { keyword: 'digital marketing agency near me', searchVolume: 'High conversion', competitionLevel: 'Local intent', priority: 'high', intent: 'High-value', category: 'Discovery' },
  { keyword: 'website developer near richland', searchVolume: 'Hyperlocal', competitionLevel: 'Geographic', priority: 'high', intent: 'Local targeting', category: 'Discovery' },
  { keyword: 'ai automation near me', searchVolume: 'Emerging + local', competitionLevel: 'Emerging trend', priority: 'high', intent: 'Cutting-edge', category: 'Discovery' },
];

const problemSolvingKeywords: Keyword[] = [
  { keyword: 'my website is too slow richland', searchVolume: 'Performance pain', competitionLevel: 'High intent', priority: 'medium', intent: 'Core problem', category: 'Website Issues' },
  { keyword: 'outdated website redesign tri cities', searchVolume: 'Direct need', competitionLevel: 'High intent', priority: 'medium', intent: 'Immediate action', category: 'Website Issues' },
  { keyword: 'mobile friendly website richland wa', searchVolume: '84% mobile', competitionLevel: 'High intent', priority: 'medium', intent: 'UX requirement', category: 'Website Issues' },
  { keyword: 'website not showing up on google richland', searchVolume: 'SEO pain', competitionLevel: 'High intent', priority: 'medium', intent: 'Visibility issue', category: 'Website Issues' },
  { keyword: 'need a new website richland wa', searchVolume: 'Direct commercial', competitionLevel: 'High intent', priority: 'medium', intent: 'Purchase intent', category: 'Website Issues' },
  { keyword: 'not getting enough leads richland', searchVolume: 'Core business', competitionLevel: 'High value', priority: 'medium', intent: 'Results-focused', category: 'Lead Gen' },
  { keyword: 'google business profile optimization richland', searchVolume: '52% value most', competitionLevel: 'High value', priority: 'medium', intent: 'GBP management', category: 'Reputation' },
];

const categories: Category[] = [
  {
    title: 'High-Priority Primary Keywords',
    icon: <Target className="w-6 h-6 text-accent-primary" />,
    keywords: primaryKeywords,
    description: 'Your bread-and-butter keywords with high commercial intent targeting Richland, Kennewick, and Pasco directly.'
  },
  {
    title: 'AI Automation Keywords (HIGH GROWTH)',
    icon: <TrendingUp className="w-6 h-6 text-accent-tertiary" />,
    keywords: aiAutomationKeywords,
    description: '64% of small businesses planning to adopt chatbots. Average $8 ROI for every $1 invested in chatbots.'
  },
  {
    title: '"Near Me" & Local Discovery',
    icon: <Search className="w-6 h-6 text-accent-secondary" />,
    keywords: nearMeKeywords,
    description: '76% of "near me" mobile searches lead to store visit within 24 hours. 84% of local searches happen on mobile devices.'
  },
  {
    title: 'Problem-Solving Keywords',
    icon: <Lightbulb className="w-6 h-6 text-accent-indigo" />,
    keywords: problemSolvingKeywords,
    description: 'What local business owners are actually searching for when they encounter problems with their online presence.'
  },
];

const top10Keywords = [
  'web design richland wa',
  'seo richland wa',
  'ai automation richland wa',
  'digital marketing tri cities',
  'web designer near me',
  'ai chatbot for small business richland',
  'google business profile optimization richland',
  'nextjs developer richland',
  'lead generation richland wa',
  'ecommerce website richland wa',
];

function getPriorityStars(priority: string): React.ReactNode {
  const count = priority === 'high' ? 3 : priority === 'medium' ? 2 : 1;
  return Array.from({ length: count }, (_, i) => (
    <Star key={`star-${i}`} className="w-4 h-4 fill-amber-400" />
  ));
}

function getCompetitionColor(level: string): string {
  if (level === 'Low' || level === 'Low-Medium' || level === 'Underserved' || level === 'Very Low') return 'text-green-400';
  if (level === 'Medium') return 'text-yellow-400';
  if (level === 'High' || level === 'High intent' || level === 'High value') return 'text-red-400';
  return 'text-orange-400';
}

export default function SEOResearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    return [...primaryKeywords, ...aiAutomationKeywords, ...nearMeKeywords, ...problemSolvingKeywords].filter(kw =>
      kw.keyword.toLowerCase().includes(query) ||
      kw.category.toLowerCase().includes(query) ||
      (kw.intent && kw.intent.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (keyword: string) => {
    await navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background-primary py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-black text-[4rem] md:text-[6rem] lg:text-[7rem] text-white mb-4"
            >
              Tri-Cities
              <span className="text-gradient">Keyword Research</span>
            </motion.h1>
            <p className="text-zinc-300 text-lg max-w-3xl mx-auto">
              Comprehensive keyword research and SEO strategy for Richland, Kennewick, and Pasco businesses.
              Based on market analysis, local search behavior, and competitive landscape.
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search keywords, categories, or insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 h-14 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:bg-white/[0.08] focus:border-accent-primary/50 rounded-xl text-lg transition-all"
              />
            </div>
          </div>

          <div className="grid gap-8">
            {categories.map((category, idx) => {
              const isExpanded = expandedCategories.has(category.title);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="glass rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                    </div>
                    {isExpanded ? <ChevronUp className="w-6 h-6 text-zinc-400" /> : <ChevronDown className="w-6 h-6 text-zinc-400" />}
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-6">
                        <p className="text-zinc-300 mb-6">{category.description}</p>

                        <div className="space-y-4">
                          {category.keywords.map((keyword, kIdx) => (
                            <div
                              key={kIdx}
                              onClick={() => copyToClipboard(keyword.keyword)}
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
                                  copyToClipboard(keyword.keyword);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                title="Copy to clipboard"
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
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-accent-primary" />
              Top 10 Keywords to Target First
            </h2>
            <div className="grid gap-4">
              {top10Keywords.map((keyword, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => copyToClipboard(keyword)}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/[0.08] border border-white/10 cursor-pointer group"
                >
                  <span className="font-mono text-sm text-zinc-400">{idx + 1}. {keyword}</span>
                  <button
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
                    title="Copy to clipboard"
                  >
                    {copiedKeyword === keyword ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {copiedKeyword && (
          <div className="fixed bottom-4 right-4 z-50 glass px-4 py-2 rounded-lg text-white flex items-center gap-2 animate-in-up">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm">Copied: <span className="font-mono text-accent-primary">{copiedKeyword}</span></span>
          </div>
        )}
      </div>
    </div>
  );
}
