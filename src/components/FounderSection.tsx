"use client"

import React from 'react'
import Link from 'next/link'
import { DigitalHelperMonogram } from '@/brand'
import { BUSINESS_INFO } from '@/lib/business-info'

export function FounderSection() {
  return (
    <section className="py-24 border-y" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">

          {/* Signature mark */}
          <div className="mb-10">
            <DigitalHelperMonogram size={40} />
          </div>

          {/* Headline */}
          <h2
            className="text-3xl md:text-4xl font-medium mb-8"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              letterSpacing: '-0.01em',
              color: 'var(--foreground)',
            }}
          >
            Hi, I&apos;m Mars.
          </h2>

          {/* Body: two paragraphs, different weights */}
          <p
            className="text-base md:text-lg leading-relaxed mb-5"
            style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-geist-sans)' }}
          >
            I built Digital Helper because Tri-Cities service businesses (HVAC companies, plumbers,
            landscapers) were losing jobs every night they were offline. Your competitor answered
            first. You never knew.
          </p>

          <p
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--font-geist-sans)' }}
          >
            I&apos;m local. I know the market. And I build the systems myself (AI, web design, and
            SEO) so your business keeps working when you&apos;re on the job.
          </p>

          {/* Contact line */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={BUSINESS_INFO.phoneHref}
              className="text-sm underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70"
              style={{ fontFamily: 'var(--font-geist-mono)', color: 'var(--foreground)' }}
            >
              {BUSINESS_INFO.phone}
            </Link>
            <span style={{ color: 'var(--border)' }} aria-hidden="true">|</span>
            <Link
              href={BUSINESS_INFO.emailHref}
              className="text-sm underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70"
              style={{ fontFamily: 'var(--font-geist-mono)', color: 'var(--muted-foreground)' }}
            >
              {BUSINESS_INFO.email}
            </Link>
            <span style={{ color: 'var(--border)' }} aria-hidden="true">|</span>
            <span
              className="text-sm"
              style={{ fontFamily: 'var(--font-geist-mono)', color: 'var(--muted-foreground)' }}
            >
              Richland, WA
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}
