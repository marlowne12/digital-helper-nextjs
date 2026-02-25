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

/**
 * StickyCTA - Mobile sticky bar
 * NOTE: Disabled on mobile in favor of MobileBottomNav component
 * Kept for desktop reference only
 */
export function StickyCTA({
    showAfter = 800,
    phone = "(509) 876-8454",
    ctaText = "Get Your Free Audit",
    ctaLink = "/contact"
}: StickyCTAProps) {
    // Mobile functionality now handled by MobileBottomNav component
    // This component is retained for potential future desktop use
    return null
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
