"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { BUSINESS_INFO } from "@/lib/business-info";

const GOAL_TO_SERVICE = {
  website: "web-design",
  leads: "lead-generation",
  automation: "ai-automation",
  unsure: "custom",
} as const;
type Goal = keyof typeof GOAL_TO_SERVICE;

const CHECK = (
  <svg className="check-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="m3 8.5 3 3 7-7" />
  </svg>
);

export function ContactForm() {
  const goalRef = useRef<HTMLSelectElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const g = new URLSearchParams(window.location.search).get("goal");
    if (g && g in GOAL_TO_SERVICE && goalRef.current) goalRef.current.value = g;
  }, []);

  useEffect(() => {
    if (state === "sent" || state === "error") statusRef.current?.focus();
  }, [state]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const next: Record<string, string> = {};
    const fullName = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    if (fullName.length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLInputElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    const business = String(fd.get("business") || "").trim();
    const wantsMockup = fd.get("mockup") === "on";
    const goal = (String(fd.get("goal") || "website") as Goal) in GOAL_TO_SERVICE ? (String(fd.get("goal")) as Goal) : "website";
    const goalLabel = goalRef.current?.selectedOptions[0]?.text || goal;
    const message = [
      `Website contact form. Goal: ${goalLabel}.${business ? ` Business: ${business}.` : ""}`,
      wantsMockup ? "Wants a free homepage mockup: yes." : "",
      String(fd.get("message") || "").trim(),
    ].filter(Boolean).join("\n\n");

    setState("sending");
    try {
      const res = await fetch("/api/notion-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone: String(fd.get("phone") || "").trim() || undefined,
          company: business || undefined,
          service: GOAL_TO_SERVICE[goal],
          message,
          honeypot: String(fd.get("website_url") || ""),
        }),
      });
      const json = await res.json().catch(() => ({ success: false }));
      if (json.success) { setState("sent"); form.reset(); }
      else setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <h3>Send a message</h3>
      <p className="form-lede">A few details help me come to the call prepared.</p>
      <div className="field">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
        {errors.name && <span className="field-err" id="e-name">{errors.name}</span>}
      </div>
      <div className="field">
        <label htmlFor="f-biz">Business name</label>
        <input id="f-biz" name="business" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input id="f-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
        {errors.email && <span className="field-err" id="e-email">{errors.email}</span>}
      </div>
      <div className="field">
        <label htmlFor="f-phone">Phone <small>(optional)</small></label>
        <input id="f-phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="field full">
        <label htmlFor="goal">What would help most?</label>
        <select id="goal" name="goal" defaultValue="website" ref={goalRef}>
          <option value="website">Improve my website</option>
          <option value="leads">Find more customers</option>
          <option value="automation">Save my team time</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </div>
      <div className="field full">
        <label htmlFor="f-msg">Anything else? <small>(optional)</small></label>
        <textarea id="f-msg" name="message" placeholder="Your website address, the services you want more of, what's been frustrating" />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-hp">Leave this empty</label>
        <input id="f-hp" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="check">
        <input type="checkbox" name="mockup" defaultChecked />
        <span><b>Send me a free homepage mockup</b>See what your new homepage could look like before you pay anything.</span>
      </label>
      <button className="btn btn-primary" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send message"} <span className="arr" aria-hidden="true">↗</span>
      </button>
      <p className="form-note">I&apos;ll only use your details to reply to you. No mailing lists.</p>
      {state === "sent" && (
        <div className="sent" role="status" tabIndex={-1} ref={statusRef}>
          {CHECK} Thanks. Your message is in, and I&apos;ll reply within one business day.
        </div>
      )}
      {state === "error" && (
        <div className="form-error" role="alert" tabIndex={-1} ref={statusRef}>
          That didn&apos;t send. Please call or text {BUSINESS_INFO.phone}, or email {BUSINESS_INFO.email}.
        </div>
      )}
    </form>
  );
}
