"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { HeroAuditWidget } from "@/components/HeroAuditWidget"
import { noiseTextureStyle } from '@/lib/utils'


export function Hero() {
    return (
        <section className="relative min-h-[110vh] flex flex-col justify-center items-center overflow-hidden bg-background-primary pb-32">
            {/* 1. LAYER - DEEP BACKGROUND (Atmosphere) */}
            <div className="absolute inset-0 z-0 select-none">
                {/* Noise */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={noiseTextureStyle} />

                {/* Massive Blobs */}
                <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-accent-primary/10 rounded-full blur-[180px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-accent-secondary/10 rounded-full blur-[180px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />

                {/* Grid Floor */}
                <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-[linear-gradient(to_top,rgba(0,212,170,0.1)_1px,transparent_1px)] bg-[size:100%_40px] [perspective:1000px] [transform:rotateX(60deg)] opacity-30 origin-bottom" />
            </div>

            {/* 2. LAYER - VISUAL ELEMENTS (Behind Text) */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-white/5 rounded-full flex items-center justify-center"
                >
                    <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute inset-[100px] border border-dashed border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

                    {/* Floating Abstract Cards - Positioned lower to avoid navbar */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        className="absolute top-[40%] right-[5%] w-64 h-40 glass rounded-2xl border-white/10 p-6 flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-center">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center"><TrendingUp size={16} /></div>
                            <div className="text-xs text-emerald-400 font-mono">+142%</div>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-[70%] bg-emerald-500 rounded-full" />
                        </div>
                        <div className="text-xs text-zinc-400 font-mono">Organic Traffic Growth</div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 30, 0] }}
                        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-[30%] left-[5%] w-56 h-auto glass rounded-2xl border-white/10 p-5"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <div className="text-xs text-white font-mono">System Online</div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1.5 w-full bg-white/5 rounded-full" />
                            <div className="h-1.5 w-[80%] bg-white/5 rounded-full" />
                            <div className="h-1.5 w-[60%] bg-white/5 rounded-full" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* 3. LAYER - CONTENT (Foreground) */}
            <div className="container relative z-20 px-6 flex flex-col items-center text-center">

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                    <span className="text-xs font-mono text-zinc-300 tracking-wider">AGENCY_OS v2.0</span>
                </motion.div>

                {/* SEO H1 - Visually Hidden */}
                <h1 className="sr-only">Digital Helper | Modern Web Design & AI Automation in Richland, WA</h1>

                {/* MASSIVE Typography */}
                <h2 className="font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] leading-[0.85] tracking-tighter mb-8 mix-blend-screen select-none">
                    <motion.span
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="block"
                    >
                        DIGITAL
                    </motion.span>
                    <motion.span
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="block text-stroke-sm md:text-stroke text-transparent relative"
                    >
                        EMPIRE
                        <span className="absolute inset-0 text-white opacity-10 blur-sm select-none">EMPIRE</span>
                    </motion.span>
                </h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="max-w-2xl text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-12 mix-blend-plus-lighter"
                >
                    We build <span className="text-white font-semibold">high-performance systems</span> for local businesses in Richland.
                    Not just websites—revenue engines powered by Next.js & AI.
                </motion.p>

                {/* Magnetic Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <Button
                        asChild
                        className="h-14 px-8 rounded-full text-base font-bold bg-white text-black hover:scale-105 transition-transform duration-300 shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                    >
                        <Link href="/contact">Start Project</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="h-14 px-8 rounded-full text-base border-white/20 bg-transparent hover:bg-white/5 hover:border-white transition-all duration-300"
                    >
                        <Link href="/work">View Case Studies</Link>
                    </Button>
                </motion.div>

                {/* Quick Audit Widget */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="mt-16 w-full"
                >
                    <p className="text-zinc-500 text-sm mb-4 text-center">
                        Or get an instant website score:
                    </p>
                    <HeroAuditWidget />
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Scroll</span>
            </motion.div>
        </section>
    )
}
