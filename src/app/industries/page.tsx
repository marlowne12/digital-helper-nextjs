"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Factory, Sprout, ShoppingBag, Wine } from 'lucide-react'
import { Button } from '@/components/ui/button'

const industries = [
    { name: "Healthcare", href: "/industries/healthcare", icon: <ShieldCheck />, desc: "Patient trust and secure lead capture for clinics and dental practices." },
    { name: "Manufacturing", href: "/industries/manufacturing", icon: <Factory />, desc: "B2B lead generation and capability showcases for industrial brands." },
    { name: "Agriculture", href: "/industries/agriculture", icon: <Sprout />, desc: "Modernizing agribusiness and supply chain communication in the Tri-Cities." },
    { name: "Retail & E-commerce", href: "/industries/retail-ecommerce", icon: <ShoppingBag />, desc: "High-performance online stores and retail visibility systems." },
    { name: "Wineries", href: "/industries/wineries", icon: <Wine />, desc: "Premium branding and booking engines for local vineyards and tasting rooms." }
]

export default function IndustriesHub() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-background-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-[500px] bg-accent-secondary/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mb-16 text-center mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Industries We <span className="text-gradient">Elevate.</span></h1>
                    <p className="text-xl text-zinc-400">
                        We don&apos;t do generic. We build specialized digital systems tailored to the unique economic landscape of the Tri-Cities.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industries.map((industry, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-10 rounded-3xl border-white/5 group hover:border-accent-secondary/20 transition-all flex flex-col"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent-secondary mb-6 group-hover:scale-110 transition-transform">
                                {industry.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">{industry.name}</h2>
                            <p className="text-zinc-500 mb-8 leading-relaxed flex-grow">{industry.desc}</p>
                            <Button asChild variant="outline" className="group/btn h-12 px-6 rounded-full border-white/10 hover:bg-white/5 mt-auto">
                                <Link href={industry.href} className="flex items-center gap-2">
                                    See Solutions
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}
