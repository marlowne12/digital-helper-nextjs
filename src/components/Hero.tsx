"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background-primary">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px] animate-blob" />
                <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-accent-blue/10 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto md:mx-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* High-Performance Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-accent-purple text-sm font-medium mb-8">
                            <Zap className="w-4 h-4 fill-accent-purple" />
                            <span>High-Performance Websites & AI Automation</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                            Build Your <br />
                            <span className="text-gradient">Digital Empire.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
                            We transform outdated local business websites in Richland into <span className="text-white font-medium">high-performance lead machines</span> using Next.js and AI Automation.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <Button asChild size="lg" className="btn-primary h-14 px-10 text-lg group">
                                <Link href="/contact" className="flex items-center gap-2">
                                    Get a Modern Site
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="btn-secondary h-14 px-10 text-lg">
                                <Link href="/services">View Our Services</Link>
                            </Button>
                        </div>

                        {/* Social Proof / Stats Hook */}
                        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/[0.08] pt-12">
                            <div>
                                <div className="text-3xl font-bold text-white mb-1">95+</div>
                                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Lighthouse Score</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white mb-1">3.2x</div>
                                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Avg Lead Growth</div>
                            </div>
                            <div className="hidden md:block">
                                <div className="text-3xl font-bold text-white mb-1">100%</div>
                                <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">Local Commitment</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
