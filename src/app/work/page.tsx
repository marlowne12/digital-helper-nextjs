"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    ExternalLink,
    ArrowRight,
    Zap
} from 'lucide-react'
import { Button } from "@/components/ui/button"

const works = [
    {
        title: "Richland HVAC Pros",
        type: "Web Design + Local SEO",
        image: "https://picsum.photos/800/600?random=1",
        metric: "42% Call Increase",
        description: "Built a high-performance Next.js site that dominates the Richland Map Pack."
    },
    {
        title: "Tri-Cities Law Office",
        type: "AI Automation + CRM",
        image: "https://picsum.photos/800/600?random=11",
        metric: "15hrs/wk Saved",
        description: "Automated lead intake and follow-up using custom AI workflows."
    },
    {
        title: "Modern Cafe Richland",
        type: "Website Transformation",
        image: "https://picsum.photos/800/600?random=21",
        metric: "2.4s Speed Boost",
        description: "Migrated a slow WordPress site to Next.js, achieving a 99 Lighthouse score."
    },
    {
        title: "Local Plumbers LLC",
        type: "Lead Gen Engine",
        image: "https://picsum.photos/800/600?random=31",
        metric: "50+ Leads/Mo",
        description: "Pay-per-lead system that delivers verified plumbing jobs directly."
    }
]

export default function WorkPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-background-primary overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[5%] w-80 h-80 bg-accent-primary/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '7s' }} />
                <div className="absolute bottom-[30%] right-[10%] w-96 h-96 bg-accent-secondary/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="max-w-4xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-accent-primary text-sm font-medium mb-6">
                            Case Studies & Portfolio
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            Evidence of <br />
                            <span className="text-gradient">Performance.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            We don&apos;t just build websites; we build business outcomes. Explore our recent transformations in the Tri-Cities and see the results for yourself.
                        </p>
                    </motion.div>
                </div>

                {/* Work Grid */}
                <section className="mb-32">
                    <div className="grid md:grid-cols-2 gap-12">
                        {works.map((work, index) => (
                            <motion.div
                                key={work.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="glass rounded-[2.5rem] overflow-hidden border-white/5 group-hover:border-accent-purple/20 transition-all duration-500">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={work.image}
                                            alt={work.title}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                                            {work.type}
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-accent-primary transition-colors">{work.title}</h3>
                                            <div className="w-10 h-10 rounded-full glass flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                                                <ExternalLink size={18} className="text-white" />
                                            </div>
                                        </div>
                                        <p className="text-zinc-400 leading-relaxed">
                                            {work.description}
                                        </p>
                                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-green-400 font-bold text-lg">
                                                <Zap size={20} className="fill-green-400" />
                                                {work.metric}
                                            </div>
                                            <span className="text-xs text-zinc-600 font-bold uppercase tracking-widest">Case Study</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center glass p-16 rounded-[3rem] relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-accent-gradient opacity-5" />
                    <h2 className="text-4xl font-bold text-white mb-6">Want Results Like These?</h2>
                    <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                        Your business could be our next success story. Let&apos;s talk about building your high-performance foundation.
                    </p>
                    <Button asChild className="btn-primary h-14 px-12 text-lg">
                        <Link href="/contact" className="flex items-center gap-2">
                            Book Your Strategy Call
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </main>
    )
}
