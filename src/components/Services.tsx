"use client"

import React from 'react';
import { Smartphone, Gauge, RefreshCw, MapPin, Search, PenTool, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Services: React.FC = () => {
    const services = [
        {
            title: 'Website Renovation',
            desc: 'We take your existing content and rebuild it in a modern, high-speed framework.',
            icon: <RefreshCw size={32} />,
            color: 'text-cyan-400',
            bg: 'bg-cyan-500/10',
            border: 'hover:border-cyan-500/50'
        },
        {
            title: 'Mobile-First Design',
            desc: 'Over 60% of local traffic is mobile. We ensure your site looks perfect on phones.',
            icon: <Smartphone size={32} />,
            color: 'text-violet-400',
            bg: 'bg-violet-500/10',
            border: 'hover:border-violet-500/50'
        },
        {
            title: 'Google Business Sync',
            desc: 'We integrate your Google Maps reviews and hours directly into your website.',
            icon: <MapPin size={32} />,
            color: 'text-pink-400',
            bg: 'bg-pink-500/10',
            border: 'hover:border-pink-500/50'
        },
        {
            title: 'Instant Speed Upgrade',
            desc: 'Slow sites lose customers. Our React-based sites load near instantly.',
            icon: <Gauge size={32} />,
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10',
            border: 'hover:border-yellow-500/50'
        },
        {
            title: 'Local SEO Booster',
            desc: 'Structure your data so people in Richland and Tri-Cities find you first.',
            icon: <Search size={32} />,
            color: 'text-green-400',
            bg: 'bg-green-500/10',
            border: 'hover:border-green-500/50'
        },
        {
            title: 'AI Content Refresh',
            desc: 'We use AI to rewrite outdated text into persuasive, modern sales copy.',
            icon: <PenTool size={32} />,
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
            border: 'hover:border-orange-500/50'
        }
    ];

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden" id="services">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                        How We Help Local Business
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Stop losing customers to competitors with better websites. We fix the problems that matter.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((s, i) => (
                        <Card
                            key={i}
                            className={`group bg-slate-900/40 border-slate-800 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden ${s.border}`}
                        >
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent pointer-events-none`}></div>

                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <div className={`p-4 rounded-2xl w-fit border border-slate-800 transition-colors duration-300 ${s.bg} ${s.color}`}>
                                    {s.icon}
                                </div>
                                <ArrowUpRight className="text-slate-700 group-hover:text-white transition-colors h-6 w-6" />
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">{s.title}</CardTitle>
                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {s.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
