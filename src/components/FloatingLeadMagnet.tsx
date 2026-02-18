"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LeadMagnetModal } from '@/components/LeadMagnetModal'

const STORAGE_KEY = 'dh_floating_lm_dismissed'
const DISMISS_DURATION_HOURS = 24

export function FloatingLeadMagnet() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Check if previously dismissed
    const dismissedAt = localStorage.getItem(STORAGE_KEY)
    if (dismissedAt) {
      const dismissedTime = new Date(dismissedAt).getTime()
      const now = Date.now()
      const hoursSinceDismissed = (now - dismissedTime) / (1000 * 60 * 60)
      
      if (hoursSinceDismissed < DISMISS_DURATION_HOURS) {
        return // Still dismissed
      }
    }

    setIsDismissed(false)

    // Show after scrolling down 50% of the first viewport
    const handleScroll = () => {
      const scrollPercent = window.scrollY / window.innerHeight
      setIsVisible(scrollPercent > 0.5)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem(STORAGE_KEY, new Date().toISOString())
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
    setIsDismissed(true) // Hide the floating CTA when modal opens
    localStorage.setItem(STORAGE_KEY, new Date().toISOString())
  }

  if (isDismissed) return null

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 z-40 max-w-sm"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
              {/* Gradient accent */}
              <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-800/50 hover:bg-slate-700 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>

              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Download className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1 pr-6">
                    <h3 className="text-white font-bold mb-1">
                      Free: 24/7 Lead Machine Guide
                    </h3>
                    <p className="text-slate-400 text-sm mb-3">
                      Learn how AI captures leads at 3am while you sleep.
                    </p>
                    <Button
                      onClick={handleOpenModal}
                      className="w-full h-10 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/20"
                    >
                      Download Free
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadMagnetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="guide"
      />
    </>
  )
}
