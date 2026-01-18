"use client"

import React from 'react'
import { motion } from 'framer-motion'
import {
    Zap,
    Smartphone,
    Search,
    MessageSquare,
    TrendingUp,
    Code2
} from 'lucide-react'

const services = [
    {
        icon: <Code2 className="w-8 h-8 text-accent-purple" />,
        title: "Next.js Renovation",
        description: "Burn your bloated WordPress site. We rebuild it for extreme speed and instant load times."
    },
    {
        icon: <Smartphone className="w-8 h-8 text-accent-indigo" />,
        title: "Mobile Domination",
        description: "Local SEO depends on mobile speed. We build for the 60%+ of customers on their phones."
    },
    {
        icon: <MessageSquare className="w-8 h-8 text-accent-blue" />,
        title: "AI Automations",
        description: "Chatbots and workflows that qualify leads and schedule calls while you sleep."
    },
    {
        icon: <Search className="w-8 h-8 text-accent-purple" />,
        title: "Hyper-Local SEO",
        description: "Dominate the Tri-Cities search results. Be the first business people in Richland see."
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-accent-indigo" />,
        title: "Lead Machines",
        description: "Websites that convert visitors into cash. No fluff, just results and ROI tracking."
    },
    {
        icon: <Zap className="w-8 h-8 text-accent-blue" />,
        title: "Full Tech Support",
        description: "We are your digital partner. From hosting to maintenance, we handle the technical headaches."
    }
]

export function Services() {
    return (
        <section className="py-24 bg-background-primary" id="services">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Core Systems</h2>
                    <p className="text-zinc-400">State-of-the-art technology, purpose-built for local business growth.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-10 group hover:border-accent-purple/30 transition-all duration-300"
                        >
                            <div className="mb-6 w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
