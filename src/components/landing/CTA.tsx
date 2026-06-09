import Link from "next/link";
import { DigitalHelperMonogram } from "@/brand";

export function CTA() {
  return (
    <section className="relative w-full" style={{ backgroundColor: "var(--card)" }}>
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center gap-10">
        <DigitalHelperMonogram variant="dark" size={96} />

        <h2
          className="max-w-3xl text-balance"
          style={{
            color: "var(--foreground)",
            fontFamily: "var(--font-geist-mono)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Ready to keep it moving?
        </h2>

        <p className="max-w-2xl text-lg leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          Book a 30-minute strategy call. We&apos;ll look at your site, your SEO, and one
          thing in your business that should already be automated. No deck. No pitch.
        </p>

        <Link href="/booking" className="btn-primary">
          Book a Strategy Call
        </Link>
      </div>
    </section>
  );
}
