"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "How quickly can you get the AI chatbot live?",
    answer:
      "Most clients are live within 5–7 business days. We handle the setup, training, and integration — you just answer a few questions about your business.",
  },
  {
    question: "Does the AI actually book appointments or just collect info?",
    answer:
      "Both. It captures lead info and can drop a Calendly booking link directly in the chat so customers schedule on the spot — no back and forth.",
  },
  {
    question: "What happens when the AI doesn't know the answer?",
    answer:
      "It gracefully says it will connect the customer with your team and sends you an immediate email alert with the full conversation.",
  },
  {
    question: "Can I use this if I already have a website?",
    answer:
      "Yes — the chatbot is a single script tag that installs on any website in under 5 minutes, whether it's WordPress, Wix, Squarespace, or custom built.",
  },
  {
    question: "How much does it cost?",
    answer:
      "The AI chatbot service starts at $97/month with a one-time setup fee. We also offer web design, SEO, and full-service packages. Book a call and we'll find the right fit.",
  },
  {
    question: "Do you only work with HVAC businesses?",
    answer:
      "We specialize in local service businesses — HVAC, plumbers, electricians, landscapers, law firms, and more. If you book appointments and take calls, we can automate your lead flow.",
  },
];

export function FAQV2() {
  return (
    <section className="py-24 bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Everything you need to know.
            <br />
            <span className="text-zinc-500">Common questions.</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">

          {/* Left — Accordion (2/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-white/[0.08] last:border-b-0"
                >
                  <AccordionTrigger className="py-5 text-base font-medium text-white hover:no-underline hover:text-indigo-300 transition-colors text-left [&[data-state=open]]:text-indigo-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-zinc-400 leading-relaxed text-sm">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Right — CTA Card (1/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-1"
          >
            <div className="relative p-7 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent sticky top-8">
              {/* Subtle glow */}
              <div className="absolute inset-0 rounded-2xl bg-indigo-600/5 blur-xl" />

              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-5">
                  <Phone className="w-5 h-5 text-indigo-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Still have questions?
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  We&apos;re happy to walk you through exactly how it works for your type of business — no pressure, no sales pitch.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 group"
                >
                  Book a free 30-min call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <p className="text-xs text-zinc-600 text-center mt-4">No commitment required</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
