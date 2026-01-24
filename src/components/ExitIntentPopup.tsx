"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useExitIntent } from '@/hooks/useExitIntent'
import { storeExitIntentLead } from '@/app/actions/leads'
import { trackExitIntent } from '@/lib/analytics'

export function ExitIntentPopup() {
    const { isTriggered, reset } = useExitIntent({
        delay: 5000, // 5 seconds before it can trigger
        cookieExpireDays: 7,
    })

    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState('')

    // Track when popup is shown
    React.useEffect(() => {
        if (isTriggered && typeof window !== 'undefined') {
            trackExitIntent('shown')
        }
    }, [isTriggered])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address')
            return
        }

        setIsSubmitting(true)

        try {
            const response = await storeExitIntentLead({
                email,
                pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
            })

            if (response.success) {
                setIsSubmitted(true)
                trackExitIntent('converted')
            } else {
                setError('Something went wrong. Please try again.')
            }
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        reset()
    }

    return (
        <AnimatePresence>
            {isTriggered && !isSubmitted && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={handleClose}
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
                    >
                        <div className="glass rounded-3xl overflow-hidden relative">
                            {/* Gradient accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-accent-gradient" />

                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                                aria-label="Close popup"
                            >
                                <X className="w-5 h-5 text-zinc-400" />
                            </button>

                            <div className="p-8 md:p-12">
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-accent-purple/10 flex items-center justify-center mb-6 mx-auto">
                                    <Sparkles className="w-8 h-8 text-accent-purple" />
                                </div>

                                {/* Content */}
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Wait! Don&apos;t Leave Empty-Handed
                                    </h2>
                                    <p className="text-zinc-400 text-lg">
                                        Get a <span className="text-white font-semibold">free website audit</span> delivered to your inbox.
                                        We&apos;ll analyze your site&apos;s SEO, speed, and conversion potential.
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <Input
                                            type="email"
                                            placeholder="Enter your email..."
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-14 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 rounded-xl pl-4 pr-4"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-red-400 text-sm text-center">{error}</p>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 btn-primary text-lg font-bold rounded-xl group"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Get My Free Audit
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        )}
                                    </Button>
                                </form>

                                {/* Trust signals */}
                                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                        No spam, ever
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3 text-green-500" />
                                        Unsubscribe anytime
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}

            {/* Success state */}
            {isSubmitted && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
                    >
                        <div className="glass rounded-3xl p-8 md:p-12 text-center">
                            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 mx-auto">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                You&apos;re All Set!
                            </h2>
                            <p className="text-zinc-400 mb-6">
                                Your free audit is on its way. Check your inbox in the next few minutes.
                            </p>
                            <Button
                                onClick={handleClose}
                                className="btn-secondary h-12 px-8"
                            >
                                Continue Browsing
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
