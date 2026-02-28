"use client";

import { motion } from "framer-motion";
import { Wrench, Cpu, TrendingUp } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Wrench,
    title: "We build it",
    body: "We set up your AI system — trained on your business, your services, your FAQs. Connected to your calendar. Done in days, not weeks.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "It runs",
    body: "Your AI answers leads, qualifies prospects, and books jobs — 24/7. You get notified the moment a real lead comes in.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "You grow",
    body: "More leads captured. More jobs booked. Less time on the phone. Your business scales without you being the bottleneck.",
  },
];

export function HowItWorksV2() {
  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Simple. Fast. Done.
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#0a0a0f] border border-indigo-500/30 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10">
                  <Icon className="w-8 h-8 text-indigo-400" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">{step.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
