"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/business-info'

interface MobileCallButtonProps {
    /** Phone number to call */
    phone?: string
    /** Show after scrolling this many pixels */
    showAfter?: number
}

/**
 * MobileCallButton
 * 
 * A floating call button specifically for mobile users.
 * Critical for local business conversions - makes it easy for
 * potential customers to call with one tap.
 * 
 * Features:
 * - Only shows on mobile
 * - Appears after scroll threshold
 * - Hides near footer
 * - Pulse animation for attention
 * - Positioned to not conflict with bottom nav
 */
export function MobileCallButton({
    phone = BUSINESS_INFO.phone,
    showAfter = 500
}: MobileCallButtonProps) {
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const nearBottom = scrollY + window.innerHeight > document.body.scrollHeight - 500
            setIsVisible(scrollY > showAfter && !nearBottom)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [showAfter])

    const phoneDigits = phone.replace(/[^0-9]/g, '')

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href={`tel:+1${phoneDigits}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed left-4 bottom-24 z-30 md:hidden"
                    aria-label="Call us"
                >
                    <div className="relative">
                        {/* Pulse ring */}
                        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
                        
                        {/* Button */}
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                            <Phone className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </motion.a>
            )}
        </AnimatePresence>
    )
}
