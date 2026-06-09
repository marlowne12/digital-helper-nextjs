interface Phase {
  verb: string;
  title: string;
  body: string;
}

const phases: Phase[] = [
  {
    verb: "Audit",
    title: "We start by listening, then by measuring.",
    body: "A full read of your site, your SEO, your tooling, and where the time is actually going. No template diagnosis. The deliverable is a short, honest doc with three things to fix and two to leave alone.",
  },
  {
    verb: "Build",
    title: "We ship in small, deliberate releases.",
    body: "Next.js for the site, n8n for the automation, GBP and content for the search work. You see something move every week. No vapor, no quarterly reveal.",
  },
  {
    verb: "Operate",
    title: "We stay on as the operator after launch.",
    body: "Monitoring, monthly tuning, and the small fixes that keep things running. You get one person who knows the whole stack instead of three vendors who each blame the others.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative w-full" style={{ backgroundColor: "var(--card)" }}>
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            How we work.
          </h2>
        </div>

        <ol className="flex flex-col">
          {phases.map((p, i) => (
            <li key={p.verb} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-12 md:py-16 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="md:col-span-3 flex items-baseline gap-4">
                <span
                  className="text-2xl md:text-3xl"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-geist-mono)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.verb}
                </span>
              </div>
              <div className="md:col-span-9 flex flex-col gap-3">
                <h3
                  className="text-lg md:text-xl"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-geist-mono)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>
                <p className="text-base leading-relaxed max-w-[65ch]" style={{ color: "var(--muted-foreground)" }}>
                  {p.body}
                </p>
              </div>
            </li>
          ))}
          <li className="border-t" style={{ borderColor: "var(--border)" }} aria-hidden />
        </ol>
      </div>
    </section>
  );
}
