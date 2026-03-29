import { Metadata } from 'next'
import Link from 'next/link'
import { FileText, CheckSquare, Clock, Download, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Resources | Digital Helper',
  description: 'Free guides, checklists, and tools to help local service businesses capture more leads with AI automation.',
  openGraph: {
    title: 'Free Resources | Digital Helper',
    description: 'Free guides, checklists, and tools for local service businesses.',
    type: 'website',
  },
}

const resources = [
  {
    id: 'guide',
    title: 'The 24/7 Lead Machine',
    subtitle: 'How AI Captures Leads While You Sleep',
    description:
      'Learn why 78% of customers choose the first business to respond, and how AI can make that business yours — even at 3am.',
    icon: FileText,
    color: 'from-cyan-500 to-blue-600',
    highlights: [
      'The 78% first-responder advantage',
      'Real $47K case study breakdown',
      'Ready-to-use 3am scripts',
      '30-minute setup guide',
    ],
    downloadUrl: '/api/downloads/24-7-lead-machine-guide.pdf',
    pages: 4,
  },
  {
    id: 'checklist',
    title: 'AI Readiness Checklist',
    subtitle: 'Is Your Business Ready for 24/7 AI?',
    description:
      'An 8-point assessment to determine if your business is ready for AI lead capture, plus a scoring system to prioritize next steps.',
    icon: CheckSquare,
    color: 'from-emerald-500 to-teal-600',
    highlights: [
      '8 readiness criteria',
      'Self-scoring system',
      'Priority recommendations',
      'Quick 5-minute assessment',
    ],
    downloadUrl: '/api/downloads/ai-readiness-checklist.pdf',
    pages: 2,
  },
  {
    id: 'audit',
    title: 'Response Time Audit',
    subtitle: 'How Fast Are You Losing Leads?',
    description:
      'Calculate exactly how much revenue you\'re losing to slow response times with this fill-in-the-blank audit worksheet.',
    icon: Clock,
    color: 'from-amber-500 to-orange-600',
    highlights: [
      'Revenue loss calculator',
      'Response time benchmarks',
      '90-day recovery timeline',
      'ROI projection worksheet',
    ],
    downloadUrl: '/api/downloads/response-time-audit.pdf',
    pages: 2,
  },
]

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Free Resources
          </span>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Tools to Capture More Leads
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Free guides, checklists, and calculators designed specifically for local 
            service businesses. No email required — just click and download.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => {
              const Icon = resource.icon
              return (
                <article
                  key={resource.id}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  {/* Header */}
                  <div
                    className={`bg-gradient-to-br ${resource.color} p-6 text-white`}
                  >
                    <Icon className="mb-4 h-10 w-10 opacity-90" />
                    <h2 className="mb-2 text-xl font-bold">{resource.title}</h2>
                    <p className="text-sm opacity-90">{resource.subtitle}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="mb-4 text-sm text-slate-600">
                      {resource.description}
                    </p>

                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      What&apos;s Inside
                    </h3>
                    <ul className="mb-6 space-y-2">
                      {resource.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-slate-700"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs text-slate-500">
                        {resource.pages} pages • PDF
                      </span>
                      <a
                        href={resource.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-600"
                      >
                        <Download className="h-4 w-4" />
                        Download
                        <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Ready for Your Custom Strategy?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
            These resources are a great start. But nothing beats a personalized 
            plan built specifically for your business.
          </p>
          <Link
            href="/contact?utm_source=resources&utm_medium=cta"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-cyan-500/25"
          >
            Book Free Strategy Call
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Free Resources | Digital Helper',
            description:
              'Free guides, checklists, and tools for local service businesses.',
            url: 'https://digital-helper.com/resources',
            mainEntity: resources.map((r) => ({
              '@type': 'DigitalDocument',
              name: r.title,
              description: r.description,
              url: `https://digital-helper.com${r.downloadUrl}`,
              fileFormat: 'application/pdf',
            })),
          }),
        }}
      />
    </main>
  )
}
