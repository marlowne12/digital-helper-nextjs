'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, TrendingUp, ShieldCheck, ArrowRight, MessageSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { StatisticCard } from '@/components/services/StatisticCard';

export function ReputationManagementPageContent() {
    const router = useRouter();
    const [businessName, setBusinessName] = useState('');

    const handleQuickAudit = (e: React.FormEvent) => {
        e.preventDefault();
        if (businessName.trim()) {
            router.push(`/dashboard/reputation?q=${encodeURIComponent(businessName)}`);
        }
    };

    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'Reputation Management', href: '/services/reputation-management' }
            ]}
        >
            {/* Hero Section */}
            <div className="max-w-4xl mb-16 mx-auto lg:mx-0 lg:text-left text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-accent-cyan text-sm font-medium mb-6">
                        AI-Powered Reputation Control
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Turn Reviews Into <br />
                        <span className="text-gradient">Revenue.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                        Your online reputation is your most valuable asset. Monitor, analyze, and improve your Google Business Profile with our AI-driven reputation engine.
                    </p>

                    {/* Quick Audit Input */}
                    <form onSubmit={handleQuickAudit} className="max-w-md mx-auto lg:mx-0 relative group">
                        <div className="absolute inset-0 bg-accent-gradient blur-xl opacity-20 group-hover:opacity-30 transition-opacity rounded-full"></div>
                        <div className="relative flex gap-2 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
                            <Input
                                className="bg-transparent border-none text-white placeholder:text-zinc-500 focus-visible:ring-0 pl-6 h-12"
                                placeholder="Enter your business name..."
                                value={businessName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)}
                            />
                            <Button type="submit" size="icon" className="h-12 w-12 rounded-full bg-accent-cyan hover:bg-accent-cyan/90 text-black shrink-0">
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </div>
                        <p className="text-sm text-zinc-500 mt-3">
                            Get a comprehensive 360° audit in seconds.
                        </p>
                    </form>
                </motion.div>
            </div>

            {/* Statistics Section */}
            <section className="mb-24">
                <div className="grid md:grid-cols-2 gap-6">
                    <StatisticCard
                        value="93%"
                        label="Consumer Trust"
                        description="93% of customers will read reviews of local businesses to determine its quality."
                        source="Qualtrics"
                        delay={0.2}
                    />
                    <StatisticCard
                        value="+9%"
                        label="Revenue Boost"
                        description="A one-star increase in Yelp rating leads to a 5-9% increase in revenue."
                        source="Harvard Business School"
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Features Grid */}
            <section className="mb-24">
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Search className="w-6 h-6 text-accent-cyan" />,
                            title: "Deep Dive Audits",
                            description: "Our AI scans your entire digital footprint to identify missing keywords, inconsistent NAP data, and sentiment trends."
                        },
                        {
                            icon: <MessageSquare className="w-6 h-6 text-accent-purple" />,
                            title: "Smart Auto-Replies",
                            description: "Never leave a review hanging. Generate professional, context-aware responses to both positive and negative feedback instantly."
                        },
                        {
                            icon: <TrendingUp className="w-6 h-6 text-accent-indigo" />,
                            title: "Competitor Benchmarking",
                            description: "See how you stack up against the top 3 competitors in your area and get a roadmap to overtake them."
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 group hover:border-accent-cyan/20 transition-all rounded-2xl"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Value Prop / Social Proof Section */}
            <section className="mb-24">
                <div className="glass p-1 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent-gradient opacity-10 blur-3xl" />
                    <div className="relative z-10 p-12 md:p-20 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                Trust is the New <br />
                                <span className="text-gradient">Currency.</span>
                            </h2>
                            <ul className="space-y-6">
                                {[
                                    "93% of customers read online reviews before buying.",
                                    "A 1-star increase can boost revenue by 5-9%.",
                                    "Responding to reviews improves local SEO rankings."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-center text-lg text-zinc-300">
                                        <div className="h-8 w-8 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button asChild className="mt-10 btn-primary h-14 px-8 text-lg">
                                <Link href="/dashboard/reputation">Start Your Free Audit</Link>
                            </Button>
                        </div>
                        {/* Visual representation of a 5-star review card */}
                        <div className="bg-background-secondary/50 p-8 rounded-2xl border border-white/10 relative">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500"></div>
                                    <div>
                                        <div className="h-4 w-32 bg-white/10 rounded mb-2"></div>
                                        <div className="flex gap-1 text-yellow-500">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-zinc-500 text-sm">2 days ago</span>
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 w-full bg-white/5 rounded"></div>
                                <div className="h-4 w-5/6 bg-white/5 rounded"></div>
                                <div className="h-4 w-4/6 bg-white/5 rounded"></div>
                            </div>

                            {/* AI Reply Simulation */}
                            <div className="mt-6 ml-8 p-4 bg-accent-cyan/5 border border-accent-cyan/10 rounded-xl">
                                <div className="flex items-center gap-2 mb-2 text-accent-cyan text-sm font-bold">
                                    <MessageSquare className="w-4 h-4" /> Response from Owner
                                </div>
                                <div className="h-3 w-full bg-accent-cyan/10 rounded mb-2"></div>
                                <div className="h-3 w-4/5 bg-accent-cyan/10 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ServicePageLayout>
    );
}
