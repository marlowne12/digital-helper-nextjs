"use client"

import React from 'react'
import { motion } from 'framer-motion'

const stats = [
    { value: "78%", label: "First Responder Wins", sub: "Speed to Lead" },
    { value: "14s", label: "AI Response Time", sub: "vs 4hr Average" },
    { value: "320%", label: "Lead Increase", sub: "Client Results" },
    { value: "24/7", label: "Always On", sub: "Even at 3am" }
]

export function Stats() {
    return (
        <section className="py-24 bg-background-primary border-y border-white/[0.08]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="text-4xl md:text-6xl font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                                {stat.value}
                            </div>
                            <div className="text-zinc-400 font-medium uppercase tracking-widest text-xs md:text-sm mb-1">
                                {stat.label}
                            </div>
                            <div className="text-zinc-600 text-xs italic">
                                {stat.sub}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
