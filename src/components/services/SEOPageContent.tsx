"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Search,
    MapPin,
    TrendingUp,
    ArrowRight,
    CheckCircle2,
    Link2 as LinkIcon,
    Zap,
    BarChart3,
    XCircle
} from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BreadcrumbV2 } from '@/components/v2/BreadcrumbV2'
import { PayForResultsBlock } from '@/components/v2/PayForResultsBlock'

const painPoints = [
    {
        title: "Invisible to Local Customers",
        desc: "If you don't appear in the top 3 'Map Pack' results, you're missing out on 70% of local traffic in the Tri-Cities."
    },
    {
        title: "Competitors Outranking You",
        desc: "Seeing your competitors at the top while your business is buried on Page 2? That's revenue walking out your door."
    },
    {
        title: "The 'SEO Guru' Burn",
        desc: "Tried SEO before and got 'monthly reports' but zero new phone calls? We focus on rankings that actually convert."
    },
    {
        title: "Outdated GBP Data",
        desc: "Incorrect hours, zero reviews, or missing photos? Google de-prioritizes businesses with incomplete profiles."
    }
]

const deliverables = [
    "Google Business Profile (GBP) Full Optimization",
    "Local Citation Building & NAP Consistency",
    "On-Page Technical SEO Audit & Implementation",
    "Hyper-Local Keyword Targeting (City-Specific)",
    "High-Authority Local Backlink Strategy",
    "Monthly Transparent ROI & Ranking Reports"
]

const faqs = [
    {
        q: "How long does it take to see results?",
        a: "Local SEO is a marathon, not a sprint. While some improvements (like GBP optimization) show results in weeks, meaningful Page 1 rankings typically take 3 to 6 months depending on competition."
    },
    {
        q: "Will I rank #1 on Google?",
        a: "While no one can guaranteed #1 rankings (beware of anyone who does), our systems are designed to push you into the 'Map Pack' (top 3) where the vast majority of local leads originate."
    },
    {
        q: "Do you handle my Google Business Profile?",
        a: "Yes! We manage everything from initial verification and set-up to weekly posts, photo updates, and review monitoring to keep your profile active and favored by Google's algorithm."
    },
    {
        q: "What is a 'Local Citation'?",
        a: "A citation is any mention of your Name, Address, and Phone (NAP) on other websites like Yelp, YellowPages, or local chambers. Consistent citations are a critical ranking factor for local SEO."
    }
]

