"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, MapPin, Cpu, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { BreadcrumbV2 } from '@/components/v2/BreadcrumbV2';

const VALUES = [
    {
        icon: <Cpu className="w-5 h-5 text-indigo-400" />,
        title: "Modern Tech First",
        description: "No templates or outdated WordPress themes. We build on Next.js — the same tech used by Netflix and TikTok — for maximum speed and performance.",
    },
    {
        icon: <Zap className="w-5 h-5 text-violet-400" />,
        title: "Automation Native",
        description: "We don't just sell automation — we live it. Our internal systems are built lean and efficient so we can spend more time on your results.",
    },
    {
        icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
        title: "Results-Focused",
        description: "We hate agency jargon as much as you do. Everything we build is measured by one thing: does it generate leads and save you time?",
    },
];

const WHY_LOCAL = [
    "In-person strategy sessions in the Tri-Cities",
    "Understanding of the local competitive landscape",
    "Direct access to your developers — no account managers",
    "Shared investment in our community's growth",
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] overflow-hidden">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[120px]" />
                <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-violet-600/6 blur-[100px]" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">

                {/* Breadcrumb */}
                <BreadcrumbV2 items={[{ label: 'About', href: '/about' }]} />

                {/* Hero */}
                <div className="max-w-4xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6"
                    >
                        <MapPin className="w-3.5 h-3.5" />
                        Based in Richland, WA
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6"
                    >
                        Built in Richland,{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                            For the Tri-Cities.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-zinc-400 leading-relaxed max-w-2xl"
                    >
                        Digital Helper was founded to give local businesses access to the same
                        high-level technology and automation usually reserved for enterprise companies.
                    </motion.p>
                </div>

                {/* Our Story */}
                <section className="mb-28">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-10"
                        >
                            {/* Glow accent */}
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-600/20 blur-3xl rounded-full" />
                            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                            <div className="space-y-5 text-zinc-400 leading-relaxed">
                                <p>
                                    We saw too many Tri-Cities businesses getting left behind by slow,
                                    outdated websites and &quot;set it and forget it&quot; agencies that
                                    overpromise and underdeliver.
                                </p>
                                <p>
                                    We decided to do things differently. By focusing on modern frameworks
                                    like Next.js and deep AI integration, we build systems that don&apos;t
                                    just look good — they act as a 24/7 employee for your business.
                                </p>
                                <p>
                                    Being local matters. We&apos;re not an offshore agency. We&apos;re your
                                    neighbors in the Tri-Cities, available for a coffee talk in Richland
                                    or Kennewick anytime.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-6"
                        >
                            <h3 className="text-3xl font-bold text-white">Why Local Matters</h3>
                            <ul className="space-y-5">
                                {WHY_LOCAL.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-zinc-300">
                                        <div className="mt-0.5 w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* Core Philosophy */}
                <section className="mb-28">
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-bold text-white mb-4">Our Core Philosophy</h2>
                        <p className="text-zinc-400 max-w-xl mx-auto">
                            The principles that guide every project we take on.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {VALUES.map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-indigo-500/30 hover:bg-white/8 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm py-20 px-8 text-center">
                    <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-600/15 blur-3xl" />
                    <div className="relative z-10">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
                            Ready to work with a local{" "}
                            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                team that gets it?
                            </span>
                        </h2>
                        <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                            Let&apos;s build something that actually helps you scale. No hype, no
                            jargon — just performance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 group"
                            >
                                Book a Strategy Session
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 text-white font-semibold text-base transition-all duration-200"
                            >
                                Explore Our Services
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
