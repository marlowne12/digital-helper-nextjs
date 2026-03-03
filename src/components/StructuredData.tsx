export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Digital Helper Agency',
    description:
      'Digital Helper transforms outdated local business websites into modern, high-converting sites. Web design, SEO, and AI automation for Tri-Cities businesses.',
    url: 'https://digital-helper.com',
    telephone: '+15095550123',
    email: 'hello@digitalhelper.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Richland',
      addressRegion: 'WA',
      postalCode: '99352',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.2856,
      longitude: -119.2845,
    },
    areaServed: [
      { '@type': 'City', name: 'Richland, WA' },
      { '@type': 'City', name: 'Kennewick, WA' },
      { '@type': 'City', name: 'Pasco, WA' },
      { '@type': 'City', name: 'West Richland, WA' },
      { '@type': 'City', name: 'Benton City, WA' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
    },
    sameAs: ['https://maps.app.goo.gl/oywZxxYt9w3m1oCK9'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Design',
            description:
              'Custom modern website design and development for local businesses',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local SEO',
            description:
              'Search engine optimization for Tri-Cities businesses to rank on Google',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Automation',
            description:
              'AI chatbots, workflow automation, and lead generation for local businesses',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Digital Helper Agency',
    url: 'https://digital-helper.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://digital-helper.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQPageSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Digital Helper Agency',
      url: 'https://digital-helper.com',
      areaServed: [
        { '@type': 'City', name: 'Richland, WA' },
        { '@type': 'City', name: 'Kennewick, WA' },
        { '@type': 'City', name: 'Pasco, WA' },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessCitySchema({
  city,
  description,
  url,
}: {
  city: string
  description: string
  url: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Digital Helper Agency',
    description,
    url,
    telephone: '+15099875060',
    email: 'business@digital-helper.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: `${city}, WA` },
    provider: {
      '@type': 'ProfessionalService',
      name: 'Digital Helper Agency',
      url: 'https://digital-helper.com',
    },
  }

  const json = JSON.stringify(schema)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}

export function IndustryServiceSchema({
  industry,
  description,
  url,
  audience,
}: {
  industry: string
  description: string
  url: string
  audience: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Digital Marketing & Web Design for ${industry}`,
    description,
    url,
    audience: {
      '@type': 'Audience',
      audienceType: audience,
    },
    provider: {
      '@type': 'ProfessionalService',
      name: 'Digital Helper Agency',
      url: 'https://digital-helper.com',
      telephone: '+15099875060',
      email: 'business@digital-helper.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Richland',
        addressRegion: 'WA',
        postalCode: '99352',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Richland, WA' },
        { '@type': 'City', name: 'Kennewick, WA' },
        { '@type': 'City', name: 'Pasco, WA' },
        { '@type': 'City', name: 'West Richland, WA' },
      ],
    },
  }

  const json = JSON.stringify(schema)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
