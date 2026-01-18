"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Zap, TrendingUp } from 'lucide-react'

const steps = [
    {
        icon: <Search className="w-8 h-8 text-accent-purple" />,
        title: "1. The Audit",
        description: "We analyze your site and systems to find exactly where you're losing money and time."
    },
    {
        icon: <Zap className="w-8 h-8 text-accent-indigo" />,
        title: "2. The Build",
        description: "We deploy a high-performance site and AI automations that work for you 24/7."
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-accent-blue" />,
        title: "3. The Growth",
        description: "Your business scales automatically while you focus on what you're actually good at."
    }
]

export function HowItWorks() {
    return (
        <section className="py-24 bg-background-secondary relative">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Three-Step Process</h2>
                    <p className="text-zinc-400">Simple. Transparent. Built for results.</p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-accent-purple via-accent-indigo to-accent-blue opacity-10" />

                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="text-center space-y-6"
                            >
                                <div className="w-20 h-20 rounded-3xl glass bg-white/[0.03] flex items-center justify-center mx-auto relative group hover:scale-110 transition-transform duration-500 shadow-glow-sm hover:shadow-glow-md">
                                    <div className="absolute inset-0 bg-accent-gradient opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity" />
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                                <p className="text-zinc-400 leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
