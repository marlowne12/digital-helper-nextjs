"use client";

import { motion } from "framer-motion";
import { PhoneMissed, Clock, TrendingDown, ArrowRight } from "lucide-react";

const PROBLEMS = [
  {
    icon: PhoneMissed,
    title: "Unanswered inbound leads",
    desc: "A homeowner calls or submits a form after hours. While you're off the clock, they contact your competitor. You lose the job before you even know it existed.",
    stat: "62% of calls to local businesses go unanswered after hours.",
  },
  {
    icon: Clock,
    title: "The high cost of slow follow-up",
    desc: "Leads grow cold in minutes. If you respond to a quote request hours or days later, they have already booked with the first responder.",
    stat: "78% of customers buy from the business that responds first.",
  },
  {
    icon: TrendingDown,
    title: "Administrative bottlenecks",
    desc: "Every booking, invoice, schedule update, and client question requires your direct attention. You cannot grow a business that only runs when you are in it.",
    stat: "Business owners spend 11+ hours per week on manual admin.",
  },
];

export function ProblemV2() {
  return (
    <section className="overflow-hidden bg-[#090a0c] text-white py-24 md:py-32 border-t border-white/10 relative">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#ff8964]/5 blur-[100px]" />
      </div>

      <div className="max-w-[80rem] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - 40% Width - Brand Context */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-24">
            <div className="agency-eyebrow inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#ff8964] mb-6 border border-[#ff8964]/20 bg-[#ff8964]/5">
              Operations Bottleneck
            </div>
            
            <h2 className="text-4xl md:text-5xl font-normal leading-tight text-white tracking-tighter mb-6 text-balance">
              Burying growth
              <br />
              in administrative chaos
            </h2>
            
            <p className="text-[#95979e] leading-relaxed font-light text-base mb-8">
              Traditional businesses lose up to a third of their potential revenue simply because they lack the bandwidth to capture, qualify, and book clients instantly. When your systems rely entirely on manual effort, scaling becomes the bottleneck.
            </p>

            <a 
              href="/audit" 
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#ff8964] transition-colors"
            >
              Request a free workflow audit
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Column - 60% Width - Fragmented Stacked Rows */}
          <div className="lg:col-span-7 space-y-4">
            {PROBLEMS.map((prob, i) => {
              const Icon = prob.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Icon Container */}
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#ff8964]/30 group-hover:bg-[#ff8964]/5 transition-all duration-300">
                      <Icon className="w-5 h-5 text-[#ff8964]" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
                        {prob.title}
                      </h3>
                      <p className="text-[#95979e] text-sm leading-relaxed font-light mb-4">
                        {prob.desc}
                      </p>
                      <div className="inline-block text-[11px] text-[#ff8964]/80 font-medium bg-[#ff8964]/5 border border-[#ff8964]/10 rounded-md px-2.5 py-1">
                        Stat: {prob.stat}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
