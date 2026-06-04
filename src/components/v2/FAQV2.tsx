"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Bookmark, History, Share2 } from "lucide-react";

const FAQ_ITEMS = [
  {
    id: "launch",
    question: "AI Chatbot deployment speed",
    answer: "Most clients are live within 5–7 business days. We handle the entire system design, data ingestion, testing, and CRM integration — you just provide context about your business operations.",
  },
  {
    id: "booking",
    question: "Direct booking capabilities",
    answer: "Our AI systems do both. They capture customer information (name, address, telephone, scope) and can drop scheduling links dynamically in-chat so prospects book directly into your calendar without back-and-forth email delays.",
  },
  {
    id: "unresolved",
    question: "Handling unresolved questions",
    answer: "When the AI agent encounters an inquiry outside of its trained knowledge base, it gracefully explains that it will connect the client with a human specialist, then instantly forwards the full conversation transcript to your email or CRM.",
  },
  {
    id: "install",
    question: "Installation on existing sites",
    answer: "Completely seamless. The chatbot runs as a lightweight, optimized script tag that works with any modern web stack, CMS, or website builder (including WordPress, Webflow, Squarespace, and custom Next.js apps) in under 5 minutes.",
  },
  {
    id: "pricing",
    question: "Licensing and support costs",
    answer: "AI chatbot management starts at $97/month with a one-time onboarding setup. We offer scalable packages that bundle premium web design, SEO management, and custom automations with zero long-term contract lock-ins.",
  },
  {
    id: "niches",
    question: "Supported industries & niches",
    answer: "We specialize in service businesses (HVAC, plumbing, electrical, landscaping, law firms, dental offices) that rely on appointments and phone calls. If your business depends on capturing and scheduling leads, we can automate it.",
  },
];

export function FAQV2() {
  const [activeId, setActiveId] = useState(FAQ_ITEMS[0].id);
  const activeFaq = FAQ_ITEMS.find((item) => item.id === activeId) || FAQ_ITEMS[0];

  return (
    <section className="overflow-hidden bg-[#090a0c] text-white py-24 md:py-32 border-t border-white/10 relative">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#ff8964]/5 blur-[100px]" />
      </div>

      <div className="max-w-[80rem] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - 40% Width - Brand Context */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-24">
            <div className="agency-eyebrow inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#ff8964] mb-6 border border-[#ff8964]/20 bg-[#ff8964]/5">
              Knowledge Hub
            </div>
            
            <h2 className="text-4xl md:text-5xl font-normal leading-tight text-white tracking-tighter mb-6 text-balance">
              Knowledge that
              <br />
              <span className="text-[#95979e]">powers every system.</span>
            </h2>
            
            <p className="text-[#95979e] leading-relaxed font-light text-base mb-8">
              We compile, document, and structure every system FAQ, brief, and project delivery requirement. Explore our interactive knowledge base to find answers to common questions about our build pipeline.
            </p>

            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#ff8964] transition-colors"
            >
              Book a live consultation
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column - 60% Width - Interactive Document Reader Mockup */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row bg-[#0d0e12] border border-white/10 rounded-[20px] overflow-hidden min-h-[420px] shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
            
            {/* Mock Sidebar (Doc Index) */}
            <div className="w-full sm:w-64 bg-[#090a0d] border-b sm:border-b-0 sm:border-r border-white/5 p-4 flex flex-col shrink-0">
              <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Documents</span>
              </div>
              
              <div className="space-y-1 flex-1">
                {FAQ_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      activeId === item.id
                        ? "bg-white/5 text-white font-medium border border-white/10"
                        : "text-zinc-500 hover:text-white hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    <Bookmark className={`w-3 h-3 ${activeId === item.id ? "text-[#ff8964] fill-current" : "text-zinc-600"}`} />
                    <span className="truncate">{item.question}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mock Editor Workspace */}
            <div className="flex-grow p-6 flex flex-col bg-[#111112]">
              
              {/* Editor Header Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                  <span className="text-[#ff8964]">FAQ</span>
                  <span>/</span>
                  <span className="truncate text-white/80">{activeFaq.question}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    <History className="w-3.5 h-3.5" />
                  </button>
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic Answer Block */}
              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-medium text-white tracking-tight">
                      {activeFaq.question}
                    </h3>
                    <p className="text-[#95979e] text-sm leading-relaxed font-light">
                      {activeFaq.answer}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Editor bottom status bar */}
              <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-[10px] text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Auto-saved to Cloud
                </span>
                <span>UTF-8 • Markdown</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
