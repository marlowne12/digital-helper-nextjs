import { MetadataRoute } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/blog'

const baseUrl = 'https://digital-helper.com'

/**
 * Canonical sitemap for digital-helper.com.
 *
 * Excludes: /admin/*, internal tooling (/redesign, /seo-research), and routes
 * that 301-redirect to a canonical URL (see next.config.ts redirects):
 *   /services/web-design -> /web-design
 *   /services/seo        -> /seo
 *   /services/ai-automation -> /ai-agency
 *   /work/case-studies   -> /case-studies
 *   /locations/{richland,kennewick,pasco} -> /{city}-wa
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '', priority: 1.0, freq: 'weekly' },

    // Core service pillars (canonical short URLs)
    { path: 'web-design', priority: 0.9, freq: 'monthly' },
    { path: 'seo', priority: 0.9, freq: 'monthly' },
    { path: 'ai-agency', priority: 0.9, freq: 'monthly' },

    // Service hub + sub-services
    { path: 'services', priority: 0.7, freq: 'monthly' },
    { path: 'services/seo/local-seo', priority: 0.8, freq: 'monthly' },
    { path: 'services/seo/google-business-profile', priority: 0.8, freq: 'monthly' },
    { path: 'services/ai-automation/chatbots', priority: 0.8, freq: 'monthly' },
    { path: 'services/ai-automation/voice-ai', priority: 0.8, freq: 'monthly' },
    { path: 'services/ai-automation/workflow-automation', priority: 0.8, freq: 'monthly' },
    { path: 'services/lead-generation', priority: 0.8, freq: 'monthly' },
    { path: 'services/reputation-management', priority: 0.8, freq: 'monthly' },

    // Location pages (canonical: keyword-targeted *-wa variants)
    { path: 'richland-wa', priority: 0.8, freq: 'monthly' },
    { path: 'kennewick-wa', priority: 0.8, freq: 'monthly' },
    { path: 'pasco-wa', priority: 0.8, freq: 'monthly' },
    { path: 'locations', priority: 0.6, freq: 'monthly' },
    { path: 'locations/west-richland', priority: 0.7, freq: 'monthly' },

    // Industry pages
    { path: 'industries', priority: 0.6, freq: 'monthly' },
    { path: 'industries/agriculture', priority: 0.7, freq: 'monthly' },
    { path: 'industries/healthcare', priority: 0.7, freq: 'monthly' },
    { path: 'industries/manufacturing', priority: 0.7, freq: 'monthly' },
    { path: 'industries/retail-ecommerce', priority: 0.7, freq: 'monthly' },
    { path: 'industries/wineries', priority: 0.7, freq: 'monthly' },

    // Conversion + trust pages
    { path: 'pricing', priority: 0.8, freq: 'monthly' },
    { path: 'case-studies', priority: 0.8, freq: 'weekly' },
    { path: 'work', priority: 0.6, freq: 'monthly' },
    { path: 'about', priority: 0.7, freq: 'monthly' },
    { path: 'contact', priority: 0.8, freq: 'monthly' },
    { path: 'audit', priority: 0.7, freq: 'monthly' },
    { path: 'booking', priority: 0.6, freq: 'monthly' },
    { path: 'demo', priority: 0.5, freq: 'monthly' },
    { path: 'features', priority: 0.6, freq: 'monthly' },
    { path: 'resources', priority: 0.6, freq: 'weekly' },
    { path: 'tools', priority: 0.5, freq: 'monthly' },
    { path: 'tools/lead-scraper', priority: 0.5, freq: 'monthly' },
    { path: 'tools/seo-audit', priority: 0.5, freq: 'monthly' },

    // Blog hub
    { path: 'blog', priority: 0.7, freq: 'weekly' },

    // Legal
    { path: 'privacy', priority: 0.3, freq: 'yearly' },
    { path: 'terms', priority: 0.3, freq: 'yearly' },
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: r.path ? `${baseUrl}/${r.path}` : baseUrl,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))

  // Dynamic blog posts
  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Dynamic blog categories. The [category] route reads the raw, URL-encoded
  // category name (decodeURIComponent), matching how blog/page.tsx links to it.
  const categoryEntries: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${baseUrl}/blog/category/${encodeURIComponent(category)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  return [...staticEntries, ...postEntries, ...categoryEntries]
}
