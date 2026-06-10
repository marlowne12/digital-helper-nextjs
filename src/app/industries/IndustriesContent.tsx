"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Factory, Sprout, ShoppingBag, Wine } from 'lucide-react'

const industries = [
    { name: "Healthcare", href: "/industries/healthcare", icon: ShieldCheck, desc: "Patient trust and secure lead capture for clinics and dental practices." },
    { name: "Manufacturing", href: "/industries/manufacturing", icon: Factory, desc: "B2B lead generation and capability showcases for industrial brands." },
    { name: "Agriculture", href: "/industries/agriculture", icon: Sprout, desc: "Modernizing agribusiness and supply chain communication in the Tri-Cities." },
    { name: "Retail & E-commerce", href: "/industries/retail-ecommerce", icon: ShoppingBag, desc: "High-performance online stores and retail visibility systems." },
    { name: "Wineries", href: "/industries/wineries", icon: Wine, desc: "Premium branding and booking engines for local vineyards and tasting rooms." }
]

export function IndustriesContent() {
    return (
        <main className="min-h-screen bg-operator-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative">

                {/* Hero */}
                <div className="max-w-3xl mb-20 text-center mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-charcoal border border-steel/40 text-signal-amber text-sm font-medium mb-6 uppercase tracking-wider">
                            Industry Specialists
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-6"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Industries We <span className="text-signal-amber">Elevate.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            We don&apos;t do generic. We build specialized digital systems tailored to the unique economic landscape of the Tri-Cities.
                        </p>
                    </motion.div>
                </div>

                {/* Industry Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industries.map((industry, i) => {
                        const Icon = industry.icon
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-charcoal p-10 rounded-3xl border border-steel/30 hover:border-signal-amber/40 transition-colors group flex flex-col"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-operator-black border border-steel/30 flex items-center justify-center mb-6 transition-colors">
                                    <Icon className="w-7 h-7 text-signal-amber" />
                                </div>
                                <h2
                                    className="text-2xl font-bold text-white mb-4"
                                    style={{ fontFamily: 'var(--font-heading)' }}
                                >
                                    {industry.name}
                                </h2>
                                <p className="text-zinc-400 mb-8 leading-relaxed flex-grow">{industry.desc}</p>
                                <Link
                                    href={industry.href}
                                    className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-all group/btn mt-auto"
                                >
                                    See Solutions
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>

            </div>
        </main>
    )
}
