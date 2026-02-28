"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const BULLETS = [
  "Free 30-min strategy call",
  "No obligation, no pressure",
  "Custom AI demo for your business",
];

export function CTAV2() {
  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-violet-600/8 to-transparent p-10 lg:p-16 overflow-hidden text-center"
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Ready to automate?</p>
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Stop missing leads.<br />Start booking more jobs.
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
              See exactly how an AI system would work for your specific business — in a free 30-minute demo.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {BULLETS.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 group"
            >
              Book Your Free Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
