import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { BUSINESS_INFO } from "@/lib/business-info"

export const metadata: Metadata = {
  title: "Web Design & AI Automation in Richland, WA | Digital Helper",
  description: "Digital Helper is based in Richland, WA. We build fast websites and AI automation systems that help Richland businesses get found and grow without adding overhead.",
  keywords: [
    "web design richland wa",
    "ai automation richland",
    "website design richland washington",
    "richland web developer",
    "digital marketing richland wa",
  ],
  alternates: { canonical: "https://digital-helper.com/richland-wa" },
  openGraph: {
    title: "Web Design & AI Automation in Richland, WA | Digital Helper",
    description: "Richland's local web design and AI automation agency. We build high-performance websites that turn visitors into customers.",
    url: "https://digital-helper.com/richland-wa",
    images: ["/og-image.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS_INFO.name,
  telephone: BUSINESS_INFO.phone,
  email: BUSINESS_INFO.email,
  url: BUSINESS_INFO.urls.website,
  image: `${BUSINESS_INFO.urls.website}/logo.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Richland",
    addressRegion: "WA",
    postalCode: "99352",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.2857,
    longitude: -119.2845,
  },
  areaServed: {
    "@type": "City",
    name: "Richland",
    sameAs: "https://en.wikipedia.org/wiki/Richland,_Washington",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local SEO" } },
    ],
  },
}

export default function RichlandWAPage() {
  return (
    <>
      <Script
        id="richland-wa-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background-primary text-white pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* Hero */}
          <div className="mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-medium mb-6 uppercase tracking-wider">
              Richland, WA — Our Home Base
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Web Design & AI Automation<br />
              <span className="text-gradient">in Richland, WA</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
              We&apos;re a Richland-based agency — the Atomic City is where we live and work. From Queensgate to Uptown, we understand how Richland customers search and what makes them choose a local business. We build websites that rank and automation systems that let you scale without burning out.
            </p>
          </div>

          {/* Services */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">What We Build for Richland Businesses</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Web Design",
                  desc: "Clean, conversion-focused websites built for speed. We design around how Richland customers discover local services — on mobile, on Google Maps, on their phones.",
                  href: "/services/web-design",
                },
                {
                  title: "AI Automation",
                  desc: "Automate lead follow-up, appointment scheduling, and customer communication. Spend less time on admin, more time on work that grows your business.",
                  href: "/services/ai-automation",
                },
                {
                  title: "Local SEO",
                  desc: "Show up when Richland residents search for your services. We optimize for Tri-Cities keywords, Google Business Profile, and local map rankings.",
                  href: "/services/seo",
                },
              ].map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-accent-primary/30 transition-colors group"
                >
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-accent-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass rounded-3xl p-12 border border-white/5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-accent-gradient opacity-5" />
            <h2 className="text-3xl font-bold mb-4 relative z-10">
              Let&apos;s Talk About Your Richland Business
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto relative z-10">
              Book a free strategy call with a Richland-based team that knows your market. We&apos;ll look at your current site, map out what&apos;s holding you back, and show you what we&apos;d build.
            </p>
            <Link
              href="/booking"
              className="btn-primary inline-flex items-center gap-2 h-14 px-10 text-lg rounded-full relative z-10"
            >
              Book a Free Strategy Call
            </Link>
          </div>

        </div>
      </main>
    </>
  )
}
