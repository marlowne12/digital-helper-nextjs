"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { XCircle, AlertTriangle, TrendingDown } from 'lucide-react'

const problems = [
    {
        icon: <XCircle className="w-10 h-10 text-red-500" />,
        title: "Old & Ugly",
        description: "Your website looks like it's from 2010. Visitors judge your business by its digital cover."
    },
    {
        icon: <AlertTriangle className="w-10 h-10 text-yellow-500" />,
        title: "Slow & Frustrating",
        description: "If it takes more than 3 seconds to load, 40% of people leave. You're losing customers before they even see your work."
    },
    {
        icon: <TrendingDown className="w-10 h-10 text-orange-500" />,
        title: "Silent & Invisible",
        description: "Your site sits on page 4 of Google and doesn't generate calls. It's an expense, not an investment."
    }
]

export function ProblemAgitation() {
    return (
        <section className="py-24 bg-background-primary relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        An Outdated Website is <br />
                        <span className="text-red-500">Bleeding You Money.</span>
                    </motion.h2>
                    <p className="text-zinc-400 text-lg">
                        In the Tri-Cities, your competition is just a click away. If your site isn't fast, modern, and mobile-friendly, you're effectively handing them your leads.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-10 group hover:border-red-500/20 transition-all duration-300"
                        >
                            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                                {problem.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{problem.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {problem.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
