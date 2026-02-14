"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Globe,
    Search,
    Bot,
    Users,
    ArrowRight,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const services = [
    {
        title: "Web Design & Development",
        description: "Modern, lightning-fast websites built to convert visitors into customers. No more losing leads to a slow, outdated site.",
        icon: <Globe className="w-8 h-8 text-accent-primary" />,
        href: "/services/web-design",
        features: ["Next.js Performance", "Mobile-First Design", "SEO Optimized"]
    },
    {
        title: "SEO & Local Search",
        description: "Dominate Google when Tri-Cities customers search for what you do. Local SEO that actually gets results.",
        icon: <Search className="w-8 h-8 text-accent-secondary" />,
        href: "/services/seo",
        features: ["GBP Optimization", "Local Citations", "Keyword Strategy"]
    },
    {
        title: "AI Automation",
        description: "Chatbots, workflows, and voice AI that handle tasks while you sleep. Automate the work that's eating your time.",
        icon: <Bot className="w-8 h-8 text-accent-tertiary" />,
        href: "/services/ai-automation",
        features: ["24/7 Chatbots", "n8n Workflows", "Voice AI Agents"]
    },
    {
        title: "Lead Generation",
        description: "Qualified leads delivered to your inbox. Pay-per-lead pricing means you only pay for results.",
        icon: <Users className="w-8 h-8 text-sky-400" />,
        href: "/services/lead-generation",
        features: ["Targeted Prospecting", "Qualified Appointments", "Risk-Free Model"]
    },
    {
        title: "Reputation Management",
        description: "Monitor, analyze, and automate reviews. Build a fortress of trust around your brand.",
        icon: <ShieldCheck className="w-8 h-8 text-accent-cyan" />,
        href: "/services/reputation-management",
        features: ["Review Monitoring", "AI Auto-Responses", "Competitor Analysis"]
    }
];

export default function ServicesHubPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 overflow-hidden bg-background-primary relative">
            {/* Background Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Services Built to <span className="text-gradient">Grow Your Business</span>
                        </h1>
                        <p className="text-lg text-zinc-400">
                            From high-performance websites to AI-powered automation, we provide the tools you need to dominate the Tri-Cities market.
                        </p>
                    </motion.div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="glass p-8 group hover:border-accent-primary/30 transition-all duration-300 flex flex-col"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                            <p className="text-zinc-400 mb-8 leading-relaxed flex-grow">
                                {service.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {service.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3 text-zinc-300 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={service.href}
                                className="inline-flex items-center gap-2 text-accent-primary font-semibold hover:text-accent-secondary transition-colors mt-auto"
                            >
                                Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Not Sure Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass p-12 text-center max-w-4xl mx-auto rounded-[3rem]"
                >
                    <h2 className="text-3xl font-bold text-white mb-6">Not sure what you need?</h2>
                    <p className="text-zinc-400 mb-10 text-lg">
                        Every business is unique. We offer custom strategies for those who need a more tailored approach to their digital presence and operations.
                    </p>
                    <Button asChild className="btn-primary h-14 px-10 text-lg">
                        <Link href="/contact">Book a Free Strategy Call</Link>
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
