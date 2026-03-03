"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Loader2, Star, ArrowRight, ArrowUpRight, TrendingUp, Clock, Trophy } from 'lucide-react';
import { CaseStudy } from '@/types';

// Pre-populated realistic case studies - these should feel authentic to Tri-Cities
const staticStudies: CaseStudy[] = [
    {
        id: 'static-1',
        client: "Columbia Basin Plumbing",
        industry: "Plumbing",
        challenge: "Their website was from 2008. It wasn't mobile-friendly, and customers couldn't find their phone number easily. They were losing emergency calls to competitors with better online presence.",
        solution: "We built a high-speed React site with 'Click-to-Call' buttons sticky on every screen. Integrated Google Reviews directly onto the homepage and added an AI chatbot for after-hours inquiries.",
        results: [
            "400% increase in mobile calls",
            "#1 Ranking for 'Richland Plumber'",
            "Load time reduced from 8s to 0.8s"
        ],
        imageUrl: "https://picsum.photos/seed/plumbing-pro/800/600"
    },
    {
        id: 'static-2',
        client: "Tri-City Dental Care",
        industry: "Dental",
        challenge: "Patients were confused about services and couldn't book online. The site looked clinical and cold, driving potential patients to more modern competitors.",
        solution: "Designed a warm, welcoming aesthetic using Next.js. Added an AI chatbot to answer common questions about insurance and booking, plus automated appointment reminders.",
        results: [
            "50+ new patient inquiries/month",
            "Reduced front-desk call volume by 30%",
            "Online bookings up 250%"
        ],
        imageUrl: "https://picsum.photos/seed/dental-care/800/600"
    },
    {
        id: 'static-3',
        client: "Desert Comfort HVAC",
        industry: "HVAC",
        challenge: "During peak summer and winter seasons, they couldn't handle the call volume. Leads were going to voicemail and never called back. Their website had no way to capture emergency requests.",
        solution: "Implemented a 24/7 AI receptionist that qualifies leads and schedules appointments instantly. Built a mobile-first website with emergency service request forms and real-time availability.",
        results: [
            "14-second average response time",
            "Zero missed leads during peak season",
            "$127K additional revenue in first year"
        ],
        imageUrl: "https://picsum.photos/seed/hvac-comfort/800/600"
    },
    {
        id: 'static-4',
        client: "Kennewick Auto Repair",
        industry: "Automotive",
        challenge: "Customers couldn't easily see available appointment slots, and the shop was getting overwhelmed with phone calls for simple scheduling questions. Reviews were scattered across different platforms.",
        solution: "Created a booking system that syncs with their shop management software. Built a reputation dashboard that aggregates and responds to reviews automatically across Google, Yelp, and Facebook.",
        results: [
            "4.8 → 4.9 star average rating",
            "45% reduction in scheduling calls",
            "Automated 200+ review responses/month"
        ],
        imageUrl: "https://picsum.photos/seed/auto-repair/800/600"
    }
];

