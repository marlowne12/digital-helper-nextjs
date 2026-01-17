"use client"

import React from 'react';
import { Smartphone, TrendingUp, Zap, Brain, BarChart, Shield, Plug, Headphones } from 'lucide-react';

const features = [
    {
        icon: <Smartphone size={32} />,
        title: "Mobile-First Architecture",
        description: "Designed for the 60%+ of users on mobile devices. Touch-friendly, responsive, and fast.",
        category: "Design"
    },
    {
        icon: <Zap size={32} />,
        title: "Lightning Fast Speed",
        description: "Core Web Vitals optimized. 90+ Google PageSpeed scores to keep visitors engaged.",
        category: "Performance"
    },
    {
        icon: <Brain size={32} />,
        title: "AI Content Integration",
        description: "Smart content generation that speaks to your local audience and drives conversions.",
        category: "AI"
    },
    {
        icon: <TrendingUp size={32} />,
        title: "Conversion Focused",
        description: "Strategic layout and CTAs designed to turn visitors into leads and customers.",
        category: "Growth"
    },
    {
        icon: <Shield size={32} />,
        title: "Enterprise Security",
        description: "SSL, DDoS protection, and secure forms to keep your business and customer data safe.",
        category: "Security"
    },
    {
        icon: <BarChart size={32} />,
        title: "Analytics Dashboard",
        description: "Clear insights into your traffic, leads, and performance without the complexity.",
        category: "Data"
    },
    {
        icon: <Plug size={32} />,
        title: "Seamless Integrations",
        description: "Connect with your CRM, email marketing, and booking tools automatically.",
        category: "Tech"
    },
    {
        icon: <Headphones size={32} />,
        title: "24/7 Support",
        description: "We handle the updates, backups, and maintenance so you can focus on your business.",
        category: "Service"
    }
];

export const Features: React.FC = () => {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Purple gradient background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                            Everything You Need to Succeed
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Powerful features designed to help your business grow and thrive in the digital age.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Icon */}
                            <div className="mb-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 w-fit text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                                {feature.description}
                            </p>

                            {/* Category badge */}
                            <div className="mt-4 inline-block px-3 py-1 rounded-full bg-slate-800/50 text-purple-400 text-xs font-medium">
                                {feature.category}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <span className="text-purple-300">Want to see all features in action?</span>
                        <button className="px-4 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-full text-sm font-medium transition-colors">
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
