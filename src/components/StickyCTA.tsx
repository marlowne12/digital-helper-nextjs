"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Calendar, X, Zap, MessageSquare } from 'lucide-react'

interface StickyCTAProps {
    /** Scroll threshold to show the bar (in pixels) */
    showAfter?: number
    /** Phone number to display */
    phone?: string
    /** Primary CTA text */
    ctaText?: string
    /** Primary CTA link */
    ctaLink?: string
}

export function StickyCTA({
    showAfter = 800,
    phone = "(509) 876-8454",
    ctaText = "Get Your Free Audit",
    ctaLink = "/contact"
}: StickyCTAProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isDismissed, setIsDismissed] = useState(false)

    useEffect(() => {
        // Check if user has dismissed in this session
        const dismissed = sessionStorage.getItem('stickyCTADismissed')
        if (dismissed === 'true') {
            setIsDismissed(true)
            return
        }

        const handleScroll = () => {
            // Don't show if user is near bottom (footer area)
            const nearBottom = window.scrollY + window.innerHeight > document.body.scrollHeight - 400
            setIsVisible(window.scrollY > showAfter && !nearBottom)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [showAfter])

    const handleDismiss = () => {
        setIsDismissed(true)
        sessionStorage.setItem('stickyCTADismissed', 'true')
    }

    if (isDismissed) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
                >
                    {/* Mobile Sticky Bar */}
                    <div className="bg-slate-900/95 backdrop-blur-xl border-t border-purple-500/20 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center justify-between gap-3">
                            {/* Quick Message */}
                            <div className="flex items-center gap-2 text-sm">
                                <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                                <span className="text-zinc-300 hidden xs:inline">Get started today</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                <a
                                    href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    <span className="hidden sm:inline">Call</span>
                                </a>
                                
                                <Link
                                    href={ctaLink}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all"
                                >
                                    <Calendar className="w-4 h-4" />
                                    <span>{ctaText}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/**
 * Desktop floating CTA - appears in bottom right corner
 */
export function FloatingCTAButton({
    showAfter = 1200,
    ctaText = "Book a Call",
    ctaLink = "/contact"
}: StickyCTAProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const nearBottom = window.scrollY + window.innerHeight > document.body.scrollHeight - 400
            setIsVisible(window.scrollY > showAfter && !nearBottom)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [showAfter])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed bottom-8 right-8 z-40 hidden md:block"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Link
                        href={ctaLink}
                        className="group relative flex items-center"
                    >
                        {/* Expanded text on hover */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.span
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-full mr-3 whitespace-nowrap bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                                >
                                    {ctaText}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Main Button */}
                        <div className="relative">
                            {/* Pulse ring */}
                            <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-20" />
                            
                            {/* Button */}
                            <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all group-hover:scale-110">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
