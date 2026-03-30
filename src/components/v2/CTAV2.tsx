"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { storeExitIntentLead } from "@/app/actions/leads";

const BULLETS = [
  "Free 30-min strategy call",
  "No obligation, no pressure",
  "Custom AI demo for your business",
];

const PHONE_NUMBER = "(509) 876-8454";

export function CTAV2() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await storeExitIntentLead({
        email: trimmed,
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      });

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-violet-600/8 to-transparent p-8 sm:p-10 lg:p-16 overflow-hidden text-center"
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">Ready to automate?</p>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "var(--font-heading)" }}>
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

            {/* Inline email micro-form */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
                  noValidate
                >
                  <div className="flex-1 min-w-0">
                    <label htmlFor="cta-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      required
                      disabled={isSubmitting}
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.07] border border-white/12 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.1] transition-all disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm whitespace-nowrap transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-60 disabled:cursor-not-allowed group flex-shrink-0"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        Book Demo
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, type: "spring", damping: 18 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-indigo-400" />
                  </div>
                  <p className="text-white font-semibold text-lg">
                    Great! We&apos;ll reach out to schedule your demo.
                  </p>
                  <p className="text-zinc-400 text-sm">
                    Or call us now:{" "}
                    <a
                      href={`tel:${PHONE_NUMBER.replace(/\D/g, "")}`}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                    >
                      {PHONE_NUMBER}
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inline error */}
            {error && (
              <p className="mt-3 text-red-400 text-sm">{error}</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
