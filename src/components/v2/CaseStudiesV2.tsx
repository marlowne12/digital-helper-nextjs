"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CASES = [
  {
    tag: "AI Automation + Web Design",
    client: "Richland HVAC Pros",
    result: "+42% increase in booked calls",
    description: "AI chatbot handles after-hours leads and books service appointments directly to their calendar.",
  },
  {
    tag: "AI Automation",
    client: "Tri-Cities Law Firm",
    result: "12 hours/week saved",
    description: "Automated intake, FAQ answering, and consultation scheduling — freeing staff for billable work.",
  },
  {
    tag: "Local SEO + Website",
    client: "Modern Cafe Richland",
    result: "5,000+ new monthly visitors",
    description: "From page 4 to top 3 on Google Maps in 90 days with hyper-local SEO and a redesigned site.",
  },
  {
    tag: "Lead Generation",
    client: "Tri-Cities Real Estate",
    result: "Top 3 Google Maps ranking",
    description: "GBP optimization and review automation put them at the top of every local property search.",
  },
];

export function CaseStudiesV2() {
  return (
    <section className="py-24 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Results</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              Real businesses.<br />
              <span className="text-zinc-500">Real numbers.</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors flex-shrink-0"
          >
            View all work <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {CASES.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-indigo-500/25 hover:bg-indigo-500/3 transition-all duration-300"
            >
              <span className="inline-block px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4">
                {c.tag}
              </span>
              <h3 className="text-lg font-bold text-white mb-1">{c.client}</h3>
              <p className="text-2xl font-bold text-indigo-400 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                {c.result}
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
