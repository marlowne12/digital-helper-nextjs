"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
    {
        question: "Why Next.js instead of WordPress?",
        answer: "WordPress sites are often bloated and slow. Next.js is a modern framework that generates lightning-fast static pages, resulting in better user experience and higher Google rankings."
    },
    {
        question: "How does the AI automation work?",
        answer: "We build custom systems (chatbots, internal workflows) that handle repetitive tasks like lead qualification, scheduling, and customer support, saving you hours every week."
    },
    {
        question: "Do you only work with Tri-Cities businesses?",
        answer: "While we specialize in Richland, Kennewick, and Pasco, we help service-based businesses across the Pacific Northwest who want to modernize their operations."
    },
    {
        question: "What is 'Pay Per Lead' generation?",
        answer: "Instead of paying for ads and hoping they work, we build the systems yourself and you only pay for the verified, qualified leads that land in your inbox."
    }
]

export function FAQ() {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

    return (
        <section className="py-24 bg-background-secondary">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Common Questions</h2>
                    <p className="text-zinc-400">Everything you need to know about our modern approach.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="glass overflow-hidden">
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                            >
                                <span className="text-lg font-semibold text-white">{faq.question}</span>
                                {activeIndex === index ? (
                                    <Minus className="w-5 h-5 text-accent-purple" />
                                ) : (
                                    <Plus className="w-5 h-5 text-zinc-500" />
                                )}
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-white/[0.05] pt-6">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
