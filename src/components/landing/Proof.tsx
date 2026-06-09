export function Proof() {
  return (
    <section className="relative w-full" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-5">
          <span
            className="text-xs uppercase tracking-[0.18em]"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-mono)" }}
          >
            On record
          </span>
          <p
            className="mt-6 text-2xl md:text-3xl leading-snug"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            &ldquo;They rebuilt our site, fixed our SEO, and put a chatbot in front of
            the after-hours calls. We stopped losing leads at 9pm.&rdquo;
          </p>
          <div
            className="mt-8 text-sm"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-mono)" }}
          >
            <span style={{ color: "var(--foreground)" }}>Tri-Cities service business owner</span>
            <span className="ml-3 opacity-60">2025</span>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
          {[
            { metric: "< 1s", label: "Time-to-interactive on rebuilt sites", emphasize: true },
            { metric: "24/7", label: "Lead capture, after hours included", emphasize: false },
            { metric: "3 cities", label: "Richland / Kennewick / Pasco", emphasize: false },
            { metric: "1 operator", label: "One person owns the whole stack", emphasize: false },
          ].map((cell) => (
            <div
              key={cell.label}
              className="p-8 md:p-10 flex flex-col gap-4"
              style={{ backgroundColor: "var(--background)" }}
            >
              <div
                className="text-3xl md:text-4xl"
                style={{
                  color: cell.emphasize ? "var(--primary)" : "var(--foreground)",
                  fontFamily: "var(--font-geist-mono)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {cell.metric}
              </div>
              <div className="text-sm leading-snug" style={{ color: "var(--muted-foreground)" }}>
                {cell.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
