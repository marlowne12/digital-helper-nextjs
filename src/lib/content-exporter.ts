/**
 * Content Exporter Service
 *
 * This service provides functionality to export AI-generated content variants
 * to various formats and locations in the codebase:
 * - Blog posts to src/lib/blog.ts
 * - Service pages to src/app/services/[slug]/page.tsx
 * - Location pages to src/app/locations/[slug]/page.tsx
 *
 * Each export function formats the content appropriately and returns
 * the file path where content would be written.
 */

import type { ContentVariant, ExportResult } from '@/types/content';
import type { BlogPost } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Escape TypeScript string content
 */
function escapeTSString(str: string): string {
    return str
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$')
        .replace(/\n/g, '\\n');
}

/**
 * Format date for blog posts
 */
function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

/**
 * Get category from keywords
 */
function inferCategory(keywords: string[], type: string): string {
    const keywordLower = keywords.join(' ').toLowerCase();

    if (keywordLower.includes('seo') || keywordLower.includes('search') || keywordLower.includes('google')) {
        return 'SEO';
    }
    if (keywordLower.includes('ai') || keywordLower.includes('automation') || keywordLower.includes('chatbot')) {
        return 'AI Automation';
    }
    if (keywordLower.includes('website') || keywordLower.includes('design') || keywordLower.includes('landing page')) {
        return 'Web Design';
    }
    if (keywordLower.includes('lead') || keywordLower.includes('marketing') || keywordLower.includes('advertising')) {
        return 'Lead Generation';
    }
    if (keywordLower.includes('review') || keywordLower.includes('reputation') || keywordLower.includes('gbp')) {
        return 'Reputation Management';
    }

    return type === 'blog' ? 'General' : 'Services';
}

// ============================================================
// BLOG POST EXPORT
// ============================================================

/**
 * Export a blog post variant to TypeScript format for src/lib/blog.ts
 *
 * This formats the content as a BlogPost object that can be appended
 * to the blogPosts array.
 *
 * @param variant - The content variant to export
 * @returns The formatted TypeScript code as a string
 *
 * @example
 * ```ts
 * const code = await exportBlogPost(variant);
 * // Append the returned code to src/lib/blog.ts
 * ```
 */
export async function exportBlogPost(variant: ContentVariant): Promise<string> {
    const blogPost: BlogPost = {
        slug: variant.slug,
        title: variant.title,
        excerpt: variant.excerpt,
        content: variant.content.trim(),
        author: 'Digital Helper',
        publishedAt: formatDate(new Date()),
        readingTime: variant.readingTime,
        category: inferCategory([], 'blog'), // Will be updated with metadata if available
        image: `/blog/${variant.slug}.jpg`,
        featured: false,
    };

    // Generate TypeScript code
    const code = `    {
        slug: '${blogPost.slug}',
        title: '${blogPost.title.replace(/'/g, "\\'")}',
        excerpt: '${blogPost.excerpt.replace(/'/g, "\\'")}',
        content: \`
${blogPost.content}
        \`.trim(),
        author: '${blogPost.author}',
        publishedAt: '${blogPost.publishedAt}',
        readingTime: '${blogPost.readingTime}',
        category: '${blogPost.category}',
        image: '${blogPost.image}',
        featured: ${blogPost.featured},
    }`;

    return code;
}

/**
 * Append a blog post to the blog.ts file
 *
 * @param variant - The content variant to export
 * @returns The export result with file path
 */
