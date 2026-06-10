import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { BUSINESS_INFO } from "@/lib/business-info"

export const metadata: Metadata = {
  title: "Web Design & AI Automation in Kennewick, WA | Digital Helper",
  description: "Digital Helper builds fast, conversion-focused websites and AI automation systems for Kennewick businesses. Get found online and turn visitors into customers.",
  keywords: [
    "web design kennewick wa",
    "ai automation kennewick",
    "website design kennewick washington",
    "kennewick web developer",
    "digital marketing kennewick",
  ],
  alternates: { canonical: "https://digital-helper.com/kennewick-wa" },
  openGraph: {
    title: "Web Design & AI Automation in Kennewick, WA | Digital Helper",
    description: "Fast websites and AI automation built for Kennewick businesses. Local expertise, real results.",
    url: "https://digital-helper.com/kennewick-wa",
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
    addressLocality: "Kennewick",
    addressRegion: "WA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.2113,
    longitude: -119.1372,
  },
  areaServed: {
    "@type": "City",
    name: "Kennewick",
    sameAs: "https://en.wikipedia.org/wiki/Kennewick,_Washington",
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

export default function KennewickWAPage() {
  return (
    <>
      <Script
        id="kennewick-wa-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background-primary text-white pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* Hero */}
          <div className="mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-medium mb-6 uppercase tracking-wider">
              Kennewick, WA
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Web Design & AI Automation<br />
              <span className="text-gradient">in Kennewick, WA</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
              Kennewick is the commercial core of the Tri-Cities — from Columbia Center to the waterfront, competition for local customers is real. We build high-performance websites and deploy AI automation tools that help Kennewick businesses rank higher, respond faster, and convert more visitors into paying customers.
            </p>
          </div>

          {/* Services */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">What We Build for Kennewick Businesses</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Web Design",
                  desc: "Fast, mobile-first websites built to convert. No templates — designed around how Kennewick customers actually search and decide.",
                  href: "/services/web-design",
                },
                {
                  title: "AI Automation",
                  desc: "Automate your follow-up, lead intake, and customer communication so your business runs smarter without more headcount.",
                  href: "/services/ai-automation",
                },
                {
                  title: "Local SEO",
                  desc: "Rank for 'web design Kennewick' and your core service keywords. We optimize your site and Google Business Profile for Tri-Cities searches.",
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
          <div className="bg-charcoal rounded-3xl p-12 border border-steel/40 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Grow Your Kennewick Business?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              Book a free strategy call. We&apos;ll review your current site, identify your biggest growth opportunities in the Kennewick market, and show you exactly what we&apos;d build.
            </p>
            <Link
              href="/booking"
              className="btn-primary inline-flex items-center gap-2 h-14 px-10 text-lg rounded-full"
            >
              Book a Free Strategy Call
            </Link>
          </div>

        </div>
      </main>
    </>
  )
}
