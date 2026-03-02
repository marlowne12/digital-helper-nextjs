"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Zap,
    ArrowRight,
    CheckCircle2,
    XCircle,
    MousePointer2,
    Search,
    ShieldCheck,
    PenTool
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
        title: "The '2015' Look",
        desc: "Does your website look like it hasn't been touched in a decade? A dated site tells customers you're out of date too."
    },
    {
        title: "High Bounce Rates",
        desc: "Are people leaving before they even see what you offer? If your site doesn't grab attention in 3 seconds, you're losing money."
    },
    {
        title: "The WordPress Trap",
        desc: "Tired of slow loaders, constant plugin updates, and security patches? There's a better way to build."
    },
    {
        title: "Mobile Ghosting",
        desc: "If your site doesn't work perfectly on a phone, 60% of your Tri-Cities customers can't even find you."
    }
]

const deliverables = [
    "Custom Next.js Development (No Templates)",
    "Mobile-First Responsive UX Design",
    "90+ Google PageSpeed Performance Score",
    "SEO-Ready Architecture & Content",
    "Secure, Unhackable Static Hosting",
    "Conversion-Optimized Landing Pages"
]

const faqs = [
    {
        q: "Why Next.js instead of WordPress?",
        a: "WordPress is often slow, bloated, and requires constant maintenance. Next.js allows us to build lightning-fast, secure, and SEO-optimized sites that provide a far better user experience and higher conversion rates."
    },
    {
        q: "How long does a new website take?",
        a: "A typical high-performance site takes 2 to 4 weeks from discovery to launch, depending on the complexity and content requirements."
    },
    {
        q: "Will I be able to update content myself?",
        a: "Yes! We integrate user-friendly solutions that allow you to update text and images easily without needing any technical knowledge or worrying about breaking the site."
    },
    {
        q: "Is hosting included?",
        a: "We offer high-performance edge hosting as part of our maintenance plans, ensuring your site remains fast and secure 24/7."
    }
]

export function WebDesignPageContent() {
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
                    { label: 'Web Design', href: '/services/web-design' },
                ]} />

                {/* 1. Hero Section */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 uppercase tracking-wider">
                            High-Performance Web Design
                        </span>
                        <h1
                            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Websites That Work <br />
                            <span className="text-indigo-300">While You Sleep.</span>
                        </h1>
                        <h2 className="sr-only">Web Design Richland WA & Next.js Development</h2>
                        <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                            Most Richland business sites are slow, outdated, and ignored by Google. We build modern, blazing-fast digital foundations that turn visitors into loyal customers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                            >
                                Get Free Site Audit
                            </Link>
                            <Link
                                href="/work"
                                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold rounded-xl border border-white/10 hover:bg-white/5 text-white transition-colors"
                            >
                                View Our Portfolio
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
                                Engineering <span className="text-indigo-300">Higher Conversions.</span>
                            </h2>
                            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                                We don&apos;t use page builders or bloated templates. We write clean, high-performance code using Next.js&mdash;the same technology used by industry leaders like Netflix, Twitch, and Nike.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <span className="text-3xl font-bold text-white block mb-1">0.8s</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Avg Load Time</span>
                                </div>
                                <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <span className="text-3xl font-bold text-white block mb-1">100</span>
                                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Lighthouse SEO Score</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-indigo-500/20">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Unmatched Speed</h4>
                                        <p className="text-xs text-zinc-400">Sub-second load times that keep users engaged.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Absolute Security</h4>
                                        <p className="text-xs text-zinc-400">Static architecture that is virtually impossible to hack.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center">
                                        <Search className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Built-In SEO</h4>
                                        <p className="text-xs text-zinc-400">Google-friendly structure right out of the box.</p>
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
                            Our Renovation Process
                        </h2>
                        <p className="text-zinc-500">From concept to conversion in 4 strategic steps.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Discovery', icon: <Search className="w-5 h-5" />, desc: 'Market analysis & competitor benchmarking.' },
                            { title: 'Blueprint', icon: <PenTool className="w-5 h-5" />, desc: 'Wireframing the user journey for maximum ROI.' },
                            { title: 'Build', icon: <Zap className="w-5 h-5" />, desc: 'Custom Next.js development for peak performance.' },
                            { title: 'Launch', icon: <MousePointer2 className="w-5 h-5" />, desc: 'Deployment, optimization, and reporting.' }
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
                            What You Get
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
                            Investment Roadmap
                        </h2>
                        <p className="text-zinc-500">Professional foundations for any stage of growth.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2">The Launchpad</h3>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-white">$2,500</span>
                                <span className="text-zinc-500 text-sm">/one-time</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Perfect for new local service businesses</li>
                                <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> 5 Essential High-Performance Pages</li>
                                <li className="text-sm text-zinc-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-zinc-600" /> Basic SEO Foundation</li>
                            </ul>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center w-full h-11 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                        <div className="bg-indigo-600/5 backdrop-blur-sm p-8 rounded-3xl border border-indigo-500/30 relative flex flex-col">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white font-bold text-xs rounded-full uppercase tracking-tighter">Recommended</div>
                            <h3 className="text-xl font-bold text-white mb-2">The Scale-Up</h3>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-white">$5,000+</span>
                                <span className="text-zinc-500 text-sm">/one-time</span>
                            </div>
                            <ul className="space-y-3 mb-8 flex-grow">
                                <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Advanced Conversion Funnels</li>
                                <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Deep SEO Keyword Targeting</li>
                                <li className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Custom Animations & Interactions</li>
                            </ul>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
                            >
                                Start Scaling
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
                        Frequently Asked Questions
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
                        Stop Losing Leads to Sluggish Sites.
                    </h2>
                    <p className="text-zinc-400 mb-12 max-w-2xl mx-auto text-xl relative z-10 leading-relaxed">
                        Most Richland businesses are just one redesign away from doubling their bookings. Let&apos;s make sure yours is one of them.
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