export const CaseStudies: React.FC = () => {
    const [generatedStudies, setGeneratedStudies] = useState<CaseStudy[]>([]);
    const [industryInput, setIndustryInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!industryInput.trim()) return;

        setIsGenerating(true);
        setError(null);

        try {
            const response = await fetch('/api/case-study', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ industry: industryInput.trim() })
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Generation failed');
            }

            const newStudy: CaseStudy = {
                id: Date.now().toString(),
                ...result.data,
                isAiGenerated: true
            };

            setGeneratedStudies([newStudy, ...generatedStudies]);
            setIndustryInput('');
        } catch (err) {
            console.error("Failed to generate case study", err);
            setError(err instanceof Error ? err.message : 'AI is busy thinking! Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Quick industry buttons for easy generation
    const quickIndustries = [
        'Restaurant', 'Law Firm', 'Landscaping', 'Roofing',
        'Real Estate', 'Fitness Studio', 'Salon', 'Electrician'
    ];

    return (
        <div className="pt-24 min-h-screen bg-slate-950 text-white">
            <div className="container mx-auto px-6 py-12">

                {/* Header with Stats */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
                        <Trophy size={16} />
                        Built for Tri-Cities Businesses
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        What We Can Build <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">For Your Business</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-8">
                        These are example projects showing what&apos;s possible — the same approach, tailored for your business.
                    </p>

                    {/* Capability Highlights */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                            <div className="flex items-center justify-center gap-2 text-indigo-400 mb-1">
                                <TrendingUp size={18} />
                                <span className="text-2xl font-bold">Fast</span>
                            </div>
                            <p className="text-xs text-slate-500">10-day avg launch</p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                            <div className="flex items-center justify-center gap-2 text-cyan-400 mb-1">
                                <Clock size={18} />
                                <span className="text-2xl font-bold">24/7</span>
                            </div>
                            <p className="text-xs text-slate-500">AI lead capture</p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                            <div className="flex items-center justify-center gap-2 text-amber-400 mb-1">
                                <Star size={18} fill="currentColor" />
                                <span className="text-2xl font-bold">Local</span>
                            </div>
                            <p className="text-xs text-slate-500">Tri-Cities focused</p>
                        </div>
                    </div>
                </div>

                {/* AI Generator Section */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 mb-20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 p-24 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 text-purple-400 font-bold mb-2">
                                <Sparkles size={18} />
                                <span>AI Case Study Simulator</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">See Your Future Success</h3>
                            <p className="text-slate-300 max-w-2xl mx-auto">
                                Not sure what we could do for your specific industry? Enter your business type and our AI will generate a 
                                <span className="text-purple-400 font-bold"> custom case study</span> showing potential results.
                            </p>
                        </div>

                        <form onSubmit={handleGenerate} className="max-w-xl mx-auto mb-6">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={industryInput}
                                    onChange={(e) => setIndustryInput(e.target.value)}
                                    placeholder="Enter your industry (e.g., Coffee Shop, Law Firm)..."
                                    className="flex-1 bg-slate-950 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-slate-500"
                                    disabled={isGenerating}
                                />
                                <button
                                    type="submit"
                                    disabled={isGenerating || !industryInput.trim()}
                                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-purple-600/20"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            <span className="hidden sm:inline">Generating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={18} />
                                            <span className="hidden sm:inline">Generate</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            {error && (
                                <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
                            )}
                        </form>

                        {/* Quick Industry Buttons */}
                        <div className="flex flex-wrap justify-center gap-2">
                            <span className="text-slate-500 text-sm">Quick picks:</span>
                            {quickIndustries.map((industry) => (
                                <button
                                    key={industry}
                                    onClick={() => setIndustryInput(industry)}
                                    className="px-3 py-1 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors"
                                    disabled={isGenerating}
                                >
                                    {industry}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Case Studies Grid */}
                <div className="space-y-16">
                    {/* Generated Studies */}
                    {generatedStudies.map((study, index) => (
                        <CaseStudyCard 
                            key={study.id} 
                            study={study} 
                            isGenerated={true}
                            index={index}
                        />
                    ))}

                    {/* Static Studies */}
                    {staticStudies.map((study, index) => (
                        <CaseStudyCard 
                            key={study.id} 
                            study={study} 
                            isGenerated={false}
                            index={index + generatedStudies.length}
                        />
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-24 text-center">
                    <div className="bg-gradient-to-r from-accent-primary/10 to-cyan-500/10 border border-accent-primary/20 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Be Our First Success Story?
                        </h2>
                        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                            We&apos;re a new agency in the Tri-Cities — which means you get agency-quality work with founder-level attention.
                            Get a free website audit and see exactly how we can help your business grow.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
                            >
                                Book Free Strategy Call
                                <ArrowUpRight size={18} />
                            </Link>
                            <Link 
                                href="/pricing"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Individual Case Study Card Component
interface CaseStudyCardProps {
    study: CaseStudy;
    isGenerated: boolean;
    index: number;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, isGenerated, index }) => {
    // Alternate layout direction
    const isReversed = index % 2 === 1;

    return (
        <div 
            className={`
                group bg-slate-900 rounded-3xl overflow-hidden border 
                ${isGenerated ? 'border-purple-500/30 shadow-2xl shadow-purple-900/10 animate-fade-in-up' : 'border-slate-800 hover:border-slate-700'}
                transition-colors
            `}
        >
            <div className={`grid md:grid-cols-2 ${isReversed ? 'md:grid-flow-dense' : ''}`}>
                {/* Image */}
                <div className={`h-64 md:h-auto relative overflow-hidden ${isReversed ? 'md:col-start-2' : ''}`}>
                    {study.imageUrl && (
                        <Image
                            src={study.imageUrl}
                            alt={`${study.client} - ${study.industry} website transformation by Digital Helper`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent ${isReversed ? 'md:bg-gradient-to-l' : 'md:bg-gradient-to-r'}`}></div>
                    
                    {/* Badge */}
                    {isGenerated ? (
                        <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <Sparkles size={10} /> AI Generated
                        </div>
                    ) : (
                        <div className="absolute top-4 left-4 bg-white/10 border border-white/20 text-white/60 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                            Example Project
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white mb-1">{study.client}</h3>
                        <p className={`font-medium ${isGenerated ? 'text-purple-400' : 'text-cyan-400'}`}>
                            {study.industry}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">The Challenge</h4>
                            <p className="text-slate-300 leading-relaxed">{study.challenge}</p>
                        </div>
                        <div>
                            <h4 className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">The Solution</h4>
                            <p className="text-slate-300 leading-relaxed">{study.solution}</p>
                        </div>
                        <div className="pt-4 border-t border-slate-800">
                            <h4 className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-3">Results</h4>
                            <div className="flex flex-wrap gap-3">
                                {study.results.map((result, i) => (
                                    <span 
                                        key={i} 
                                        className="inline-flex items-center gap-2 text-sm text-green-400 bg-green-900/20 px-4 py-2 rounded-full border border-green-900/50"
                                    >
                                        <ArrowRight size={14} /> {result}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;
