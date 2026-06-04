"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { storeExitIntentLead } from "@/app/actions/leads";

const BULLETS = [
  "Free 30-min strategy call",
  "No obligation, zero pressure",
  "Custom AI workflow demo",
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
    <section className="overflow-hidden bg-[#090a0c] text-white py-24 md:py-32 border-t border-white/10 relative">
      
      {/* Axiom Breathing Light Beam Overlay */}
      <div 
        className="absolute top-[10%] left-[-15%] w-[70vw] h-[220px] -rotate-[160deg] z-0 pointer-events-none animate-[beam-breathe_8s_ease-in-out_infinite]"
        style={{
          background: "linear-gradient(90deg, rgba(255, 137, 100, 0.12) 0%, rgba(59, 130, 246, 0.06) 50%, transparent 100%)",
        }}
      />
      <div 
        className="absolute bottom-[10%] right-[-15%] w-[60vw] h-[200px] rotate-[20deg] z-0 pointer-events-none animate-[beam-breathe_10s_ease-in-out_infinite]"
        style={{
          background: "linear-gradient(90deg, rgba(59, 130, 246, 0.08) 0%, rgba(255, 137, 100, 0.06) 50%, transparent 100%)",
        }}
      />

      <div className="max-w-[80rem] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[30px] border border-white/10 bg-[#0d0e12]/80 backdrop-blur-2xl p-8 sm:p-12 lg:p-20 overflow-hidden text-center shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="agency-eyebrow inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#ff8964] mb-6 border border-[#ff8964]/20 bg-[#ff8964]/5">
              Launch Program
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-none text-white tracking-tighter mb-6 text-balance">
              Build your next
              <br />
              <span className="text-[#95979e]">digital presence</span>
            </h2>
            
            <p className="text-[#95979e] leading-relaxed font-light text-base md:text-lg mb-8 max-w-xl mx-auto">
              We design premium digital interfaces and engineer AI workflows to transform how local service businesses capture leads and schedule jobs.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {BULLETS.map((b) => (
                <div key={b} className="flex items-center gap-2 text-xs sm:text-sm text-[#95979e] font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#ff8964] flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>

            {/* Inline Email Submission Form */}
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
                    <input
                      id="cta-email"
                      type="email"
                      placeholder="Enter your business email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      required
                      disabled={isSubmitting}
                      className="w-full h-12 px-5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-zinc-500 text-xs focus:outline-none focus:border-[#ff8964]/50 focus:bg-white/[0.08] transition-all disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 h-12 rounded-xl bg-gradient-to-r from-[#ff8964] to-orange-400 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-[#ff8964]/25 disabled:opacity-60 disabled:cursor-not-allowed group flex-shrink-0 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Book Free Demo
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
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
                  <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[#ff8964]" />
                  </div>
                  <p className="text-white font-medium text-base sm:text-lg">
                    Perfect. Our system engineers will reach out to schedule your demo.
                  </p>
                  <p className="text-[#95979e] text-xs font-light">
                    Want immediate booking? Call us:{" "}
                    <a
                      href={`tel:${PHONE_NUMBER.replace(/\D/g, "")}`}
                      className="text-white hover:text-[#ff8964] font-semibold transition-colors flex inline-flex items-center gap-1.5 ml-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {PHONE_NUMBER}
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Error Display */}
            {error && (
              <p className="mt-3 text-red-400 text-xs font-medium">{error}</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
