import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center flex-wrap gap-2 text-sm text-zinc-400">
                <li className="flex items-center hover:text-white transition-colors">
                    <Link href="/" aria-label="Home">
                        <Home className="w-4 h-4" />
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center">
                        <ChevronRight className="w-4 h-4 mx-2 text-zinc-600" />
                        {index === items.length - 1 ? (
                            <span className="text-accent-purple font-medium" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
