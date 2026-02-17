"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Clock, Zap, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

/**
 * HeroAI - AI Automation focused Hero variant
 * Aligned with social media messaging (24/7 AI response, buy back freedom)
 * Created: Sprint 7 - Social Alignment
 */
export const HeroAI: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950" aria-label="Hero">
            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Animated Blobs - AI colors (cyan/purple) */}
                <div className="absolute top-20 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
                <div className="absolute top-40 -right-4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* 24/7 Badge */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/30 backdrop-blur-md text-cyan-400 text-sm mb-8"
                >
                    <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span className="font-semibold">AI Working 24/7</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">Never miss a 3am lead again</span>
                </motion.div>

                {/* Main Headline - Aligned with social messaging */}
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight"
                >
                    Your Competitor Got a Lead at 3am.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 animate-shimmer bg-[size:200%_auto]">
                        Their AI Responded First.
                    </span>
                </motion.h1>

                {/* Subheadline - Value prop */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed"
                >
                    We build AI systems that respond to leads in seconds, qualify prospects while you sleep, 
                    and book appointments directly into your calendar.
                </motion.p>

                {/* Key stat - aligned with social content */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-cyan-400 font-semibold mb-10"
                >
                    The first business to respond wins <span className="text-white text-xl">78%</span> of the time.
                </motion.p>

                {/* CTAs */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button asChild className="h-14 px-8 text-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold rounded-full hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-cyan-500/25 group">
                        <a href="#contact">
                            Get Your AI System <Bot className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="h-14 px-8 text-lg glass text-white border-white/10 hover:bg-white/10 font-medium rounded-full backdrop-blur-sm">
                        <Link href="#roi-calculator">
                            <Zap className="mr-2 h-5 w-5" /> Calculate Your ROI
                        </Link>
                    </Button>
                </motion.div>

                {/* Stats Bar - Social-aligned metrics */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
                >
                    <div className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Clock className="h-5 w-5 text-cyan-400" />
                            <span className="text-2xl md:text-3xl font-bold text-white">14s</span>
                        </div>
                        <div className="text-xs text-slate-500">Avg Response Time</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Bot className="h-5 w-5 text-violet-400" />
                            <span className="text-2xl md:text-3xl font-bold text-white">24/7</span>
                        </div>
                        <div className="text-xs text-slate-500">AI Availability</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Zap className="h-5 w-5 text-amber-400" />
                            <span className="text-2xl md:text-3xl font-bold text-white">10-20h</span>
                        </div>
                        <div className="text-xs text-slate-500">Hours Saved/Week</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Phone className="h-5 w-5 text-green-400" />
                            <span className="text-2xl md:text-3xl font-bold text-white">42%</span>
                        </div>
                        <div className="text-xs text-slate-500">Conversion Rate</div>
                    </div>
                </motion.div>

                {/* Visual: AI Chat Simulation */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-16 max-w-lg mx-auto hidden md:block"
                >
                    <div className="bg-slate-900/80 rounded-2xl border border-slate-700/50 p-4 shadow-2xl backdrop-blur-sm">
                        {/* Chat Header */}
                        <div className="flex items-center gap-3 pb-3 border-b border-slate-700/50 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                                <Bot className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <div className="text-white font-semibold text-sm">AI Assistant</div>
                                <div className="text-green-400 text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                    Online now • 3:14 AM
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="space-y-3">
                            {/* Customer message */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2 }}
                                className="flex justify-end"
                            >
                                <div className="bg-cyan-500/20 text-cyan-100 px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] text-sm">
                                    Hey, my AC broke and it&apos;s 95° in my house. Can someone come today?
                                </div>
                            </motion.div>

                            {/* AI response */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.8 }}
                                className="flex justify-start"
                            >
                                <div className="bg-slate-800 text-slate-200 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%] text-sm">
                                    I&apos;m so sorry to hear that! 🔧 We have a technician available this morning. I can book you for 8:30 AM. Would that work?
                                </div>
                            </motion.div>

                            {/* Customer message */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2.4 }}
                                className="flex justify-end"
                            >
                                <div className="bg-cyan-500/20 text-cyan-100 px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] text-sm">
                                    Yes please! That&apos;s perfect.
                                </div>
                            </motion.div>

                            {/* AI response with confirmation */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 3 }}
                                className="flex justify-start"
                            >
                                <div className="bg-slate-800 text-slate-200 px-4 py-2 rounded-2xl rounded-bl-sm max-w-[80%] text-sm">
                                    <div className="mb-2">Done! ✅ You&apos;re booked for 8:30 AM with Mike. He&apos;ll text you 30 min before arrival.</div>
                                    <div className="text-xs text-slate-400 italic">Appointment confirmed • Calendar invite sent</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Timestamp */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3.5 }}
                            className="text-center mt-4 text-xs text-slate-500"
                        >
                            Lead captured at 3:14 AM • Appointment booked in 47 seconds
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroAI;
