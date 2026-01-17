"use client"

import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        author: "Sarah Jenkins",
        role: "Owner",
        company: "Tri-Cities Coffee Co.",
        content: "Digital Helper completely transformed our online presence. Our mobile traffic has doubled, and customers love the new menu layout. Best investment we've made this year.",
        rating: 5,
        avatar: null
    },
    {
        id: 2,
        author: "Mike Peterson",
        role: "General Manager",
        company: "Richland Auto Repair",
        content: "The AI chat feature is a game changer. It answers basic questions 24/7 and books appointments for us. I'm saving at least 10 hours a week on phone calls.",
        rating: 5,
        avatar: null
    },
    {
        id: 3,
        author: "Lisa Chen",
        role: "Director",
        company: "Chen Real Estate Group",
        content: "Our old site was slow and invisible on Google. After the redesign and SEO work, we're ranking #1 for our main keywords in Kennewick. The ROI has been incredible.",
        rating: 5,
        avatar: null
    }
];

export const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                            Loved by Local Businesses
                        </span>
                    </h2>

                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our clients have to say about their experience.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Quote icon */}
                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Quote className="w-16 h-16 text-purple-400" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-slate-300 mb-6 leading-relaxed relative z-10">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                                    {testimonial.avatar ? (
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-bold text-lg">
                                            {testimonial.author.charAt(0)}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <div className="text-white font-semibold">{testimonial.author}</div>
                                    <div className="text-slate-400 text-sm">
                                        {testimonial.role} at {testimonial.company}
                                    </div>
                                </div>
                            </div>

                            {/* Hover gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
                        </div>
                    ))}
                </div>

                {/* Trust badges */}
                <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
                    <div className="text-slate-500 text-sm">Trusted by 50+ local businesses</div>
                    <div className="w-px h-8 bg-slate-800" />
                    <div className="text-slate-500 text-sm">4.9/5 Average Rating</div>
                    <div className="w-px h-8 bg-slate-800" />
                    <div className="text-slate-500 text-sm">100% Satisfaction Guarantee</div>
                </div>
            </div>
        </section>
    );
};
