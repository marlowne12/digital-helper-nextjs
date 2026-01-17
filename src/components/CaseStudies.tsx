"use client"

import React, { useState } from 'react';
import { Sparkles, Loader2, Image as ImageIcon, Star, ArrowRight } from 'lucide-react';
import { geminiService } from '@/services/geminiService';
import { CaseStudy } from '@/types';

export const CaseStudies: React.FC = () => {
    const [generatedStudies, setGeneratedStudies] = useState<CaseStudy[]>([]);
    const [industryInput, setIndustryInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Pre-populated realistic case studies
    const staticStudies: CaseStudy[] = [
        {
            id: 'static-1',
            client: "Columbia Basin Plumbing",
            industry: "Home Services",
            challenge: "Their website was from 2008. It wasn't mobile-friendly, and customers couldn't find their phone number easily. Traffic was dropping year over year.",
            solution: "We built a high-speed React site with 'Click-to-Call' buttons sticky on every screen. Integrated Google Reviews directly onto the homepage.",
            results: ["400% increase in mobile calls", "#1 Ranking for 'Richland Plumber'", "Load time reduced from 8s to 0.8s"],
            imageUrl: "https://picsum.photos/seed/plumbing/800/600"
        },
        {
            id: 'static-2',
            client: "Tri-City Dental Care",
            industry: "Healthcare",
            challenge: "Patients were confused about services and couldn't book online. The site looked clinical and cold.",
            solution: "Designed a warm, welcoming aesthetic using Next.js. Added an AI chatbot to answer common questions about insurance and booking.",
            results: ["50+ new patient inquiries/month", "Reduced front-desk call volume by 30%", "Award-winning design"],
            imageUrl: "https://picsum.photos/seed/dental/800/600"
        }
    ];

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!industryInput) return;

        setIsGenerating(true);
        try {
            // 1. Generate Text Content
            const textData = await geminiService.generateCaseStudyText(industryInput);

            // 2. Generate Image
            const imageUrl = await geminiService.generateCaseStudyImage(industryInput);

            const newStudy: CaseStudy = {
                id: Date.now().toString(),
                ...textData,
                imageUrl,
                isAiGenerated: true
            };

            setGeneratedStudies([newStudy, ...generatedStudies]);
            setIndustryInput('');
        } catch (error) {
            console.error("Failed to generate case study", error);
            alert("AI is busy thinking! Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-slate-950 text-white">
            <div className="container mx-auto px-6 py-12">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Real Results for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Local Businesses</span>
                    </h1>
                    <p className="text-slate-400 text-lg">
                        See how Digital Helper transforms outdated websites into growth engines.
                    </p>
                </div>

                {/* AI Generator Section */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 mb-20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2">
                            <div className="inline-flex items-center gap-2 text-purple-400 font-bold mb-2">
                                <Sparkles size={18} />
                                <span>AI Case Study Simulator</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">See Your Future Success</h3>
                            <p className="text-slate-300 mb-6">
                                Not sure what we could do for your specific industry? Enter your business type (e.g., "Bakery", "Law Firm"), and Gemini will generate a
                                <span className="text-purple-400 font-bold"> custom case study & website design</span> instantly.
                            </p>
                            <form onSubmit={handleGenerate} className="flex gap-2">
                                <input
                                    type="text"
                                    value={industryInput}
                                    onChange={(e) => setIndustryInput(e.target.value)}
                                    placeholder="Enter industry (e.g. Coffee Shop)..."
                                    className="flex-1 bg-slate-950 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                    type="submit"
                                    disabled={isGenerating}
                                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                                    Generate
                                </button>
                            </form>
                        </div>
                        <div className="md:w-1/2 w-full bg-slate-950/50 rounded-xl border border-slate-700 h-64 flex items-center justify-center text-slate-500 text-sm p-8 text-center">
                            {isGenerating ? (
                                <div className="space-y-4 animate-pulse">
                                    <div className="flex justify-center"><ImageIcon size={48} className="text-purple-500/50" /></div>
                                    <p>Gemini is designing a website and writing a success story...</p>
                                </div>
                            ) : (
                                <p>Generated case studies will appear below with AI-created website mockups.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Case Studies Grid */}
                <div className="space-y-20">
                    {/* Generated Studies */}
                    {generatedStudies.map((study) => (
                        <div key={study.id} className="animate-fade-in-up bg-slate-900 rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-900/10">
                            <div className="grid md:grid-cols-2">
                                <div className="h-64 md:h-auto relative bg-slate-950">
                                    {study.imageUrl ? (
                                        <img src={study.imageUrl} alt={study.client} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">No Image Generated</div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                        <Sparkles size={10} /> AI Generated
                                    </div>
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">{study.client}</h3>
                                            <p className="text-purple-400 font-medium">{study.industry}</p>
                                        </div>
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
                                        <div>
                                            <h4 className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">Results</h4>
                                            <ul className="space-y-2">
                                                {study.results.map((r, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-green-400">
                                                        <Star size={14} fill="currentColor" /> {r}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Static Studies */}
                    {staticStudies.map((study) => (
                        <div key={study.id} className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-colors">
                            <div className="grid md:grid-cols-2">
                                <div className="h-64 md:h-auto relative overflow-hidden">
                                    <img src={study.imageUrl} alt={study.client} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:bg-gradient-to-r"></div>
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold text-white mb-1">{study.client}</h3>
                                    <p className="text-cyan-400 font-medium mb-6">{study.industry}</p>

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
                                            <div className="flex flex-wrap gap-4">
                                                {study.results.map((r, i) => (
                                                    <span key={i} className="inline-flex items-center gap-1 text-sm text-green-400 bg-green-900/20 px-3 py-1 rounded-full border border-green-900/50">
                                                        <ArrowRight size={12} /> {r}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
