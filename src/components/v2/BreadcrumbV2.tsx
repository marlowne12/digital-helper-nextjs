import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href: string
}

interface BreadcrumbV2Props {
    items: BreadcrumbItem[]
}

/**
 * BreadcrumbV2
 * V2 design-system breadcrumb with JSON-LD structured data.
 * Usage: <BreadcrumbV2 items={[{ label: 'Services', href: '/services' }, { label: 'AI Automation', href: '/services/ai-automation' }]} />
 * The first crumb is always "Home" and is prepended automatically.
 * The last item in `items` is treated as the current page (no link, aria-current).
 */
export function BreadcrumbV2({ items }: BreadcrumbV2Props) {
    const allCrumbs = [{ label: 'Home', href: '/' }, ...items]

    // JSON-LD content is built entirely from static prop strings (no user input).
    // Using the standard Next.js structured-data pattern — not an XSS risk.
    const jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: allCrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.label,
            item: `https://digital-helper.com${crumb.href}`,
        })),
    })

    return (
        <>
            {/* Breadcrumb JSON-LD — content is static prop data, not user input */}
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: jsonLd }}
            />

            <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center flex-wrap gap-1 text-sm">
                    {allCrumbs.map((crumb, index) => {
                        const isLast = index === allCrumbs.length - 1
                        return (
                            <li key={crumb.href} className="flex items-center gap-1">
                                {index > 0 && (
                                    <ChevronRight
                                        className="w-3.5 h-3.5 text-white/30 shrink-0"
                                        aria-hidden="true"
                                    />
                                )}
                                {isLast ? (
                                    <span
                                        className="text-white/80 font-medium"
                                        aria-current="page"
                                    >
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={crumb.href}
                                        className="text-indigo-400 hover:text-indigo-300 transition-colors duration-150"
                                    >
                                        {crumb.label}
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </nav>
        </>
    )
}
