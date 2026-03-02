"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, BadgeCheck } from "lucide-react";

const TRUST_PILLS = [
  "No upfront cost",
  "Pay for results only",
  "30-day guarantee",
];

interface PayForResultsBlockProps {
  ctaLabel?: string;
}

export function PayForResultsBlock({
  ctaLabel = "Get a Free Audit",
}: PayForResultsBlockProps) {
  return (
    <section className="mb-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl border border-indigo-500/20 bg-white/5 backdrop-blur-sm overflow-hidden p-10 lg:p-14"
      >
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-600/15 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-violet-600/8 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between">
          {/* Left — copy */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
                Zero-Risk Offer
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Zero risk.{" "}
              <span className="text-indigo-300">Real results.</span>
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              We only get paid when you get results. No setup fees. No
              long-term contracts. 30-day guarantee.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3">
              {TRUST_PILLS.map((pill) => (
                <div
                  key={pill}
                  className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-2"
                >
                  <BadgeCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-sm text-zinc-300 font-medium">
                    {pill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:min-w-[220px]">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 group"
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="https://calendly.com/marlowne12/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/[0.08] text-white font-semibold text-sm transition-all duration-200"
            >
              Book a Call &mdash; Zero Risk
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
