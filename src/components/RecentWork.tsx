"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

const projects = [
    {
        title: "Richland HVAC Pros",
        type: "SEO + Web Design",
        image: "https://picsum.photos/800/600?random=1",
        result: "42% Increase in Calls"
    },
    {
        title: "Tri-Cities Law Firm",
        type: "AI Automation + Design",
        image: "https://picsum.photos/800/600?random=2",
        result: "12hrs/wk Saved"
    },
    {
        title: "Modern Cafe Richland",
        type: "Local SEO + Website",
        image: "https://picsum.photos/800/600?random=3",
        result: "5k+ New Monthly Visitors"
    },
    {
        title: "Tri-Cities Real Estate",
        type: "Lead Gen System",
        image: "https://picsum.photos/800/600?random=4",
        result: "Top 3 GMB Ranking"
    }
]

export function RecentWork() {
    return (
        <section className="py-24 bg-background-primary overflow-hidden">
            <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="max-w-xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Transformations</h2>
                    <p className="text-zinc-400">We don't just build websites; we build business growth engines.</p>
                </div>
                <Link
                    href="/work"
                    className="group flex items-center gap-2 text-accent-purple font-semibold hover:text-white transition-colors"
                >
                    View All Work
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="flex gap-8 overflow-x-auto pb-12 px-6 lg:px-[10%] scrollbar-hide snap-x">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="min-w-[320px] md:min-w-[450px] aspect-[4/3] rounded-[2rem] overflow-hidden relative group snap-center glass"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/20 to-transparent p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-accent-purple text-sm font-bold uppercase tracking-widest">{project.type}</span>
                                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ExternalLink className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                <div className="inline-flex items-center gap-2 text-green-400 text-sm font-medium">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    {project.result}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
