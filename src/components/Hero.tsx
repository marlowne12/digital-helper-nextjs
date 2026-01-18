import React from 'react';
import { ArrowRight, RefreshCw, Cpu, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export const Hero: React.FC = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Animated Blobs */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-md text-cyan-400 text-sm mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Serving Richland & Tri-Cities Businesses
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Richland's Premier <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 animate-shimmer bg-[size:200%_auto]">
                        Website Modernization
                    </span> Agency
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Transform your Tri-Cities business website into a lead-generating machine. Digital Helper serves Richland, Kennewick, and Pasco with modern web design, mobile optimization, and AI-powered solutions.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Button asChild className="h-14 px-8 text-lg bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all hover:scale-105 shadow-lg shadow-white/10 group">
                        <Link href="/booking" className="flex items-center">
                            Get a Modern Site <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                    <Button variant="outline" className="h-14 px-8 text-lg glass text-white border-white/10 hover:bg-white/10 font-medium rounded-full backdrop-blur-sm">
                        <RefreshCw className="mr-2 h-5 w-5" /> View Transformations
                    </Button>
                </div>

                {/* Floating Abstract Cards - Enhanced Visuals */}
                <div className="mt-20 flex justify-center gap-6 opacity-90 select-none pointer-events-none animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    {/* Card 1: Old Tech */}
                    <div className="w-48 h-64 glass rounded-2xl rotate-[-6deg] translate-y-8 shadow-2xl flex flex-col p-4 animate-float" style={{ animationDelay: '0s' }}>
                        <div className="w-full h-2 bg-slate-700/50 rounded mb-2"></div>
                        <div className="w-2/3 h-2 bg-slate-700/50 rounded mb-4"></div>
                        <div className="flex-1 border border-red-500/20 bg-red-500/5 rounded flex flex-col items-center justify-center gap-2">
                            <Globe size={32} className="text-red-400 opacity-50" />
                            <span className="text-red-400 text-xs font-mono bg-red-500/10 px-2 py-1 rounded">LEGACY CODE</span>
                        </div>
                    </div>

                    {/* Card 2: Modern Tech (Center) */}
                    <div className="w-48 h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-cyan-500/50 rotate-[0deg] z-10 shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)] flex flex-col p-4 relative animate-float" style={{ animationDelay: '1s' }}>
                        <div className="absolute -top-3 -right-3 bg-cyan-500 text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <Cpu size={10} /> AI POWERED
                        </div>
                        <div className="w-full h-32 bg-slate-950 rounded-lg mb-3 overflow-hidden border border-slate-700 relative group">
                            <div className="absolute inset-0 bg-cyan-500/20 animate-pulse"></div>
                            {/* Using CSS gradient placeholder instead of image to avoid unoptimized warnings for now */}
                            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 opacity-60"></div>
                        </div>
                        <div className="w-full h-2 bg-cyan-900/50 rounded mb-2 overflow-hidden">
                            <div className="w-full h-full bg-cyan-400 animate-shimmer"></div>
                        </div>
                        <div className="w-3/4 h-2 bg-cyan-900/50 rounded"></div>
                    </div>

                    {/* Card 3: Slow Load */}
                    <div className="w-48 h-64 glass rounded-2xl rotate-[6deg] translate-y-8 shadow-2xl flex flex-col p-4 animate-float" style={{ animationDelay: '2s' }}>
                        <div className="w-full h-2 bg-slate-700/50 rounded mb-2"></div>
                        <div className="w-2/3 h-2 bg-slate-700/50 rounded mb-4"></div>
                        <div className="flex-1 border border-orange-500/20 bg-orange-500/5 rounded flex flex-col items-center justify-center gap-2">
                            <div className="w-8 h-8 rounded-full border-2 border-orange-400 border-t-transparent animate-spin"></div>
                            <span className="text-orange-400 text-xs font-mono">LOADING...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
