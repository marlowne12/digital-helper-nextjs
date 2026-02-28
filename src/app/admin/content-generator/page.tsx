import { ContentDashboard } from '@/components/content-generator/ContentDashboard';

// This would fetch from your database in a real implementation
async function getContentItems() {
    // For now, return empty array - the component will fetch from API
    return [];
}

export default async function ContentGeneratorPage() {
    const items = await getContentItems();

    return <ContentDashboard initialItems={items} />;
}
