import React from 'react';
import { LocationNavSidebar } from './LocationNavSidebar';
import { Breadcrumbs } from '../services/Breadcrumbs';

interface LocationPageLayoutProps {
    children: React.ReactNode;
    breadcrumbs: { label: string; href: string }[];
}

export function LocationPageLayout({ children, breadcrumbs }: LocationPageLayoutProps) {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-background-primary overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-accent-primary/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-[500px] bg-accent-secondary/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <Breadcrumbs items={breadcrumbs} />

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Sidebar - 3 cols (25%) */}
                    <div className="lg:col-span-3 lg:sticky lg:top-32 hidden lg:block">
                        <LocationNavSidebar />
                    </div>

                    {/* Main Content - 9 cols (75%) */}
                    <div className="lg:col-span-9 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
