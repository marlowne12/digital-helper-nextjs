"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    MapPin,
    Navigation,
    Locate,
    Map
} from 'lucide-react';

const locations = [
    {
        title: "Richland",
        href: "/locations/richland",
        icon: <MapPin className="w-4 h-4" />
    },
    {
        title: "Kennewick",
        href: "/locations/kennewick",
        icon: <Navigation className="w-4 h-4" />
    },
    {
        title: "Pasco",
        href: "/locations/pasco",
        icon: <Locate className="w-4 h-4" />
    },
    {
        title: "West Richland",
        href: "/locations/west-richland",
        icon: <Map className="w-4 h-4" />
    }
];

export function LocationNavSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:block w-full sticky top-32 self-start space-y-8">
            <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold text-white mb-6 px-2">Our Locations</h3>
                <nav className="space-y-2">
                    {locations.map((location) => {
                        const isActive = pathname === location.href;

                        return (
                            <Link
                                key={location.href}
                                href={location.href}
                                className="block group"
                            >
                                <div className={`
                                    relative flex items-center justify-between p-3 rounded-xl transition-all duration-300
                                    ${isActive
                                        ? 'bg-accent-primary/10 text-white border border-accent-primary/20'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }
                                `}>
                                    <div className="flex items-center gap-3">
                                        <span className={`
                                            p-2 rounded-lg transition-colors
                                            ${isActive ? 'bg-accent-primary/20 text-accent-primary' : 'bg-white/5 text-zinc-500 group-hover:text-white'}
                                        `}>
                                            {location.icon}
                                        </span>
                                        <span className="font-medium text-sm">{location.title}</span>
                                    </div>

                                    {isActive && (
                                        <motion.div
                                            layoutId="activeLocationIndicator"
                                            className="absolute left-0 w-1 h-6 bg-accent-primary rounded-r-full"
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

            <div className="glass p-6 rounded-2xl border border-accent-primary/20 bg-accent-primary/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="relative z-10">
                    <h4 className="text-xl font-bold text-white mb-2">Local SEO Audit</h4>
                    <p className="text-sm text-zinc-400 mb-6">
                        Want to see how you rank in your specific Tri-Cities neighborhood?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center w-full py-3 px-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors gap-2 text-sm"
                    >
                        Get Local Audit
                    </Link>
                </div>
            </div>
        </aside>
    );
}
