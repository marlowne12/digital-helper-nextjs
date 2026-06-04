"use client"

import React from 'react';
import { Star, ExternalLink } from 'lucide-react';

export const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-[#0a0a0f] border-t border-white/5 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto">
                    {/* Stars */}
                    <div className="inline-flex items-center gap-1.5 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-indigo-400 text-indigo-400" />
                        ))}
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Be Our First Review
                    </h2>

                    <p className="text-white/60 text-lg mb-10 leading-relaxed">
                        We&apos;re a new agency in the Tri-Cities and we&apos;re building our reputation one client at a time.
                        If you&apos;ve worked with us, we&apos;d love a Google review — it helps local businesses find us.
                    </p>

                    <a
                        href="https://www.google.com/search?q=Digital+Helper+Agency+Richland+WA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-colors duration-200"
                    >
                        Leave Us a Google Review
                        <ExternalLink className="w-4 h-4" />
                    </a>

                    <p className="mt-6 text-white/40 text-sm">
                        Search &ldquo;Digital Helper Agency Richland WA&rdquo; on Google Maps
                    </p>
                </div>
            </div>
        </section>
    );
};
