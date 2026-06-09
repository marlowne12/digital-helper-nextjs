import Link from "next/link";
import { DigitalHelperMark } from "@/brand";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-24 md:pb-32 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center min-h-[100dvh]">
        {/* Left: editorial copy + CTAs */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <span
            className="text-xs uppercase tracking-[0.18em]"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-mono)" }}
          >
            Tri-Cities WA · Richland / Kennewick / Pasco
          </span>

          <h1
            className="text-balance"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
            }}
          >
            Keep it moving.
          </h1>

          <p
            className="max-w-[58ch] text-lg md:text-xl leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            We build the websites, SEO, and AI workflows that route your business&apos;s
            digital signal end to end. Operator-grade. No fluff.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/booking" className="btn-primary">
              Book a Strategy Call
            </Link>
            <Link
              href="/work"
              className="text-sm tracking-wide inline-flex items-center gap-2 transition-colors duration-200"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-geist-mono)" }}
            >
              See selected work
              <span style={{ color: "var(--muted-foreground)" }}>→</span>
            </Link>
          </div>
        </div>

        {/* Right: the mark, oversized and centered as the hero visual */}
        <div className="lg:col-span-5 mt-16 lg:mt-0 flex items-center justify-center">
          <div className="relative">
            <DigitalHelperMark variant="dark" size={360} />
          </div>
        </div>
      </div>

      {/* Hairline footer rule */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="hairline" />
      </div>
    </section>
  );
}
