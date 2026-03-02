"use client";

import { motion } from "framer-motion";
import { PhoneMissed, Clock, TrendingDown } from "lucide-react";

const PROBLEMS = [
  {
    icon: PhoneMissed,
    title: "Missed calls = missed jobs",
    body: "A homeowner calls at 9pm about a broken AC. You're off the clock. They call your competitor. You never knew.",
    stat: "62% of calls go unanswered after hours",
  },
  {
    icon: Clock,
    title: "Slow follow-up kills deals",
    body: "A lead fills out your form. You follow up 2 days later. They've already booked someone else — someone who responded in minutes.",
    stat: "78% of customers book the first responder",
  },
  {
    icon: TrendingDown,
    title: "You're the bottleneck",
    body: "Every quote, every question, every booking needs you. You can't grow a business that only runs when you're in it.",
    stat: "Owners spend 11hrs/week on admin that AI can handle",
  },
];

export function ProblemV2() {
  return (
    <section className="py-24 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
            You&apos;re losing jobs every night{" "}
            <span className="text-zinc-500">you&apos;re not available.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROBLEMS.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{problem.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">{problem.body}</p>
                <div className="pt-4 border-t border-white/8">
                  <p className="text-xs text-zinc-500 italic">&ldquo;{problem.stat}&rdquo;</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
