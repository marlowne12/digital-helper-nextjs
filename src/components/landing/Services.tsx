import Link from "next/link";

interface Service {
  label: string;
  title: string;
  body: string;
  href: string;
  detail: string;
}

const services: Service[] = [
  {
    label: "Web",
    title: "Fast sites that actually convert.",
    body: "Next.js 16, App Router, edge-rendered. Built to load in under a second and rank for the queries your customers actually use.",
    href: "/web-design",
    detail: "Next.js, App Router, 95+ Lighthouse",
  },
  {
    label: "SEO",
    title: "Local SEO that compounds.",
    body: "Tri-Cities geo work, technical audits, GBP optimization, and content built for the way people in Richland, Kennewick, and Pasco actually search.",
    href: "/seo",
    detail: "Local, technical, Google Business Profile",
  },
  {
    label: "Automation",
    title: "AI workflows that hold up in production.",
    body: "n8n pipelines, lead-qual chatbots, custom agents. Real automation that survives Monday morning, not a demo.",
    href: "/ai-agency",
    detail: "n8n, custom agents, voice AI",
  },
  {
    label: "Operations",
    title: "The unglamorous work that keeps it moving.",
    body: "Reporting dashboards, CRM glue, billing integrations, and the dozen small fixes nobody else wants to own.",
    href: "/services",
    detail: "CRM, reporting, glue code",
  },
];

export function Services() {
  return (
    <section className="relative w-full" style={{ backgroundColor: "var(--background)" }}>
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
            What we run for you.
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            Four practices, one operator. Pick one, pick all four, or talk to us about
            the thing in your business nobody else has been able to fix.
          </p>
        </div>

        {/* 2-column asymmetric grid: tile 1 spans wider, tiles 2-4 stack right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
          {services.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="group flex flex-col gap-4 p-8 md:p-10 transition-colors duration-200"
              style={{ backgroundColor: "var(--background)" }}
            >
              <span
                className="text-xs uppercase tracking-[0.18em]"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-mono)" }}
              >
                {s.label}
              </span>
              <h3
                className="text-xl md:text-2xl"
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-geist-mono)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {s.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed max-w-[55ch]" style={{ color: "var(--muted-foreground)" }}>
                {s.body}
              </p>
              <div
                className="mt-auto text-xs tracking-wider"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-geist-mono)" }}
              >
                {s.detail}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
