import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { BUSINESS_INFO } from "@/lib/business-info"

export const metadata: Metadata = {
  title: "Web Design & AI Automation in Pasco, WA | Digital Helper",
  description: "Digital Helper helps Pasco businesses build modern websites and deploy AI automation to capture Tri-Cities' fastest-growing market. Local expertise, real results.",
  keywords: [
    "web design pasco wa",
    "ai automation pasco",
    "website design pasco washington",
    "pasco web developer",
    "digital marketing pasco wa",
  ],
  alternates: { canonical: "https://digital-helper.com/pasco-wa" },
  openGraph: {
    title: "Web Design & AI Automation in Pasco, WA | Digital Helper",
    description: "Modern websites and AI automation for Pasco's fast-growing business market. Built to rank, built to convert.",
    url: "https://digital-helper.com/pasco-wa",
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
    addressLocality: "Pasco",
    addressRegion: "WA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.2396,
    longitude: -119.0987,
  },
  areaServed: {
    "@type": "City",
    name: "Pasco",
    sameAs: "https://en.wikipedia.org/wiki/Pasco,_Washington",
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

export default function PascoWAPage() {
  return (
    <>
      <Script
        id="pasco-wa-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background-primary text-white pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* Hero */}
          <div className="mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-medium mb-6 uppercase tracking-wider">
              Pasco, WA
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Web Design & AI Automation<br />
              <span className="text-gradient">in Pasco, WA</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
              Pasco is the fastest-growing city in the Tri-Cities — and the most competitive for businesses trying to stand out online. From Road 68 to the Riverview corridor, new businesses are launching every month. We help established and growing Pasco businesses build websites that rank on Google and automation systems that handle the work behind the scenes.
            </p>
          </div>

          {/* Services */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">What We Build for Pasco Businesses</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Web Design",
                  desc: "Modern websites designed to convert Pasco visitors into real leads. Fast, mobile-first, and built around what your customers search for.",
                  href: "/services/web-design",
                },
                {
                  title: "AI Automation",
                  desc: "Automated lead capture, follow-up, and scheduling workflows that keep your pipeline moving without extra staff or manual effort.",
                  href: "/services/ai-automation",
                },
                {
                  title: "Local SEO",
                  desc: "Get found when Pasco customers search for your services. We optimize for local keywords, Google Business Profile, and Tri-Cities map rankings.",
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
              Ready to Stand Out in Pasco?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto relative z-10">
              Book a free strategy call. We&apos;ll audit your current online presence, map out the biggest growth opportunities in the Pasco market, and tell you exactly what we&apos;d do differently.
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