export function SEOPageContent() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] overflow-hidden">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 relative">

                {/* Breadcrumb */}
                <BreadcrumbV2 items={[
                    { label: 'Services', href: '/services' },
                    { label: 'SEO', href: '/services/seo' },
                ]} />

                {/* 1. Hero Section */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">
                            Hyper-Local Search Authority
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Dominate Local <br />
                            <span className="text-indigo-300">Search Results.</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            If your business isn&apos;t on Page 1, you don&apos;t exist in the Tri-Cities. We use proven local SEO strategies to ensure Richland, Kennewick, and Pasco customers find you first.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                            >
                                Claim Your Free Audit
                            </Link>
                            <Link
                                href="/pricing"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl border border-white/10 hover:bg-white/5 text-white transition-colors"
                            >
                                View Packages
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* 2. Pain Points Section */}
                <section className="mb-32">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {painPoints.map((point, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl"
                            >
                                <XCircle className="w-8 h-8 text-red-500/50 mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{point.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3. Solution Section */}
                <section className="mb-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2
                                className="text-3xl md:text-5xl font-bold text-white mb-8"
                                style={{ fontFamily: 'var(--font-heading)' }}
                            >
                                The <span className="text-indigo-300">Map Pack</span> Mastery.
                            </h2>
                            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                                70% of local clicks go to the top 3 results on Google Maps. We don&apos;t just &apos;do SEO&apos;&mdash;we optimize every signal Google looks for to put you in the spotlight.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <span className="text-3xl font-bold text-white block mb-1">46%</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Of all Google Searches</span>
                                </div>
                                <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <span className="text-3xl font-bold text-white block mb-1">88%</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Mobile Visit Potential</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-indigo-500/20">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">GBP Optimization</h4>
                                        <p className="text-xs text-zinc-400">Total profile management for maximum local authority.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
                                        <LinkIcon className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Citation Stacking</h4>
                                        <p className="text-xs text-zinc-400">Building trust across the entire local digital ecosystem.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
                                        <BarChart3 className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">On-Page Signals</h4>
                                        <p className="text-xs text-zinc-400">Optimizing code and content for your specific city.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Process Section */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2
                            className="text-3xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Our SEO Funnel
                        </h2>
                        <p className="text-zinc-500">A systematic approach to owning your local market.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Audit', icon: <Search className="w-5 h-5" />, desc: 'Deep-dive rankings and competitor GAP analysis.' },
                            { title: 'Optimize', icon: <Zap className="w-5 h-5" />, desc: 'Technical fixes and GBP profile overhaul.' },
                            { title: 'Amplify', icon: <TrendingUp className="w-5 h-5" />, desc: 'Citation building and local content creation.' },
                            { title: 'Report', icon: <BarChart3 className="w-5 h-5" />, desc: 'Monthly data-driven ROI and ranking tracking.' }
                        ].map((step, i) => (
                            <div key={i} className="relative group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-300 mb-6 transition-all group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-zinc-400 text-sm">{step.desc}</p>
                                {i < 3 && <div className="hidden lg:block absolute top-7 left-20 w-full h-[1px] bg-white/5" />}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Deliverables Section */}
                <section className="mb-32">
                    <div className="bg-white/5 backdrop-blur-sm p-12 rounded-[2rem] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] -mr-32 -mt-32" />
                        <h2
                            className="text-3xl font-bold text-white mb-10"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Monthly Deliverables
                        </h2>
                        <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
                            {deliverables.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-zinc-300">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Pricing Preview */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2
                            className="text-3xl md:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Investment Plans
                        </h2>
                        <p className="text-zinc-500">Data-driven growth for every size of service business.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2">Local Foundation</h3>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-white">$750</span>
                                <span className="text-zinc-500 text-sm">/month</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> GBP Management & Posting</li>
                                <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Basic Citation Building</li>
                                <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Quarterly Keyword Analysis</li>
                            </ul>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center w-full h-11 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                        <div className="bg-indigo-600/5 backdrop-blur-sm p-8 rounded-3xl border border-indigo-500/30 relative flex flex-col">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white font-bold text-xs rounded-full uppercase tracking-tighter">Growth</div>
                            <h3 className="text-xl font-bold text-white mb-2">Market Dominator</h3>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-white">$1,500+</span>
                                <span className="text-zinc-500 text-sm">/month</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Aggressive Backlink Stacking</li>
                                <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Monthly Content Clusters</li>
                                <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Competitor Performance War</li>
                            </ul>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
                            >
                                Start Dominating
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Pay-For-Results Block */}
                <PayForResultsBlock ctaLabel="Get a Free Audit" />

                {/* 7. FAQ Section */}
                <section className="mb-32">
                    <h2
                        className="text-3xl font-bold text-white mb-12 text-center"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        SEO Questions
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqs.map((faq, i) => (
                                <AccordionItem key={i} value={`faq-${i}`} className="border border-white/5 bg-white/[0.01] rounded-2xl px-6 py-2 overflow-hidden">
                                    <AccordionTrigger className="text-white hover:text-indigo-300 text-left font-bold text-lg hover:no-underline">
                                        {faq.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-zinc-400 text-base leading-relaxed pt-2 pb-6">
                                        {faq.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </section>

                {/* 8. Final CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-center bg-indigo-600/5 border border-indigo-500/10 p-16 rounded-[3rem] relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-indigo-600/10 blur-[80px]" />
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Stop Being Google&apos;s Best Kept Secret.
                    </h2>
                    <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                        Most Tri-Cities businesses are just a few signal changes away from Page 1. Let&apos;s find your gaps and fill them.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 h-16 px-12 text-xl font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                            Claim Your Free Audit
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </motion.div>

            </div>
        </main>
    )
}
