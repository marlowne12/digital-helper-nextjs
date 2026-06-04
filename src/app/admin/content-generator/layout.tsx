'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, Plus, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';

export default function ContentGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      try {
        await fetch('/api/admin/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'logout' }),
        });
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        router.push('/admin/login');
        router.refresh();
      }
    });
  };

  const navLinks = [
    { href: '/admin/content-generator', label: 'Dashboard', icon: FileText },
    { href: '/admin/content-generator/new', label: 'New Content', icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Admin Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background-primary/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-gradient"
            >
              <span className="text-accent-primary">Digital</span> Helper
              <span className="ml-2 rounded bg-accent-primary/10 px-2 py-0.5 text-xs font-normal text-accent-primary">
                Admin
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    'text-zinc-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}

              <div className="ml-2 w-px h-6 bg-white/10" />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isPending}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  'text-zinc-400 hover:text-red-400 hover:bg-red-500/10',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                <LogOut className="w-4 h-4" />
                {isPending ? 'Logging out...' : 'Logout'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 md:px-6 py-8">
        {children}
      </main>
    </div>
  );
}
