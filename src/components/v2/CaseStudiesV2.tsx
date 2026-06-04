"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

const CASES = [
  {
    tag: "AI Automation + Web Design",
    client: "Richland HVAC Pros",
    result: "+42% increase in booked calls",
    desc: "AI chatbot handles after-hours leads and books service appointments directly to their calendar.",
  },
  {
    tag: "AI Automation",
    client: "Tri-Cities Law Firm",
    result: "12 hours/week saved",
    desc: "Automated intake, FAQ answering, and consultation scheduling — freeing staff for billable work.",
  },
  {
    tag: "Local SEO + Website",
    client: "Modern Cafe Richland",
    result: "5,000+ new monthly visitors",
    desc: "From page 4 to top 3 on Google Maps in 90 days with hyper-local SEO and a redesigned site.",
  },
  {
    tag: "Lead Generation",
    client: "Tri-Cities Real Estate",
    result: "Top 3 Google Maps ranking",
    desc: "GBP optimization and review automation put them at the top of every local search.",
  },
];

export function CaseStudiesV2() {
  return (
    <section className="overflow-hidden bg-[#111112] text-white py-24 md:py-32 border-t border-white/10 relative">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#ff8964]/5 blur-[100px]" />
      </div>

      <div className="max-w-[80rem] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - 40% Width - Brand Context */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-24">
            <div className="agency-eyebrow inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#ff8964] mb-6 border border-[#ff8964]/20 bg-[#ff8964]/5">
              Client Performance
            </div>
            
            <h2 className="text-4xl md:text-5xl font-normal leading-tight text-white tracking-tighter mb-6 text-balance">
              From launch to growth.
              <br />
              <span className="text-[#95979e]">Ship results.</span>
            </h2>
            
            <p className="text-[#95979e] leading-relaxed font-light text-base mb-8">
              We track and measure every client conversion, lead flow, and search metric. By replacing legacy systems with modern Next.js frontends and automated AI flows, we deliver measurable business impact.
            </p>

            <Link 
              href="/work" 
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#ff8964] transition-colors"
            >
              View all client stories
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column - 60% Width - Vertical Staggered Cases Tracker */}
          <div className="lg:col-span-7 space-y-4">
            {CASES.map((c, i) => (
              <motion.div
                key={c.client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group relative p-6 rounded-2xl bg-[#090a0c]/80 border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block text-[9px] uppercase font-bold tracking-wider text-[#ff8964] bg-[#ff8964]/5 border border-[#ff8964]/10 rounded-md px-2.5 py-1 mb-2">
                      {c.tag}
                    </span>
                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {c.client}
                    </h3>
                  </div>
                  
                  {/* Results highlight badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 group-hover:border-[#ff8964]/20 transition-colors shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-[#ff8964]" />
                    <span className="text-xs font-semibold text-white">
                      {c.result}
                    </span>
                  </div>
                </div>

                <p className="text-[#95979e] text-sm leading-relaxed font-light">
                  {c.desc}
                </p>
                
                {/* Visual tracker line highlight */}
                <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-transparent group-hover:bg-[#ff8964] transition-colors rounded-r-full" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
