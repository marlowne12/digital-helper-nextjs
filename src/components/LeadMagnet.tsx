"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowRight, Clock, Zap, TrendingUp, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LeadMagnetModal } from '@/components/LeadMagnetModal'

interface LeadMagnetProps {
  variant?: 'default' | 'compact' | 'banner'
}

export function LeadMagnet({ variant = 'default' }: LeadMagnetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (variant === 'banner') {
    return (
      <>
        <section className="relative py-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">
                    Free Guide: The 24/7 Lead Machine
                  </p>
                  <p className="text-white/80 text-sm">
                    How AI captures leads while you sleep
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 h-11 rounded-xl shadow-lg group whitespace-nowrap"
              >
                Download Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        <LeadMagnetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          variant="guide"
        />
      </>
    )
  }

  if (variant === 'compact') {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">
                Free: The 24/7 Lead Machine Guide
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Learn how AI responds to leads in 14 seconds, even at 3am.
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold h-10 px-4 rounded-lg group"
              >
                Download Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>

        <LeadMagnetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          variant="guide"
        />
      </>
    )
  }

  // Default full variant
  return (
    <>
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                  <Download className="w-4 h-4" />
                  Free Download
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  The 24/7 Lead Machine
                </h2>
                <p className="text-xl text-cyan-400 font-medium mb-4">
                  How AI Captures Leads While You Sleep
                </p>
                <p className="text-slate-400 text-lg mb-8">
                  Your competitors got a lead at 3am last night. Their AI responded in 14 seconds. 
                  Learn exactly how they set it up — and how you can too.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="text-2xl font-bold text-white">78%</div>
                    <div className="text-xs text-slate-500">First responder wins</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="text-2xl font-bold text-white">14s</div>
                    <div className="text-xs text-slate-500">Average AI response</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <div className="text-2xl font-bold text-white">$47K</div>
                    <div className="text-xs text-slate-500">Avg. revenue boost</div>
                  </div>
                </div>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg h-14 px-8 rounded-xl shadow-lg shadow-cyan-500/20 group"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Free Guide
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Right - Visual */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
                  {/* Fake guide preview */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Bot className="w-8 h-8 text-cyan-400" />
                      <div>
                        <div className="text-white font-bold">The 24/7 Lead Machine</div>
                        <div className="text-cyan-400 text-sm">Digital Helper Guide</div>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded w-full mb-2" />
                    <div className="h-2 bg-slate-700 rounded w-4/5 mb-2" />
                    <div className="h-2 bg-slate-700 rounded w-3/5" />
                  </div>

                  {/* Table of contents preview */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                      What You&apos;ll Learn:
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">Why speed wins 78% of jobs</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">30-minute AI setup guide</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">Real $47K case study</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-300">Scripts that convert at 3am</span>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                  100% Free
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <LeadMagnetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="guide"
      />
    </>
  )
}
