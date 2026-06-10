"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, AlertTriangle, Gift, ArrowRight, CheckCircle, Loader2, Phone, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useExitIntent } from '@/hooks/useExitIntent'
import { storeExitIntentLead } from '@/app/actions/leads'
import { trackExitIntent } from '@/lib/analytics'
import { BUSINESS_INFO } from '@/lib/business-info'

export function ExitIntentPopup() {
  const { isTriggered, reset } = useExitIntent({
    delay: 8000, // 8 seconds before it can trigger (more time to engage)
    cookieExpireDays: 3, // Show again after 3 days
  })

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(15) // 15 minute urgency timer

  // Track when popup is shown
  useEffect(() => {
    if (isTriggered && typeof window !== 'undefined') {
      trackExitIntent('shown')
    }
  }, [isTriggered])

  // Fake countdown for urgency (resets on page load)
  useEffect(() => {
    if (!isTriggered) return

    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0))
    }, 60000) // Decrease every minute

    return () => clearInterval(timer)
  }, [isTriggered])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isTriggered) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
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
        // Track with gtag if available
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as unknown as { gtag: (type: string, event: string, params: Record<string, unknown>) => void }).gtag('event', 'exit_intent_conversion', {
            email_domain: email.split('@')[1],
          })
        }
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-xl mx-4"
          >
            <div className="bg-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
              {/* Urgent header bar */}
              <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
                    <span className="text-white font-bold text-sm uppercase tracking-wide">
                      Wait! Don&apos;t Leave Yet
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">
                      {countdown}:00 left
                    </span>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-14 right-4 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 transition-colors z-10"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <div className="p-8">
                {/* Gift icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <Gift className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                {/* Main content */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Your Competitors Are Stealing Your Leads
                    <span className="text-cyan-400"> Right Now</span>
                  </h2>
                  <p className="text-slate-400 text-lg mb-4">
                    While you think about it, businesses with AI respond in <span className="text-white font-semibold">14 seconds</span> and win <span className="text-cyan-400 font-semibold">78% more jobs</span>.
                  </p>

                  {/* Special offer box */}
                  <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        Exclusive Exit Offer
                      </span>
                    </div>
                    <p className="text-white font-bold text-xl mb-1">
                      FREE 24/7 Lead Machine Setup Guide
                    </p>
                    <p className="text-slate-400 text-sm">
                      + 15-minute strategy call to calculate your lost leads
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                      disabled={isSubmitting}
                    />
                    <Input
                      type="email"
                      placeholder="Your email *"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError('')
                      }}
                      className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg shadow-lg shadow-cyan-500/25 border-0 group"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Claim My Free Guide
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>

                {/* Alternative CTA */}
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <p className="text-center text-slate-500 text-sm mb-3">
                    Prefer to talk? Get answers in 2 minutes:
                  </p>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {BUSINESS_INFO.phone}
                  </a>
                </div>

                {/* Trust signals */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    No credit card required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-green-500" />
                    No spam, ever
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl p-8 md:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-400" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Smart Move! 🎯
              </h2>
              <p className="text-slate-400 mb-6">
                Your guide is on its way to <span className="text-cyan-400">{email}</span>. 
                Check your inbox in the next few minutes.
              </p>

              <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-white">Next step:</span> Book your free strategy call to see exactly how many leads you&apos;re losing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="flex-1 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold"
                >
                  <a href="/contact#book-call">
                    Book Strategy Call
                  </a>
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 h-12 border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Continue Browsing
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
