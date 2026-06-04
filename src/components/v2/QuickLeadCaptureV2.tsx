"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, Shield, Zap } from "lucide-react";

const BUSINESS_TYPES = [
  { value: "", label: "Select your business type" },
  { value: "HVAC", label: "HVAC" },
  { value: "Plumbing", label: "Plumbing" },
  { value: "Landscaping", label: "Landscaping" },
  { value: "Restaurant", label: "Restaurant" },
  { value: "Retail", label: "Retail" },
  { value: "Other", label: "Other" },
];

const TRUST_SIGNALS = [
  { icon: Clock, label: "Response within 1 hour" },
  { icon: Shield, label: "No sales pressure" },
  { icon: Zap, label: "Free custom demo" },
];

export function QuickLeadCaptureV2() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name.trim(),
          email: `${phone.trim().replace(/\D/g, "")}@quicklead.form`,
          phone: phone.trim(),
          service: "ai-automation",
          message: `Quick lead from homepage capture. Business type: ${businessType || "Not specified"}`,
          honeypot: "",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative rounded-3xl border border-indigo-500/20 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/12 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-violet-600/8 blur-3xl rounded-full pointer-events-none" />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="text-center mb-10">
                    <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
                      Free AI Demo
                    </p>
                    <h2
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Get Your Free AI Demo
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                      Tell us about your business and we&apos;ll show you exactly how AI can help — no pitch, just value.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="qlc-name" className="sr-only">
                          Your Name
                        </label>
                        <input
                          id="qlc-name"
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError("");
                          }}
                          required
                          disabled={isSubmitting}
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08] transition-all disabled:opacity-50"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="qlc-phone" className="sr-only">
                          Phone Number
                        </label>
                        <input
                          id="qlc-phone"
                          type="tel"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (error) setError("");
                          }}
                          required
                          disabled={isSubmitting}
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08] transition-all disabled:opacity-50"
                        />
                      </div>

                      {/* Business Type */}
                      <div>
                        <label htmlFor="qlc-business" className="sr-only">
                          Business Type
                        </label>
                        <select
                          id="qlc-business"
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          disabled={isSubmitting}
                          className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.08] transition-all disabled:opacity-50 appearance-none cursor-pointer"
                          style={{ color: businessType ? "#ffffff" : "#71717a" }}
                        >
                          {BUSINESS_TYPES.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              style={{ background: "#0f0f1a", color: "#ffffff" }}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="text-red-400 text-sm text-center mb-4">{error}</p>
                    )}

                    {/* Submit */}
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 min-h-[48px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-60 disabled:cursor-not-allowed group"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Booking...
                          </>
                        ) : (
                          <>
                            Book My Free Demo
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Trust signals */}
                  <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-8">
                    {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2 text-sm text-zinc-400">
                        <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        {label}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", damping: 20 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-8 h-8 text-indigo-400" />
                  </motion.div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    We&apos;ll call you within 1 hour
                  </h3>
                  <p className="text-zinc-400 text-base max-w-sm mx-auto">
                    Mon–Fri, 9am–6pm PST. Get ready to see exactly what AI automation can do for your business.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
