"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Zap, Calendar } from "lucide-react";

const STATS = [
  { value: "24/7", label: "Always on" },
  { value: "< 5s", label: "Response time" },
  { value: "3×", label: "More leads" },
];

const CHAT_PREVIEW = [
  { role: "bot", text: "Hi! I'm the Digital Helper AI. Need a quote or want to book a call?" },
  { role: "user", text: "I need AC repair, it stopped working last night" },
  { role: "bot", text: "Got it — sounds urgent. I can get someone to you today. What's your address and best number?" },
];

export function HeroV2() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0f]">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
              </span>
              AI Automation for Service Businesses
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your Business.{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                Running on Autopilot.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl"
            >
              AI that answers leads, books jobs, and follows up — 24/7.
              While you&apos;re on the job, your AI is closing the next one.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 group"
              >
                Book a Free Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 text-white font-semibold text-base transition-all duration-200"
              >
                See Case Studies
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                    {stat.value}
                  </span>
                  <span className="text-xs text-zinc-500">{stat.label}</span>
                </div>
              ))}
              <div className="w-px h-10 bg-white/10 mx-2" />
              <p className="text-xs text-zinc-500 leading-relaxed">
                Powering<br />
                <span className="text-zinc-300 font-medium">12+ Tri-Cities businesses</span>
              </p>
            </motion.div>
          </div>

          {/* Right — Chat Demo */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-indigo-600/20 blur-3xl rounded-3xl scale-90" />

            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl">
              {/* Card header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-white/3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Digital Helper AI</p>
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      Online
                    </p>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-xs text-zinc-400">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  Powered by Claude AI
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-5 space-y-4 min-h-[240px]">
                {CHAT_PREVIEW.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.4, duration: 0.4 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-sm"
                          : "bg-white/8 text-zinc-200 rounded-bl-sm border border-white/8"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input bar */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-zinc-500 flex-1">Type a message...</p>
                  <button className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>

              {/* Bottom feature pills */}
              <div className="px-5 pb-4 flex flex-wrap gap-2">
                {["Lead Capture", "FAQ Answers", "Book Appointments"].map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs"
                  >
                    <Calendar className="w-3 h-3" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
