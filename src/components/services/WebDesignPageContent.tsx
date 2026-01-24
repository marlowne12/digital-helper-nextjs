"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Smartphone,
    Zap,
    ArrowRight,
    CheckCircle2,
    Gauge,
    Layout,
    XCircle
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ServicePageLayout } from '@/components/services/ServicePageLayout'
import { StatisticCard } from '@/components/services/StatisticCard'

const features = [
    {
        icon: <Gauge className="w-6 h-6 text-accent-purple" />,
        title: "Instant Load Times",
        description: "We use Next.js static generation to ensure your site loads in under 1 second. No more waiting, no more lost leads."
    },
    {
        icon: <Smartphone className="w-6 h-6 text-accent-indigo" />,
        title: "Mobile-First UX",
        description: "60% of local traffic is on phones. We design for the thumb FIRST, ensuring a seamless experience on every device."
    },
    {
        icon: <Layout className="w-6 h-6 text-accent-blue" />,
        title: "Conversion-Focused",
        description: "Beautiful design is useless if it doesn't sell. Our layouts are engineered to guide visitors toward the 'Book' button."
    }
]

export function WebDesignPageContent() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: 'Web Design', href: '/services/web-design' }
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
                        High-Performance Development
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                        Websites That Work <br />
                        <span className="text-gradient">As Hard As You Do.</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                        Most local business sites are slow, outdated, and ignored by Google. We build high-speed, modern digital foundations that turn Richland visitors into loyal customers.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild className="btn-primary h-14 px-8 text-lg">
                            <Link href="/contact">Start Your Renovation</Link>
                        </Button>
                        <Button asChild variant="outline" className="btn-secondary h-14 px-8 text-lg">
                            <Link href="/work">View Our Portfolio</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Statistics Section */}
            <section className="mb-24">
                <div className="grid md:grid-cols-2 gap-6">
                    <StatisticCard
                        value="0.8s"
                        label="Average Load Time"
                        description="Google confirms that 53% of mobile users abandon sites that take longer than 3 seconds to load."
                        source="Google Research"
                        delay={0.2}
                    />
                    <StatisticCard
                        value="94%"
                        label="First Impressions"
                        description="94% of first impressions are design-related. Your website is often the first interaction a client has with your brand."
                        source="ResearchGate"
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="mb-24">
                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-8 group hover:border-accent-purple/20 transition-all rounded-2xl"
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

            {/* Comparison Section */}
            <section className="mb-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="glass p-8 rounded-[2rem] relative overflow-hidden group">
                            <div className="absolute inset-0 bg-accent-gradient opacity-5" />
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4 text-red-500">
                                    <XCircle className="w-6 h-6" />
                                    <span className="font-bold uppercase tracking-widest text-sm">The Old Way (WordPress)</span>
                                </div>
                                <ul className="space-y-3 text-zinc-500 text-sm">
                                    <li>• Slow loading times (3s+)</li>
                                    <li>• Constant security patches</li>
                                    <li>• Limited by rigid templates</li>
                                    <li>• Poor mobile experience</li>
                                </ul>

                                <div className="h-[1px] bg-white/10 my-8" />

                                <div className="flex items-center gap-4 text-green-500">
                                    <CheckCircle2 className="w-6 h-6" />
                                    <span className="font-bold uppercase tracking-widest text-sm">The New Way (Next.js)</span>
                                </div>
                                <ul className="space-y-3 text-zinc-300 text-sm">
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-accent-purple" />
                                        Sub-second load times
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-accent-purple" />
                                        Static site security (unhackable)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-accent-purple" />
                                        Complete design freedom
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-accent-purple" />
                                        Perfect Lighthouse scores
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                            Technology That <br />
                            <span className="text-gradient">Wins.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            We don&apos;t use page builders or bloated themes. We write clean, high-performance code using the same technology used by companies like Netflix, Twitch, and Nike.
                        </p>
                        <div className="space-y-4">
                            {["Edge-Optimized Hosting", "Automated Image Compression", "Global CDN Distribution"].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-white font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-accent-purple" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Process Section */}
            <section className="mb-24">
                <h2 className="text-3xl font-bold text-white mb-12">Our Design Process</h2>
                <div className="space-y-8">
                    {[
                        { title: 'Discovery', desc: 'We analyze your competitors and define your ideal customer profile.' },
                        { title: 'Wireframing', desc: 'We blueprint the user journey to maximize conversion rates.' },
                        { title: 'Development', desc: 'We code your custom design using modern, clean architecture.' },
                        { title: 'Launch', desc: 'We handle the deployment, domain connection, and basic SEO setup.' }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-6 items-start group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-accent-purple group-hover:bg-accent-purple group-hover:text-white transition-all">
                                {i + 1}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-zinc-400">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center bg-accent-purple/5 border border-accent-purple/10 p-12 rounded-[2.5rem]"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Renovate?</h2>
                <p className="text-zinc-400 mb-10 max-w-xl mx-auto text-lg">
                    Don&apos;t let a slow website kill your business growth. Let&apos;s build a foundation that actually converts.
                </p>
                <Button asChild className="btn-primary h-14 px-12 text-lg">
                    <Link href="/contact" className="flex items-center gap-2">
                        Book Your Strategy Call
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </Button>
            </motion.div>
        </ServicePageLayout>
    )
}
