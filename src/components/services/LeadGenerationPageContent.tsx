"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Users,
    Target,
    BarChart3,
    TrendingDown
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { StatisticCard } from '@/components/services/StatisticCard';

const painPoints = [
    {
        icon: <BarChart3 className="w-6 h-6 text-accent-purple" />,
        title: "Unpredictable Flow",
        description: "Lead flow is inconsistent, making it impossible to plan for growth."
    },
    {
        icon: <TrendingDown className="w-6 h-6 text-accent-indigo" />,
        title: "Wasted Ad Spend",
        description: "Paying for clicks that don&apos;t convert into actual, qualified business leads."
    },
    {
        icon: <Users className="w-6 h-6 text-accent-blue" />,
        title: "Time Consuming",
        description: "Spending hours on outbound prospecting instead of serving customers."
    }
];

const industries = [
    { name: "HVAC/Plumbing", price: "$35 - $75" },
    { name: "Dental", price: "$50 - $100" },
    { name: "Legal", price: "$75 - $150" },
    { name: "Real Estate", price: "$25 - $50" },
    { name: "B2B Services", price: "$50 - $100" }
];

export function LeadGenerationPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'Lead Generation', href: '/services/lead-generation' }
            ]}
        >
            {/* Hero Section */}
            <div className="max-w-4xl mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-accent-purple text-sm font-medium mb-6">
                        Performance-Based Results
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Qualified Leads Delivered <br />
                        <span className="text-gradient">To Your Inbox.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                        We build automated prospecting systems that find, qualify, and deliver leads directly to you. Our pay-per-lead model means zero risk.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="btn-primary h-14 px-8 text-lg">
                            <Link href="/contact">Get a Free Quote</Link>
                        </Button>
                        <Button asChild className="btn-secondary h-14 px-8 text-lg">
                            <Link href="#pricing">See Lead Pricing</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Statistics Section */}
            <section className="mb-24">
                <div className="grid md:grid-cols-2 gap-6">
                    <StatisticCard
                        value="61%"
                        label="Top Challenge"
                        description="61% of marketers state that generating traffic and qualified leads is their biggest challenge."
                        source="Hubspot"
                        delay={0.2}
                    />
                    <StatisticCard
                        value="133%"
                        label="Revenue Growth"
                        description="Companies with mature lead generation processes achieve 133% greater revenue than average."
                        source="Marketo"
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Pain Points */}
            <section className="mb-24">
                <div className="grid md:grid-cols-3 gap-6">
                    {painPoints.map((point, index) => (
                        <motion.div
                            key={point.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 rounded-2xl"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center mb-6">
                                {point.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="mb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 underline decoration-accent-purple underline-offset-8">
                    The Risk-Free Process
                </h2>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-12">
                        {[
                            { step: "01", title: "Target Identification", text: "We define your ideal customer profile based on industry, size, and location." },
                            { step: "02", title: "Automated Prospecting", text: "Our systems scrape and analyze data to find businesses in need of your services." },
                            { step: "03", title: "Human/AI Qualification", text: "We vet every lead to ensure they meet your specific quality criteria." },
                            { step: "04", title: "Direct Delivery", text: "Verified leads land in your inbox or CRM, ready for your sales team." }
                        ].map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-6"
                            >
                                <span className="text-4xl font-bold text-white/5 select-none">{step.step}</span>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                                    <p className="text-zinc-400">{step.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="glass p-8 aspect-square flex items-center justify-center relative overflow-hidden group rounded-[2.5rem]">
                        <div className="absolute inset-0 bg-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Target className="w-32 h-32 text-accent-purple group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-accent-purple/20 rounded-full animate-ping" />
                    </div>
                </div>
            </section>

            {/* Industry Pricing Grid */}
            <section id="pricing" className="mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Pricing by Industry</h2>
                    <p className="text-zinc-400">Competitive, performance-based rates tailored to your niche.</p>
                </div>
                <div className="glass overflow-hidden max-w-2xl mx-auto rounded-xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                                <th className="p-6 text-white font-semibold flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 text-accent-purple" />
                                    Industry
                                </th>
                                <th className="p-6 text-white font-semibold text-right">Price Per Lead</th>
                            </tr>
                        </thead>
                        <tbody>
                            {industries.map((industry) => (
                                <tr key={industry.name} className="border-b border-white/[0.08] last:border-0 hover:bg-white/[0.02] transition-colors">
                                    <td className="p-6 text-zinc-300">{industry.name}</td>
                                    <td className="p-6 text-right font-mono text-accent-purple flex items-center justify-end gap-1">
                                        {industry.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Final CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <h2 className="text-4xl font-bold text-white mb-6">Stop Chasing. Start Closing.</h2>
                <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
                    Ready to get a predictable flow of qualified prospects? Let&apos;s discuss your targets and build your pipeline.
                </p>
                <Button asChild className="btn-primary h-14 px-12 text-lg">
                    <Link href="/contact">Book Your Lead Gen Call</Link>
                </Button>
            </motion.div>
        </ServicePageLayout>
    );
}
