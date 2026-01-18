"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, ArrowRight, CheckCircle, AlertTriangle, Mail, Lock, Sparkles } from 'lucide-react'
import { geminiService } from '@/services/geminiService'
import { BusinessAuditResult } from '@/types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WebsiteAudit() {
    const [businessName, setBusinessName] = useState('')
    const [location, setLocation] = useState('Richland, WA')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<BusinessAuditResult | null>(null)
    const [emailCaptured, setEmailCaptured] = useState(false)
    const [capturingEmail, setCapturingEmail] = useState(false)

    const handleAudit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setResult(null)

        try {
            const data = await geminiService.analyzeBusinessWithMaps(businessName, location)
            setResult(data)
            console.log("LEAD CAPTURED (Website Audit):", { businessName, location, auditResult: data })
        } catch (error) {
            console.error("Audit failed", error)
            setResult({ analysis: "Could not complete audit. Please try again." })
        } finally {
            setLoading(false)
        }
    }

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setCapturingEmail(true)
        // Simulate lead storage
        setTimeout(() => {
            setEmailCaptured(true)
            setCapturingEmail(false)
        }, 1000)
    }

    return (
        <section className="py-24 bg-background-secondary relative overflow-hidden" id="audit">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-bold uppercase tracking-widest mb-8"
                    >
                        <Sparkles className="w-4 h-4" />
                        Free Competition Analysis
                    </motion.div>
                    <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">
                        Is Local SEO <span className="text-gradient">Ignoring You?</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Get an AI-powered breakdown of your Tri-Cities online presence. See exactly where you're losing leads to competitors in Richland.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="glass p-2 rounded-[2rem] shadow-glow-lg border-white/[0.05]">
                        <form onSubmit={handleAudit} className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-accent-purple transition-colors" size={20} />
                                <Input
                                    type="text"
                                    placeholder="Business Name (e.g. Richland HVAC)"
                                    className="w-full pl-14 h-16 bg-white/[0.03] border-transparent text-white placeholder:text-zinc-600 focus:bg-white/[0.05] transition-all rounded-2xl"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="md:w-1/3 relative group">
                                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-accent-indigo transition-colors" size={20} />
                                <Input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full pl-14 h-16 bg-white/[0.03] border-transparent text-white placeholder:text-zinc-600 focus:bg-white/[0.05] transition-all rounded-2xl"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-16 px-10 btn-primary text-lg font-bold rounded-2xl shrink-0 group"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                        Thinking...
                                    </div>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Audit Now
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </div>
                </motion.div>

                {/* Results Section */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto mt-12"
                        >
                            <div className="glass rounded-[2.5rem] overflow-hidden border-accent-purple/20">
                                <div className="h-2 bg-accent-gradient" />
                                <div className="p-8 md:p-12">
                                    {!emailCaptured ? (
                                        <div className="flex flex-col items-center py-12 text-center">
                                            <div className="w-20 h-20 bg-accent-purple/10 text-accent-purple rounded-3xl flex items-center justify-center mb-8 rotate-3">
                                                <Lock size={40} />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-4">Report Ready for {businessName}</h3>
                                            <p className="text-zinc-400 mb-10 max-w-sm text-lg">
                                                We've found <span className="text-white font-bold">critical issues</span> in your digital presence. Enter your email to unlock the full analysis.
                                            </p>
                                            <form onSubmit={handleEmailSubmit} className="w-full max-w-sm space-y-4">
                                                <div className="relative group">
                                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-accent-blue transition-colors" size={20} />
                                                    <Input
                                                        type="email"
                                                        placeholder="work@email.com"
                                                        className="w-full pl-14 h-16 bg-white/[0.03] border-transparent text-white placeholder:text-zinc-600 focus:bg-white/[0.05] transition-all rounded-2xl"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    disabled={capturingEmail}
                                                    className="w-full h-16 btn-primary text-lg font-bold rounded-2xl shadow-glow-md"
                                                >
                                                    {capturingEmail ? "Unlocking Analysis..." : "View Free Report"}
                                                </Button>
                                                <p className="text-xs text-zinc-500">
                                                    No spam. Just local growth insights for {location}.
                                                </p>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-4">
                                                <div className="p-4 bg-green-500/10 rounded-2xl text-green-400">
                                                    <CheckCircle size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white">Analysis Complete</h3>
                                                    <p className="text-zinc-500">Insights for {businessName}</p>
                                                </div>
                                            </div>

                                            <div className="prose prose-invert max-w-none">
                                                <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap glass p-8 rounded-3xl border-white/[0.05]">
                                                    {result.analysis}
                                                </div>
                                            </div>

                                            {result.mapLink && (
                                                <div className="flex items-center justify-between p-6 glass rounded-2xl border-white/[0.05]">
                                                    <span className="text-zinc-400 flex items-center gap-2">
                                                        <MapPin className="w-5 h-5 text-accent-purple" />
                                                        Google Maps Listing Found
                                                    </span>
                                                    <a
                                                        href={result.mapLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-white hover:text-accent-purple font-bold flex items-center gap-2 transition-colors"
                                                    >
                                                        {result.mapTitle || "View Listing"}
                                                        <ArrowRight className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            )}

                                            <div className="p-8 bg-accent-purple/5 border border-accent-purple/20 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
                                                <div className="flex gap-5 items-start">
                                                    <div className="p-3 bg-accent-purple/20 rounded-xl text-accent-purple shrink-0">
                                                        <AlertTriangle size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-bold text-white mb-2">Want to fix these issues?</h4>
                                                        <p className="text-zinc-400 text-sm">
                                                            We help services in {location} dominate local search. Let's discuss a strategy to beat your competitors.
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    asChild
                                                    className="btn-primary h-14 px-8 text-md font-bold rounded-xl shrink-0 whitespace-nowrap"
                                                >
                                                    <Link href="/contact" className="flex items-center gap-2">
                                                        Book Consult <ArrowRight size={18} />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
