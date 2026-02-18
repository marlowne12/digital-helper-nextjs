"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Loader2, CheckCircle, Shield, FileText, Zap, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface LeadMagnetModalProps {
  isOpen: boolean
  onClose: () => void
  variant?: 'guide' | 'checklist' | 'audit'
}

const LEAD_MAGNET_CONFIG = {
  guide: {
    title: 'The 24/7 Lead Machine',
    subtitle: 'How AI Captures Leads While You Sleep',
    description: 'A free guide showing how local service businesses use AI to respond to leads in 14 seconds, win 78% more jobs, and never miss another 3am inquiry.',
    ctaText: 'Download Free Guide',
    icon: FileText,
    benefits: [
      'Why 78% of jobs go to the first responder',
      'Setup guide: AI chat in under 30 minutes',
      'Real case study: $47K in new revenue',
      'The exact scripts that convert at 3am',
    ],
    deliverable: 'guide',
  },
  checklist: {
    title: 'AI Readiness Checklist',
    subtitle: 'Is Your Business Ready for 24/7 AI?',
    description: 'A 15-point checklist to see if your business is ready to implement AI lead capture and what you need to prepare.',
    ctaText: 'Get Free Checklist',
    icon: Zap,
    benefits: [
      '15 readiness indicators',
      'Tech requirements overview',
      'Budget planning guide',
      'Implementation timeline',
    ],
    deliverable: 'checklist',
  },
  audit: {
    title: 'Response Time Audit',
    subtitle: "How Fast Are You Losing Leads?",
    description: "We'll test your current lead response time and show you exactly how many leads you're losing to faster competitors.",
    ctaText: 'Get Free Audit',
    icon: Clock,
    benefits: [
      'Current response time analysis',
      'Competitor comparison',
      'Lost lead calculator',
      'Personalized recommendations',
    ],
    deliverable: 'audit',
  },
}

export function LeadMagnetModal({ isOpen, onClose, variant = 'guide' }: LeadMagnetModalProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const config = LEAD_MAGNET_CONFIG[variant]
  const Icon = config.icon

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('')
      setName('')
      setBusinessName('')
      setError('')
      setIsSubmitted(false)
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || undefined,
          businessName: businessName || undefined,
          variant,
          source: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        // Track conversion
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as unknown as { gtag: (type: string, event: string, params: Record<string, unknown>) => void }).gtag('event', 'lead_magnet_download', {
            lead_magnet_type: variant,
            email_domain: email.split('@')[1],
          })
        }
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
              {/* Gradient accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              {!isSubmitted ? (
                <div className="grid md:grid-cols-2">
                  {/* Left side - Benefits */}
                  <div className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-r border-slate-700/50">
                    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-cyan-400" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2">
                      {config.title}
                    </h2>
                    <p className="text-cyan-400 font-medium mb-4">
                      {config.subtitle}
                    </p>
                    <p className="text-slate-400 text-sm mb-6">
                      {config.description}
                    </p>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        What&apos;s Inside:
                      </p>
                      {config.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Social proof */}
                    <div className="mt-8 pt-6 border-t border-slate-700/50">
                      <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <Users className="w-4 h-4" />
                        <span>Downloaded by 500+ local business owners</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Form */}
                  <div className="p-8">
                    <h3 className="text-lg font-semibold text-white mb-6">
                      Get instant access
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Your name (optional)"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
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

                      <div>
                        <Input
                          type="text"
                          placeholder="Business name (optional)"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                          disabled={isSubmitting}
                        />
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting || !email.trim()}
                        className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-cyan-500/20 border-0 group"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            {config.ctaText}
                          </span>
                        )}
                      </Button>
                    </form>

                    {/* Privacy */}
                    <div className="flex items-center justify-center gap-1.5 mt-4 text-slate-500 text-xs">
                      <Shield className="w-3 h-3" />
                      <span>No spam, ever. Unsubscribe anytime.</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Success state */
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>

                  <h2 className="text-2xl font-bold text-white mb-3">
                    Check Your Inbox!
                  </h2>
                  <p className="text-slate-400 mb-6 max-w-md mx-auto">
                    We&apos;ve sent <span className="text-white font-medium">{config.title}</span> to{' '}
                    <span className="text-cyan-400">{email}</span>. It should arrive within a few minutes.
                  </p>

                  <div className="bg-slate-800/50 rounded-xl p-4 mb-6 inline-block">
                    <p className="text-sm text-slate-400">
                      Didn&apos;t receive it? Check your spam folder or{' '}
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-cyan-400 hover:underline"
                      >
                        try a different email
                      </button>
                    </p>
                  </div>

                  <Button
                    onClick={onClose}
                    className="h-12 px-8 bg-slate-800 hover:bg-slate-700 text-white"
                  >
                    Continue Browsing
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
