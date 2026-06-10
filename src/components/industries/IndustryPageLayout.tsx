import React from'react';
import { IndustryNavSidebar } from'./IndustryNavSidebar';
import { Breadcrumbs } from'../services/Breadcrumbs';

interface IndustryPageLayoutProps {
  children: React.ReactNode;
  breadcrumbs: { label: string; href: string }[];
}

export function IndustryPageLayout({ children, breadcrumbs }: IndustryPageLayoutProps) {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-operator-black overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Sidebar - 3 cols (25%) */}
          <div className="lg:col-span-3 lg:sticky lg:top-32 hidden lg:block">
            <IndustryNavSidebar />
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
