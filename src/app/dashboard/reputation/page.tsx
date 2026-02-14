import type { Metadata } from 'next';
import ReputationDashboard from '@/components/reputation/ReputationDashboard';

export const metadata: Metadata = {
    title: 'Reputation Management | Digital Helper',
    description: 'AI-Powered Reputation Audit and Management Dashboard',
};

export default function ReputationPage() {
    return (
        <div className="min-h-screen bg-background">
            <ReputationDashboard />
        </div>
    );
}
