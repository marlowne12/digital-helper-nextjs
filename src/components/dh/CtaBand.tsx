"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { BUSINESS_INFO } from "@/lib/business-info";

export function CtaBand({ heading, text }: { heading: ReactNode; text: string }) {
  const [label, setLabel] = useState("Copy");

  async function copy() {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.email);
      setLabel("Copied");
      setTimeout(() => setLabel("Copy"), 1600);
    } catch {
      setLabel("Select it");
    }
  }

  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <div>
          <h2>{heading}</h2>
        </div>
        <div className="cta-side">
          <p>{text}</p>
          <Link className="btn" href="/contact">
            Book a free diagnostic <span className="arr" aria-hidden="true">↗</span>
          </Link>
          <div className="mailrow">
            Or call <code>{BUSINESS_INFO.phone}</code> · email <code>{BUSINESS_INFO.email}</code>{" "}
            <button className="copy" type="button" onClick={copy}>
              {label}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
