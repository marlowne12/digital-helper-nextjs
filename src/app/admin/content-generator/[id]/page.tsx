import { notFound } from 'next/navigation';
import { VariantComparison } from '@/components/content-generator/VariantComparison';
import type { ContentItem } from '@/types/content';

async function getContentItem(id: string): Promise<ContentItem | null> {
    try {
        const response = await fetch(`http://localhost:3000/api/content-generator/${id}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch {
        return null;
    }
}

export default async function ContentItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const contentItem = await getContentItem(id);

    if (!contentItem) {
        notFound();
    }

    return <VariantComparison contentItem={contentItem} />;
}
