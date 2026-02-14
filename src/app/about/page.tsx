"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Zap,

    MapPin,
    Cpu,
    TrendingUp,
    ShieldCheck
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const values = [
    {
        icon: <Cpu className="w-6 h-6 text-accent-primary" />,
        title: "Modern Tech First",
        description: "We don&apos;t do templates or outdated WordPress themes. We build on Next.js—the same tech used by Netflix and TikTok—for maximum speed and performance."
    },
    {
        icon: <Zap className="w-6 h-6 text-accent-secondary" />,
        title: "Automation Native",
        description: "We don&apos;t just sell automation; we live it. Our internal systems are built to be lean and efficient, so we can focus more time on your results."
    },
    {
        icon: <TrendingUp className="w-6 h-6 text-accent-tertiary" />,
        title: "Results-Focused",
        description: "We hate agency jargon as much as you do. Everything we build is measured by one thing: does it generate leads and save you time?"
    }
];

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 overflow-hidden bg-background-primary relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-accent-primary/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '6s' }} />
                <div className="absolute top-[50%] right-[5%] w-64 h-64 bg-accent-secondary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
                <div className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-accent-tertiary/5 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <div className="max-w-4xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="flex items-center gap-2 text-accent-primary text-sm font-medium mb-6">
                            <MapPin className="w-4 h-4" /> Based in Richland, WA
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                            Built in Richland, <br />
                            <span className="text-gradient">For the Tri-Cities.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            Digital Helper was founded to give local businesses access to the same high-level technology and automation usually reserved for enterprise-level companies.
                        </p>
                    </motion.div>
                </div>

                {/* Our Story */}
                <section className="mb-32">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="glass p-10 relative group hover:border-accent-primary/20 transition-all duration-500">
                            <div className="absolute -top-6 -left-6 w-20 h-20 bg-accent-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                            <div className="space-y-6 text-zinc-400 leading-relaxed">
                                <p>
                                    We saw too many Tri-Cities businesses getting left behind by slow, outdated websites and &quot;set it and forget it&quot; agencies that overpromise and underdeliver.
                                </p>
                                <p>
                                    We decided to do things differently. By focusing on modern frameworks like Next.js and deep AI integration, we build systems that don&apos;t just look good—they act as a 24/7 employee for your business.
                                </p>
                                <p>
                                    Being local matters. We&apos;re not an offshore agency. We&apos;re your neighbors in the Tri-Cities, available for a coffee talk in Richland or Kennewick anytime.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-3xl font-bold text-white">Why Local Matters</h3>
                            <ul className="space-y-6">
                                {[
                                    "In-person strategy sessions in the Tri-Cities",
                                    "Understanding of the local competitive landscape",
                                    "Direct access to your developers—no account managers",
                                    "Shared investment in our community's growth"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 text-zinc-300">
                                        <ShieldCheck className="w-6 h-6 text-accent-primary shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Our Values (Philosophy) */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Philosophy</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">The principles that guide every project we take on.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-8 group border-transparent hover:border-accent-primary/20 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="relative py-20 rounded-3xl overflow-hidden glass text-center px-6 group">
                    <div className="absolute inset-0 bg-accent-primary/5 pointer-events-none group-hover:bg-accent-primary/10 transition-colors duration-500" />
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to work with a local <br /><span className="text-gradient">team that gets it?</span></h2>
                    <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                        Let&apos;s build something that actually helps you scale. No hype, no jargon—just performance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="btn-primary h-14 px-10 text-lg">
                            <Link href="/contact">Book a Strategy Session</Link>
                        </Button>
                        <Button asChild className="btn-secondary h-14 px-10 text-lg">
                            <Link href="/services">Explore Our Services</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </main>
    );
}
