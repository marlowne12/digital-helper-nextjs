"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Layout,
    Search,
    Bot,
    Users,
    ShieldCheck
} from 'lucide-react';

const services = [
    {
        title: "Web Design",
        href: "/services/web-design",
        icon: <Layout className="w-4 h-4" />
    },
    {
        title: "SEO & Local Search",
        href: "/services/seo",
        icon: <Search className="w-4 h-4" />
    },
    {
        title: "AI Automation",
        href: "/services/ai-automation",
        icon: <Bot className="w-4 h-4" />
    },
    {
        title: "Lead Generation",
        href: "/services/lead-generation",
        icon: <Users className="w-4 h-4" />
    },
    {
        title: "Reputation Management",
        href: "/services/reputation-management",
        icon: <ShieldCheck className="w-4 h-4" />
    }
];

export function ServiceNavSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:block w-full sticky top-32 self-start space-y-8">
            <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-6 px-2">Our Services</h3>
                <nav className="space-y-2">
                    {services.map((service) => {
                        const isActive = pathname === service.href;

                        return (
                            <Link
                                key={service.href}
                                href={service.href}
                                className="block group"
                            >
                                <div className={`
                                    relative flex items-center justify-between p-3 rounded-xl transition-all duration-300
                                    ${isActive
                                        ? 'bg-accent-purple/10 text-white border border-accent-purple/20'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }
                                `}>
                                    <div className="flex items-center gap-3">
                                        <span className={`
                                            p-2 rounded-lg transition-colors
                                            ${isActive ? 'bg-accent-purple/20 text-accent-purple' : 'bg-white/5 text-zinc-500 group-hover:text-white'}
                                        `}>
                                            {service.icon}
                                        </span>
                                        <span className="font-medium text-sm">{service.title}</span>
                                    </div>

                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 w-1 h-6 bg-accent-purple rounded-r-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="glass p-6 rounded-2xl border border-accent-purple/20 bg-accent-purple/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="relative z-10">
                    <h4 className="text-xl font-bold text-white mb-2">Need a Custom Plan?</h4>
                    <p className="text-sm text-zinc-400 mb-6">
                        We build tailored solutions for businesses ready to scale.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center w-full py-3 px-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors gap-2 text-sm"
                    >
                        Book Strategy Call
                    </Link>
                </div>
            </div>
        </aside>
    );
}
