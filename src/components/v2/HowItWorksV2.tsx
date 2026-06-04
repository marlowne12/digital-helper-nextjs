"use client";

import { motion } from "framer-motion";
import { ArrowRight, Wrench, Cpu, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Wrench,
    title: "Design your workspace",
    desc: "Connect communication channels, map custom automation triggers, and configure your delivery pipeline exactly how your business operates.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Deploy AI in context",
    desc: "Audit customer queries, train your custom bot models, connect calendars, and set up automated text-back call captures.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Invite anyone",
    desc: "Add your staff, support agents, or managers to review analytics, manage inbound conversations, and watch the pipeline grow.",
  },
];

export function HowItWorksV2() {
  return (
    <section className="overflow-hidden bg-white text-gray-900 py-24 md:py-32 relative font-sans">
      {/* Subtle top edge separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gray-200"></div>

      <div className="max-w-[80rem] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - 40% Width - Brand Context */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-gray-600 mb-6 border border-gray-200 bg-gray-50">
              Collaborative Flow
            </div>
            
            <h2 className="text-4xl md:text-5xl font-normal leading-tight text-gray-900 tracking-tighter mb-6 text-balance">
              Meet, move, and
              <br />
              <span className="text-zinc-500">launch together.</span>
            </h2>
            
            <p className="text-gray-600 leading-relaxed font-light text-base mb-8">
              We bring your team, our system engineers, and your customer pipelines into a shared workspace. No black boxes, no guessing games — you track every build milestone, lead alert, and dashboard deployment in real-time.
            </p>

            <a 
              href="/booking" 
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-zinc-600 transition-colors"
            >
              Book a kickoff call
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Column - 60% Width - Numbered Steps Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 lg:grid-cols-1 gap-8 sm:gap-6 lg:gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex flex-col lg:flex-row lg:items-start gap-4 p-5 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-300 group"
                >
                  {/* Number tag */}
                  <div className="text-2xl font-semibold tracking-tight text-gray-400 group-hover:text-gray-900 transition-colors shrink-0">
                    {step.number}
                  </div>
                  
                  {/* Icon container */}
                  <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-all duration-300">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1.5 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed font-light">
                      {step.desc}
                    </p>
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
