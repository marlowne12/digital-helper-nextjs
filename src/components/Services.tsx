"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Zap,
    Smartphone,
    Search,
    MessageSquare,
    TrendingUp,
    Code2,
    ArrowUpRight
} from 'lucide-react'

const services = [
    {
        icon: Code2,
        title: "Next.js Web Design",
        description: "Transform your outdated WordPress site into a lightning-fast Next.js powerhouse. Extreme performance meets stunning design.",
        href: "/services/web-design",
        color: "purple",
        featured: true
    },
    {
        icon: Search,
        title: "Hyper-Local SEO",
        description: "Dominate Tri-Cities search results. Be the first business people in Richland discover.",
        href: "/services/seo",
        color: "indigo",
        featured: true
    },
    {
        icon: MessageSquare,
        title: "AI Automation",
        description: "Intelligent chatbots and workflows that qualify leads, schedule calls, and work 24/7.",
        href: "/services/ai-automation",
        color: "blue",
        featured: true
    },
    {
        icon: Smartphone,
        title: "Mobile-First Design",
        description: "60%+ of customers browse on mobile. We optimize every pixel for mobile dominance.",
        href: "/services/web-design",
        color: "purple"
    },
    {
        icon: TrendingUp,
        title: "Lead Generation",
        description: "Conversion-optimized systems that turn visitors into qualified leads and paying customers.",
        href: "/services/lead-generation",
        color: "indigo"
    },
    {
        icon: Zap,
        title: "Full-Service Support",
        description: "From hosting to maintenance, we're your complete digital technology partner.",
        href: "/contact",
        color: "blue"
    }
]

const getColorClasses = (color: string) => {
    const colors = {
        purple: {
            icon: 'text-accent-purple',
            gradient: 'from-accent-purple/20 to-accent-purple/5',
            border: 'group-hover:border-accent-purple/40',
            glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]'
        },
        indigo: {
            icon: 'text-accent-indigo',
            gradient: 'from-accent-indigo/20 to-accent-indigo/5',
            border: 'group-hover:border-accent-indigo/40',
            glow: 'group-hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]'
        },
        blue: {
            icon: 'text-accent-blue',
            gradient: 'from-accent-blue/20 to-accent-blue/5',
            border: 'group-hover:border-accent-blue/40',
            glow: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]'
        }
    }
    return colors[color as keyof typeof colors]
}

export function Services() {
    return (
        <section className="relative py-32 bg-background-primary overflow-hidden" id="services">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-accent-indigo/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <div className="max-w-3xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block mb-6">
                            <div className="px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm font-semibold backdrop-blur-sm">
                                Core Services
                            </div>
                        </div>
                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Digital Systems<br />
                            <span className="text-gradient">Built for Growth</span>
                        </h2>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            Cutting-edge technology and proven strategies, custom-engineered for local business domination.
                        </p>
                    </motion.div>
                </div>

                {/* Asymmetric Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon
                        const colors = getColorClasses(service.color)
                        const isFeatured = service.featured

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    delay: index * 0.08,
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className={`${isFeatured ? 'lg:col-span-1 lg:row-span-1' : ''}`}
                            >
                                <Link href={service.href}>
                                    <div className={`
                                        group relative h-full glass p-8 lg:p-10 rounded-2xl
                                        border-2 border-white/5 backdrop-blur-xl
                                        transition-all duration-500 cursor-pointer
                                        hover:scale-[1.02] hover:-translate-y-1
                                        ${colors.border} ${colors.glow}
                                        ${isFeatured ? 'bg-gradient-to-br ' + colors.gradient : ''}
                                    `}>
                                        {/* Hover gradient overlay */}
                                        <div className={`
                                            absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                                            transition-opacity duration-500 -z-10
                                            bg-gradient-to-br ${colors.gradient}
                                        `} />

                                        {/* Icon */}
                                        <div className="relative mb-8">
                                            <div className={`
                                                w-16 h-16 rounded-2xl bg-white/[0.03]
                                                flex items-center justify-center
                                                group-hover:scale-110 group-hover:rotate-3
                                                transition-all duration-500
                                                border border-white/5
                                            `}>
                                                <Icon className={`w-8 h-8 ${colors.icon}`} />
                                            </div>
                                            {isFeatured && (
                                                <div className="absolute -top-3 -right-3">
                                                    <div className={`
                                                        w-8 h-8 rounded-full bg-gradient-to-br ${colors.gradient}
                                                        border-2 border-white/10 backdrop-blur-sm
                                                        flex items-center justify-center
                                                        animate-pulse
                                                    `}>
                                                        <Zap className="w-4 h-4 text-white fill-white" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="relative">
                                            <h3 className={`
                                                font-display text-2xl lg:text-3xl font-bold text-white mb-4
                                                group-hover:text-gradient transition-all duration-300
                                                ${isFeatured ? 'text-3xl' : ''}
                                            `}>
                                                {service.title}
                                            </h3>
                                            <p className="text-zinc-400 leading-relaxed mb-6">
                                                {service.description}
                                            </p>

                                            {/* CTA Link */}
                                            <div className="flex items-center gap-2 text-sm font-semibold text-accent-purple group-hover:gap-3 transition-all duration-300">
                                                <span>Learn more</span>
                                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </div>
                                        </div>

                                        {/* Corner accent */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/[0.03] border-2 border-white/10 text-white font-semibold hover:bg-white/[0.08] hover:border-accent-purple/40 transition-all duration-300 group"
                    >
                        View All Services
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