export async function appendBlogPostToFile(variant: ContentVariant): Promise<ExportResult> {
    try {
        const blogFilePath = path.join(process.cwd(), 'src/lib/blog.ts');
        const code = await exportBlogPost(variant);

        // Read the existing file
        const existingContent = await fs.readFile(blogFilePath, 'utf-8');

        // Find the position to insert (before the closing bracket and semicolon)
        const lastArrayEntryIndex = existingContent.lastIndexOf('    },');
        if (lastArrayEntryIndex === -1) {
            throw new Error('Could not find valid insertion point in blog.ts');
        }

        // Insert the new blog post
        const newContent =
            existingContent.slice(0, lastArrayEntryIndex + 6) +
            ',\n' +
            code +
            existingContent.slice(lastArrayEntryIndex + 6);

        // Write back to file
        await fs.writeFile(blogFilePath, newContent, 'utf-8');

        return {
            success: true,
            path: 'src/lib/blog.ts',
        };
    } catch (error) {
        console.error('Failed to append blog post:', error);
        return {
            success: false,
            path: '',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// ============================================================
// SERVICE PAGE EXPORT
// ============================================================

/**
 * Generate the metadata object for a service page
 */
function generateServicePageMetadata(variant: ContentVariant): string {
    return `export const metadata: Metadata = {
    title: "${variant.metaTitle}",
    description: "${variant.metaDescription}",
    keywords: ${JSON.stringify([])}, // Add relevant keywords
    openGraph: {
        title: "${variant.metaTitle}",
        description: "${variant.metaDescription}",
        url: "https://digital-helper.com/services/${variant.slug}",
        images: [
            {
                url: "/og-${variant.slug}.png",
                width: 1200,
                height: 630,
                alt: "${variant.title}",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "${variant.metaTitle}",
        description: "${variant.metaDescription}",
        images: ["/og-${variant.slug}.png"],
    },
    alternates: {
        canonical: "/services/${variant.slug}",
    },
}`;
}

/**
 * Export a service page as a React component
 *
 * This generates a complete Next.js page component for a service page,
 * following the pattern from src/app/services/seo/page.tsx.
 *
 * @param variant - The content variant to export
 * @returns The formatted TypeScript React component code
 *
 * @example
 * ```ts
 * const code = await exportServicePage(variant);
 * // Write to src/app/services/[slug]/page.tsx
 * ```
 */
export async function exportServicePage(variant: ContentVariant): Promise<string> {
    const metadataCode = generateServicePageMetadata(variant);

    // Convert markdown content to HTML/JSX structure for the page
    // This is a simplified version - in production, you'd parse the markdown
    // and create proper React components

    const componentCode = `import type { Metadata } from "next"
import type { ServicePageContent } from "@/types/content"
import { ServicePageLayout } from '@/components/services/ServicePageLayout'

${metadataCode}

const pageContent: ServicePageContent = {
    title: "${variant.title.replace(/"/g, '\\"')}",
    slug: "${variant.slug}",
    heroTitle: "${variant.title.replace(/"/g, '\\"')}",
    heroDescription: "${variant.excerpt.replace(/"/g, '\\"')}",
    content: \`
${variant.content}
    \`.trim(),
    metaTitle: "${variant.metaTitle.replace(/"/g, '\\"')}",
    metaDescription: "${variant.metaDescription.replace(/"/g, '\\"')}",
}

export default function ${toPascalCase(variant.slug)}Page() {
    return (
        <ServicePageLayout
            breadcrumbs={[
                { label: 'Services', href: '/services' },
                { label: '${variant.title}', href: '/services/${variant.slug}' }
            ]}
        >
            {/* Page content will be rendered from pageContent */}
            <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                    {pageContent.heroTitle}
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                    {pageContent.heroDescription}
                </p>
                <div className="prose prose-invert prose-lg max-w-none">
                    {/* Render markdown content here */}
                    <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
                </div>
            </div>
        </ServicePageLayout>
    )
}
`;

    return componentCode;
}

/**
 * Write a service page to the file system
 *
 * @param variant - The content variant to export
 * @returns The export result with file path
 */
export async function writeServicePageToFile(variant: ContentVariant): Promise<ExportResult> {
    try {
        const code = await exportServicePage(variant);
        const serviceDir = path.join(process.cwd(), `src/app/services/${variant.slug}`);

        // Create directory if it doesn't exist
        await fs.mkdir(serviceDir, { recursive: true });

        // Write page.tsx
        const pagePath = path.join(serviceDir, 'page.tsx');
        await fs.writeFile(pagePath, code, 'utf-8');

        return {
            success: true,
            path: `src/app/services/${variant.slug}/page.tsx`,
        };
    } catch (error) {
        console.error('Failed to write service page:', error);
        return {
            success: false,
            path: '',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// ============================================================
// LOCATION PAGE EXPORT
// ============================================================

/**
 * Generate the metadata object for a location page
 */
function generateLocationPageMetadata(variant: ContentVariant, city: string, state: string): string {
    return `export const metadata: Metadata = {
    title: "${variant.metaTitle}",
    description: "${variant.metaDescription}",
    keywords: ${JSON.stringify([`${city} ${state} web design`, `${city} marketing`, `${city} SEO`])},
    openGraph: {
        title: "${variant.metaTitle}",
        description: "${variant.metaDescription}",
        url: "https://digital-helper.com/locations/${variant.slug}",
        images: [
            {
                url: "/og-${variant.slug}.png",
                width: 1200,
                height: 630,
                alt: "${variant.title}",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "${variant.metaTitle}",
        description: "${variant.metaDescription}",
        images: ["/og-${variant.slug}.png"],
    },
    alternates: {
        canonical: "/locations/${variant.slug}",
    },
}`;
}

/**
 * Export a location page as a React component
 *
 * This generates a complete Next.js page component for a location page.
 *
 * @param variant - The content variant to export
 * @param city - The city name
 * @param state - The state abbreviation
 * @returns The formatted TypeScript React component code
 *
 * @example
 * ```ts
 * const code = await exportLocationPage(variant, 'Richland', 'WA');
 * // Write to src/app/locations/[slug]/page.tsx
 * ```
 */
export async function exportLocationPage(
    variant: ContentVariant,
    city: string,
    state: string
): Promise<string> {
    const metadataCode = generateLocationPageMetadata(variant, city, state);

    const componentCode = `import type { Metadata } from "next"
import type { LocationPageContent } from "@/types/content"
import { LocationPageLayout } from '@/components/locations/LocationPageLayout'

${metadataCode}

const pageContent: LocationPageContent = {
    title: "${variant.title.replace(/"/g, '\\"')}",
    slug: "${variant.slug}",
    city: "${city}",
    state: "${state}",
    heroTitle: "Web Design & Digital Marketing in ${city}, ${state}",
    heroDescription: "${variant.excerpt.replace(/"/g, '\\"')}",
    content: \`
${variant.content}
    \`.trim(),
    metaTitle: "${variant.metaTitle.replace(/"/g, '\\"')}",
    metaDescription: "${variant.metaDescription.replace(/"/g, '\\"')}",
}

export default function ${toPascalCase(variant.slug)}Page() {
    return (
        <LocationPageLayout
            breadcrumbs={[
                { label: 'Locations', href: '/locations' },
                { label: '${city}', href: '/locations/${variant.slug}' }
            ]}
            city="${city}"
            state="${state}"
        >
            {/* Page content will be rendered from pageContent */}
            <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                    {pageContent.heroTitle}
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                    {pageContent.heroDescription}
                </p>
                <div className="prose prose-invert prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
                </div>
            </div>
        </LocationPageLayout>
    )
}
`;

    return componentCode;
}

/**
 * Write a location page to the file system
 *
 * @param variant - The content variant to export
 * @param city - The city name
 * @param state - The state abbreviation
 * @returns The export result with file path
 */
export async function writeLocationPageToFile(
    variant: ContentVariant,
    city: string,
    state: string
): Promise<ExportResult> {
    try {
        const code = await exportLocationPage(variant, city, state);
        const locationDir = path.join(process.cwd(), `src/app/locations/${variant.slug}`);

        // Create directory if it doesn't exist
        await fs.mkdir(locationDir, { recursive: true });

        // Write page.tsx
        const pagePath = path.join(locationDir, 'page.tsx');
        await fs.writeFile(pagePath, code, 'utf-8');

        return {
            success: true,
            path: `src/app/locations/${variant.slug}/page.tsx`,
        };
    } catch (error) {
        console.error('Failed to write location page:', error);
        return {
            success: false,
            path: '',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

// ============================================================
// UTILITY EXPORTS
// ============================================================

/**
 * Convert a slug to PascalCase for component names
 */
function toPascalCase(slug: string): string {
    return slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

/**
 * Generic export function that routes to the appropriate exporter
 *
 * @param variant - The content variant to export
 * @param type - The type of content (blog, service, location)
 * @param extraData - Additional data needed for specific exports (city, state for location)
 * @returns The export result
 */
export async function exportContent(
    variant: ContentVariant,
    type: 'blog' | 'service' | 'location',
    extraData?: { city?: string; state?: string }
): Promise<ExportResult> {
    try {
        switch (type) {
            case 'blog':
                return await appendBlogPostToFile(variant);
            case 'service':
                return await writeServicePageToFile(variant);
            case 'location':
                if (!extraData?.city || !extraData?.state) {
                    throw new Error('City and state are required for location pages');
                }
                return await writeLocationPageToFile(variant, extraData.city, extraData.state);
            default:
                return {
                    success: false,
                    path: '',
                    error: `Unknown content type: ${type}`,
                };
        }
    } catch (error) {
        console.error('Failed to export content:', error);
        return {
            success: false,
            path: '',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Generate a preview of the exported content without writing to file
 *
 * @param variant - The content variant to preview
 * @param type - The type of content (blog, service, location)
 * @returns The generated code as a string
 */
export async function previewExport(
    variant: ContentVariant,
    type: 'blog' | 'service' | 'location'
): Promise<string> {
    switch (type) {
        case 'blog':
            return await exportBlogPost(variant);
        case 'service':
            return await exportServicePage(variant);
        case 'location':
            return await exportLocationPage(variant, 'City', 'ST'); // Placeholder
        default:
            throw new Error(`Unknown content type: ${type}`);
    }
}
