"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function FounderSection() {
  return (
    <section className="py-24 bg-background-primary border-y border-white/[0.08]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left — identity */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Photo placeholder — swap src with your actual photo */}
              <div className="w-40 h-40 rounded-2xl bg-white/[0.06] border border-white/[0.10] flex items-center justify-center mb-8 overflow-hidden">
                {/* Replace this div with: <Image src="/mars.jpg" alt="Mars — founder of Digital Helper" width={160} height={160} className="object-cover w-full h-full" /> */}
                <span className="text-5xl font-bold text-white/20 select-none">M</span>
              </div>

              <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">The person behind it</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Hi, I&apos;m Mars.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                I built Digital Helper because Tri-Cities service businesses — HVAC companies, plumbers, landscapers — were losing jobs every night they were offline. Your competitor answered first. You never knew.
              </p>
              <p className="text-zinc-500 leading-relaxed">
                I&apos;m local. I know the market. And I build the systems myself — AI, web design, and SEO — so your business keeps working when you&apos;re on the job.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Link
                  href="tel:+15099875060"
                  className="text-sm font-medium text-white hover:text-accent-purple transition-colors"
                >
                  (509) 987-5060
                </Link>
                <span className="text-zinc-700">·</span>
                <Link
                  href="mailto:digitalhelperwebsite@gmail.com"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  digitalhelperwebsite@gmail.com
                </Link>
              </div>
            </motion.div>

            {/* Right — trust / reviews */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Google reviews badge */}
              <Link
                href="https://maps.app.goo.gl/oywZxxYt9w3m1oCK9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex-shrink-0">
                  <svg viewBox="0 0 48 48" className="w-10 h-10" aria-hidden="true">
                    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
                    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-white font-semibold ml-1">4.9</span>
                  </div>
                  <p className="text-zinc-400 text-sm">See our Google reviews</p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
              </Link>

              {/* Testimonials */}
              {[
                {
                  quote: "Our AI chatbot books appointments while we're on job sites. We stopped missing after-hours leads completely.",
                  name: "Jake T.",
                  role: "HVAC Owner, Richland"
                },
                {
                  quote: "Mars built our site in a week and it actually shows up on Google now. Best money I've spent on marketing.",
                  name: "Sandra M.",
                  role: "Plumbing Co., Kennewick"
                }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-5 rounded-xl border border-white/[0.08] bg-white/[0.03]"
                >
                  <p className="text-zinc-300 text-sm leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-zinc-500 text-xs">
                    <span className="text-white font-medium">{t.name}</span>
                    {" · "}{t.role}
                  </p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
