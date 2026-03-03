"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import type { Metadata } from "next";

// Note: metadata must be in a server component — keeping data here, page wrapper handles metadata.
// See: src/app/work/layout.tsx for metadata (or add a parent server file if needed)

const WORKS = [
  {
    title: "Richland HVAC Pros",
    type: "Web Design + Local SEO",
    image: "https://picsum.photos/800/600?random=1",
    metric: "42% Call Increase",
    description:
      "Built a high-performance Next.js site that dominates the Richland Map Pack. Mobile-first, 99 Lighthouse score.",
    tags: ["Next.js", "Local SEO", "GMB"],
  },
  {
    title: "Tri-Cities Law Office",
    type: "AI Automation + CRM",
    image: "https://picsum.photos/800/600?random=11",
    metric: "15 hrs/wk Saved",
    description:
      "Automated lead intake and follow-up using custom AI workflows. Prospects scored and routed automatically.",
    tags: ["AI Chatbot", "CRM Integration", "Automation"],
  },
  {
    title: "Modern Cafe Richland",
    type: "Website Transformation",
    image: "https://picsum.photos/800/600?random=21",
    metric: "2.4s Speed Boost",
    description:
      "Migrated a slow WordPress site to Next.js, achieving a 99 Lighthouse score and 3× more online orders.",
    tags: ["Next.js", "Performance", "Migration"],
  },
  {
    title: "Local Plumbers LLC",
    type: "Lead Generation",
    image: "https://picsum.photos/800/600?random=31",
    metric: "More Leads/Mo",
    description:
      "Pay-per-lead system that delivers verified plumbing jobs directly — no more feast-or-famine months.",
    tags: ["Google Ads", "Landing Page", "Lead Gen"],
  },
];

export default function WorkPage() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-600/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Case Studies & Portfolio
            </div>

            {/* Headline */}
            <h1
              className="text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Evidence of{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                performance.
              </span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Real results for Tri-Cities businesses. Every project below
              started with a specific problem — here&apos;s how we solved it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Work Grid ── */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {WORKS.map((work, i) => (
              <WorkCard key={work.title} work={work} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent overflow-hidden p-12 text-center"
          >
            <div className="absolute inset-0 bg-indigo-600/5 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Ready to start?
              </p>
              <h2
                className="text-4xl lg:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Your business could be next.
              </h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
                Book a free strategy call and we&apos;ll show you exactly what
                results are realistic for your market — no pitch, no pressure.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/25 group"
                >
                  Book your free call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/[0.08] text-white font-semibold transition-all duration-200"
                >
                  Explore services
                </Link>
              </div>
              <p className="mt-6 text-xs text-zinc-600">
                15-minute call. No commitment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// Work Card
// ─────────────────────────────────────────────

function WorkCard({
  work,
  index,
}: {
  work: (typeof WORKS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.14] hover:bg-white/[0.05] overflow-hidden transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={work.image}
          alt={`${work.title} — ${work.type} project by Digital Helper`}
          fill
          className="object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
        />
        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
            {work.type}
          </span>
        </div>
        {/* Placeholder notice */}
        <div className="absolute bottom-4 right-4">
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] text-zinc-500 uppercase tracking-wider">
            Sample image
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 space-y-3">
        <h3
          className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {work.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {work.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[11px] font-medium border border-white/[0.08] text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Metric + link */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
            <TrendingUp className="w-4 h-4" />
            {work.metric}
          </div>
          <span className="text-xs text-zinc-600 font-bold uppercase tracking-widest">
            Case Study
          </span>
        </div>
      </div>
    </motion.div>
  );
}
