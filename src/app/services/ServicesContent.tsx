"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Phone,
    ArrowRight,
    Zap,
    CheckCircle2,
    Shield,
    Clock,
    Star,
    Users
} from 'lucide-react';
import { ServiceCardsEnhanced } from "@/components/ServiceCardsEnhanced";
import { ServiceProcessTimeline } from "@/components/ServiceProcessTimeline";
import { ServicePricingTeaser } from "@/components/ServicePricingTeaser";

/**
 * Services Page Content
 * 
 * Sprint 14: Complete redesign with:
 * - Enhanced conversion-focused service cards
 * - Process timeline (how we work)
 * - Pricing teaser
 * - Trust signals
 */

const stats = [
    { value: "50+", label: "Businesses Served", icon: Users },
    { value: "347%", label: "Avg Lead Increase", icon: Zap },
    { value: "14s", label: "Avg Response Time", icon: Clock },
    { value: "4.9/5", label: "Client Rating", icon: Star },
];

export function ServicesContent() {
    return (
        <main className="min-h-screen pt-24 lg:pt-32 overflow-hidden bg-background-primary relative">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[120px] pointer-events-none" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 py-16 lg:py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold mb-6">
                                <Zap className="w-4 h-4" />
                                Growth Services
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Services That{' '}
                                <span className="text-gradient">Actually Work</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-zinc-400 mb-8 leading-relaxed max-w-3xl mx-auto">
                                No fluff. No vanity metrics. Every service is designed to solve a specific problem 
                                that's costing you money — and deliver measurable results in 30 days or less.
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
                                >
                                    <Phone className="w-5 h-5" />
                                    Book Free Strategy Call
                                </Link>
                                <Link
                                    href="#services-enhanced"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white font-semibold hover:bg-white/[0.08] transition-all duration-300"
                                >
                                    Explore Services
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 max-w-3xl mx-auto">
                                {stats.map((stat, idx) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={idx} className="text-center">
                                            <div className="flex items-center justify-center gap-2 mb-1">
                                                <Icon className="w-4 h-4 text-purple-400" />
                                                <span className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</span>
                                            </div>
                                            <div className="text-xs lg:text-sm text-zinc-500">{stat.label}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Signals Bar */}
            <section className="relative z-10 py-8 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-sm text-zinc-400">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            30-Day Money Back Guarantee
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            No Long-Term Contracts
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-500" />
                            Results in 30 Days or Free
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-green-500" />
                            Real Humans Answer
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Service Cards */}
            <ServiceCardsEnhanced />

            {/* Process Timeline */}
            <ServiceProcessTimeline />

            {/* Pricing Teaser */}
            <ServicePricingTeaser />

            {/* Final CTA */}
            <section className="relative z-10 py-24 lg:py-32">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="relative p-10 lg:p-16 rounded-3xl overflow-hidden">
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-cyan-500/20 z-0" />
                            <div className="absolute inset-0 backdrop-blur-xl z-0" />
                            <div className="absolute inset-0 border border-white/10 rounded-3xl z-0" />
                            
                            <div className="relative z-10 text-center">
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                    Ready to Stop Losing Leads?
                                </h2>
                                <p className="text-lg text-zinc-300 mb-8 max-w-2xl mx-auto">
                                    Let's talk about your business. No sales pitch, no pressure — just a conversation 
                                    about where you are and where you want to go.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-zinc-900 font-bold hover:bg-zinc-100 transition-all duration-300 shadow-xl"
                                    >
                                        <Phone className="w-5 h-5" />
                                        Book Your Free Call
                                    </Link>
                                    <Link
                                        href="tel:5098768454"
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all duration-300"
                                    >
                                        Or Call: (509) 876-8454
                                    </Link>
                                </div>
                                <p className="mt-6 text-sm text-zinc-500">
                                    Most calls take 15 minutes. No commitment required.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
