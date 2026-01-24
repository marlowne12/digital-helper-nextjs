"use client"

import React, { useState } from 'react';
import { Layout, Smartphone, Zap, CheckCircle2, Globe, Clock, ShieldCheck, TrendingUp, Target, ChevronDown, Gauge, Lock, Code, Users, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export const WebDesign: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
            <div className="container mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-800 text-purple-400 text-xs font-semibold mb-6 animate-fade-in-up">
                        <Layout size={12} /> Custom Design & Development
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Websites That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Actually Bring You Customers</span>
                    </h1>
                    <p className="text-slate-400 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Your website is your 24/7 salesperson. If it&apos;s slow, ugly, or confusing, you&apos;re losing $10,000+ in revenue every year. We build lightning-fast, high-converting websites that turn Tri-Cities visitors into paying customers—without the 6-month wait or $50K price tag.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <button className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold transition-all">
                            See Our Work
                        </button>
                        <button className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500/10 rounded-xl font-semibold transition-all">
                            Get Free Quote
                        </button>
                    </div>
                </div>

                {/* Main Showcase Image */}
                <div className="mb-24 relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500 opacity-0"></div>
                    <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                        <Image
                            src="/assets/web_design_showcase.webp"
                            alt="Web Design Showcase"
                            fill
                            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-md">
                            <h3 className="text-2xl font-bold mb-2">Multi-Device Excellence</h3>
                            <p className="text-slate-300 text-sm md:text-base">We ensure your brand looks premium on desktops, tablets, and phones alike.</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    {/* Tech Stack Breakdown */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold mb-6">Built for Performance</h2>
                        {[
                            {
                                icon: <Zap className="text-yellow-400" />,
                                title: "Sub-Second Load Times",
                                desc: "Using Next.js and React, we achieve perfect Lighthouse scores. Every millisecond saved is a customer won."
                            },
                            {
                                icon: <Smartphone className="text-purple-400" />,
                                title: "Mobile-First Architecture",
                                desc: "68% of local searches happen on mobile. Our sites are designed for thumbs first, cursors second."
                            },
                            {
                                icon: <Clock className="text-cyan-400" />,
                                title: "Automated Maintenance",
                                desc: "Continuous updates and security patches mean your site stays fast and secure without you lifting a finger."
                            },
                            {
                                icon: <ShieldCheck className="text-green-400" />,
                                title: "Enterprise Security",
                                desc: "Bank-grade SSL, DDoS protection, and secure CMS integrations protect your data and your reputation."
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-900/50 transition-colors group">
                                <div className="mt-1 p-3 bg-slate-900 rounded-xl border border-slate-800 h-fit group-hover:border-purple-500/30 transition-colors">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1 text-white group-hover:text-purple-300 transition-colors">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dynamic Code Visual */}
                    <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl h-[450px] flex flex-col font-mono text-sm">
                            <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="text-xs text-slate-500 ml-2">App.tsx</div>
                            </div>
                            <div className="p-6 text-slate-400 overflow-hidden">
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">1</span>
                                    <span className="text-purple-400">export const</span> <span className="text-cyan-400">DigitalHelper</span> = () =&gt; &#123;
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">2</span>
                                    <span className="ml-4 text-purple-400">const</span> [growth, setGrowth] = <span className="text-yellow-400">useState</span>(100);
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">3</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">4</span>
                                    <span className="ml-4 text-slate-500">{`// Trigger local business transformation`}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">5</span>
                                    <span className="ml-4 text-yellow-400">useEffect</span>(() =&gt; &#123;
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">6</span>
                                    <span className="ml-8 text-cyan-400">optimizeSpeed</span>();
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">7</span>
                                    <span className="ml-8 text-cyan-400">boostSEO</span>(&apos;Richland&apos;);
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-600 select-none">8</span>
                                    <span className="ml-4 text-white">&#125;, []);</span>
                                </div>
                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="h-32 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                                        <Globe className="text-purple-400 animate-spin-slow" size={40} />
                                    </div>
                                    <div className="h-32 bg-slate-800 rounded-lg flex flex-col items-center justify-center border border-slate-700 p-4">
                                        <div className="text-green-400 font-bold text-2xl">+145%</div>
                                        <div className="text-[10px] text-slate-500">CONVERSION BOOST</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Before/After Comparison Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">See The Transformation</h2>
                        <p className="text-slate-400">Real Tri-Cities businesses, real results</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "HVAC Contractor",
                                before: "Slow site, no mobile support, 5 leads/month",
                                after: "Lightning-fast, mobile-first, 23 leads/month",
                                metrics: [
                                    { label: "Page Speed", before: "4.2s", after: "0.8s", icon: <Gauge className="text-red-400" /> },
                                    { label: "Mobile Score", before: "34/100", after: "98/100", icon: <Smartphone className="text-green-400" /> },
                                    { label: "Leads/Month", before: "5", after: "23", icon: <TrendingUp className="text-purple-400" /> }
                                ]
                            },
                            {
                                title: "Dental Practice",
                                before: "Outdated design, no booking system, scattered leads",
                                after: "Modern design, online booking, 18 new patients/month",
                                metrics: [
                                    { label: "Conversion Rate", before: "0.5%", after: "2.8%", icon: <Target className="text-red-400" /> },
                                    { label: "Bounce Rate", before: "72%", after: "28%", icon: <Users className="text-green-400" /> },
                                    { label: "New Patients", before: "3/mo", after: "18/mo", icon: <TrendingUp className="text-purple-400" /> }
                                ]
                            },
                            {
                                title: "Law Firm",
                                before: "No online presence, relying on referrals only",
                                after: "Professional site, ranking for local keywords",
                                metrics: [
                                    { label: "Organic Traffic", before: "0", after: "850/mo", icon: <Globe className="text-red-400" /> },
                                    { label: "Keyword Rankings", before: "0 in top 10", after: "7 in top 10", icon: <Target className="text-green-400" /> },
                                    { label: "Case Inquiries", before: "2/mo", after: "12/mo", icon: <TrendingUp className="text-purple-400" /> }
                                ]
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:border-purple-500/30 transition-all">
                                <h3 className="text-xl font-bold mb-4 text-purple-400">{item.title}</h3>
                                <div className="mb-6">
                                    <div className="mb-4">
                                        <span className="text-xs text-slate-500 font-semibold">BEFORE</span>
                                        <p className="text-sm text-slate-400 mt-1">{item.before}</p>
                                    </div>
                                    <div className="pt-4 border-t border-slate-700">
                                        <span className="text-xs text-slate-500 font-semibold">AFTER</span>
                                        <p className="text-sm text-slate-300 mt-1 font-medium">{item.after}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {item.metrics.map((metric, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-slate-800 rounded-lg">
                                                    {metric.icon}
                                                </div>
                                                <span className="text-xs text-slate-400">{metric.label}</span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-slate-500">{metric.before}</div>
                                                <div className="text-sm font-bold text-purple-400">{metric.after}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7-Week Process Section */}
                <div className="mb-24 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Your 7-Week Website Journey</h2>
                        <p className="text-slate-400">From strategy to launch, guaranteed on time</p>
                    </div>
                    <div className="grid md:grid-cols-7 gap-4">
                        {[
                            {
                                week: "Week 1",
                                title: "Discovery & Planning",
                                tasks: [
                                    "1-hour strategy call",
                                    "Audit existing site",
                                    "Competitor analysis",
                                    "Define goals & KPIs",
                                    "Project blueprint PDF"
                                ]
                            },
                            {
                                week: "Week 2",
                                title: "Design Mockups",
                                tasks: [
                                    "Desktop designs",
                                    "Mobile layouts",
                                    "Interactive prototype",
                                    "First revision round",
                                    "Review meeting"
                                ]
                            },
                            {
                                week: "Week 3",
                                title: "Design Approval",
                                tasks: [
                                    "Revision round 2",
                                    "Final tweaks",
                                    "Design sign-off",
                                    "Prepare for dev",
                                    "Copy refinement"
                                ]
                            },
                            {
                                week: "Week 4",
                                title: "Development",
                                tasks: [
                                    "Build frontend",
                                    "Optimize images",
                                    "SEO setup",
                                    "Analytics config",
                                    "Form integration"
                                ]
                            },
                            {
                                week: "Week 5",
                                title: "Content & Polish",
                                tasks: [
                                    "Content loading",
                                    "Link building",
                                    "Final styling",
                                    "Performance tuning",
                                    "Security setup"
                                ]
                            },
                            {
                                week: "Week 6",
                                title: "Testing & QA",
                                tasks: [
                                    "Desktop testing",
                                    "Mobile testing",
                                    "Cross-browser",
                                    "Performance audit",
                                    "Bug fixes"
                                ]
                            },
                            {
                                week: "Week 7",
                                title: "Launch & Training",
                                tasks: [
                                    "Go-live deploy",
                                    "Domain config",
                                    "Training video",
                                    "30-day support",
                                    "Final handoff"
                                ]
                            }
                        ].map((phase, i) => (
                            <div key={i} className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-all">
                                <div className="text-purple-400 text-xs font-bold mb-2">{phase.week}</div>
                                <h3 className="text-sm font-bold mb-3 text-white">{phase.title}</h3>
                                <ul className="space-y-1">
                                    {phase.tasks.map((task, idx) => (
                                        <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                                            <CheckCircle2 size={12} className="text-purple-400 shrink-0 mt-0.5" />
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-6 bg-purple-900/20 border border-purple-800 rounded-2xl text-center">
                        <p className="text-purple-300 font-semibold">📅 Launch Guarantee: If not live in 8 weeks, we refund 20% of project cost.</p>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Web Design Pricing</h2>
                        <p className="text-slate-400">One-time investment, years of growth</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Starter Website",
                                price: "$1,999",
                                period: "one-time",
                                description: "Perfect for small businesses getting online",
                                features: [
                                    "5 custom pages",
                                    "Mobile-responsive design",
                                    "Basic SEO optimization",
                                    "Contact form",
                                    "Google Analytics setup",
                                    "SSL certificate included",
                                    "30 days support"
                                ],
                                highlighted: false,
                                monthly: "+ $97/month optional hosting"
                            },
                            {
                                name: "Professional Website",
                                price: "$3,999",
                                period: "one-time",
                                description: "Most popular for growing businesses",
                                features: [
                                    "Everything in Starter",
                                    "Up to 10 pages",
                                    "Advanced animations",
                                    "Google Business integration",
                                    "AI chatbot option (+$197/mo)",
                                    "Blog setup (6 posts)",
                                    "90 days support",
                                    "2 hours training"
                                ],
                                highlighted: true,
                                monthly: "+ $147/month hosting & maintenance"
                            },
                            {
                                name: "Enterprise Website",
                                price: "$7,999+",
                                period: "custom",
                                description: "For ambitious businesses needing features",
                                features: [
                                    "Everything in Professional",
                                    "Unlimited pages",
                                    "E-commerce (Stripe/PayPal)",
                                    "Custom CMS",
                                    "Advanced integrations",
                                    "Multi-language support",
                                    "1 year priority support",
                                    "Dedicated account manager"
                                ],
                                highlighted: false,
                                monthly: "Custom hosting included"
                            }
                        ].map((tier, i) => (
                            <div key={i} className={`relative p-8 rounded-3xl border ${tier.highlighted ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-slate-900' : 'border-slate-800 bg-slate-900/40'} transition-all hover:-translate-y-2 duration-300`}>
                                {tier.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                                        MOST POPULAR
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <div className="mb-2">
                                    <span className="text-4xl font-bold">{tier.price}</span>
                                    <span className="text-slate-400 text-sm"> {tier.period}</span>
                                </div>
                                <p className="text-slate-400 text-sm mb-6">{tier.description}</p>
                                <div className="text-xs text-slate-500 mb-6 font-medium italic">{tier.monthly}</div>
                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
                                            <span className="text-slate-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${tier.highlighted ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                                    Get Quote
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-6 bg-slate-900/50 border border-slate-800 rounded-2xl text-center">
                        <p className="text-slate-300 font-semibold">💳 12-month 0% interest financing available for all plans</p>
                    </div>
                </div>

                {/* Process Section */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center relative overflow-hidden mb-24">
                    <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">What Makes a Great Website?</h2>
                        <p className="text-slate-400 italic">Six core pillars of website success</p>
                    </div>

                    <div className="relative z-10 grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Gauge className="text-yellow-400" />, title: "⚡ Sub-Second Speed", desc: "98+ Lighthouse score. Users abandon slow sites in 3 seconds." },
                            { icon: <Smartphone className="text-purple-400" />, title: "📱 Mobile-First Design", desc: "68% of searches happen on phones. Your site must be thumb-friendly." },
                            { icon: <Lock className="text-green-400" />, title: "🔒 Bank-Grade Security", desc: "SSL, DDoS protection, regular backups. Your reputation is safe with us." },
                            { icon: <Target className="text-cyan-400" />, title: "🎯 Conversion-Focused", desc: "Clear CTAs, trust signals, optimized funnels. Design for results, not aesthetics." },
                            { icon: <Code className="text-pink-400" />, title: "📈 Built-In SEO", desc: "Structured data, optimized images, fast loading. Rank from day one." },
                            { icon: <MessageSquare className="text-blue-400" />, title: "🤖 AI Chatbot Ready", desc: "Optional 24/7 AI support. Answer questions while you sleep." }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-900/50 transition-colors group">
                                <div className="mb-4 p-4 bg-slate-900 rounded-xl border border-slate-800 group-hover:border-purple-500/30 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <FAQSection />

            </div>
        </div>
    );
};

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "How long does it take to build a website?",
            a: "Our proven 7-week process gets your site live guaranteed. That's weeks, not months. It includes strategy, design, development, testing, and training."
        },
        {
            q: "Can I update the site myself after launch?",
            a: "Yes! We can set up a CMS (Content Management System) so you can edit text, images, and blog posts without coding. Alternatively, we offer maintenance plans starting at $97/month."
        },
        {
            q: "What if I don't have content (text, photos)?",
            a: "No problem. We can write compelling copy, source stock photos, or work with your existing materials. Content writing is included with Professional and Enterprise packages."
        },
        {
            q: "Do you offer website maintenance and hosting?",
            a: "Yes. We offer managed hosting and maintenance starting at $97/month (Starter) or $147/month (Professional). Includes backups, security updates, SSL, and 99.9% uptime guarantee."
        },
        {
            q: "Can you redesign my existing website?",
            a: "Absolutely. We'll audit your current site, identify problems, and redesign it for speed, conversions, and SEO. Same 7-week timeline and guarantees apply."
        },
        {
            q: "What's the difference between the $1,999 and $3,999 packages?",
            a: "Starter is great for simple 5-page sites. Professional adds 5+ pages, animations, chatbot readiness, blog setup, and extended support. Enterprise adds unlimited pages, e-commerce, custom CMS, and integrations."
        },
        {
            q: "Do you include SEO with the website design?",
            a: "Yes! All packages include SEO setup: optimized meta tags, structured data, mobile optimization, site speed, and Google Analytics. We can also add ongoing SEO services ($497+/month) for ranking growth."
        },
        {
            q: "What if my website still isn't live after 7 weeks?",
            a: "It will be. We guarantee launch within 8 weeks, or we refund 20% of your project cost. We only work on 4-5 projects at a time to ensure on-time delivery."
        },
        {
            q: "Do you offer e-commerce functionality?",
            a: "Yes, through our Enterprise package. We integrate Stripe, PayPal, inventory management, and order tracking. Perfect for shops, restaurants, or service booking."
        },
        {
            q: "How much does the AI chatbot cost?",
            a: "Our AI chatbot is optional and costs $197/month after launch. It&apos;s trained on your business, answers FAQs, qualifies leads, and books appointments 24/7. ROI typically pays for itself in 2-3 weeks."
        }
    ];

    return (
        <div className="mb-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-400">Everything you need to know about web design with Digital Helper</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-900/60 transition-colors"
                        >
                            <span className="font-semibold text-lg pr-8">{faq.q}</span>
                            <ChevronDown
                                size={20}
                                className={`shrink-0 text-purple-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {openIndex === i && (
                            <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
