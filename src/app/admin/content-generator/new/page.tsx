import { ContentForm } from '@/components/content-generator/ContentForm';
import Link from 'next/link';

export default function NewContentPage() {
    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-zinc-400">
                <Link href="/admin/content-generator" className="hover:text-white transition-colors">
                    Dashboard
                </Link>
                <span>/</span>
                <span className="text-white">New Content</span>
            </nav>

            <ContentForm />
        </div>
    );
}
