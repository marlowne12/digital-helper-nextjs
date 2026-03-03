import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getAllCategories, getFeaturedPosts, searchPosts } from '@/lib/blog';
import { ArrowRight, Calendar, Clock, Tag, XCircle } from 'lucide-react';
import SearchBar from '@/components/blog/SearchBar';
import { BreadcrumbV2 } from '@/components/v2/BreadcrumbV2';

export const metadata: Metadata = {
    title: 'Blog | Digital Helper',
    description: 'Insights on web design, SEO, AI automation, and growing your local business in the Tri-Cities area.',
};

interface Props {
    searchParams: Promise<{ q?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
    const { q } = await searchParams;
    const categories = getAllCategories();

    const allPosts = q ? searchPosts(q) : getAllPosts();
    const featuredPosts = q ? [] : getFeaturedPosts();
    const isSearching = !!q;

    return (
        <main className="min-h-screen bg-[#0a0a0f] overflow-hidden">
            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full bg-indigo-600/8 blur-[120px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-violet-600/6 blur-[100px]" />
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">

                {/* Breadcrumb */}
                <BreadcrumbV2 items={[{ label: 'Blog', href: '/blog' }]} />

                {/* Hero */}
                <div className="max-w-4xl mb-14">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6">
                        Insights &amp; Resources
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white mb-5">
                        The Digital Helper{" "}
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                            Blog
                        </span>
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
                        Actionable tips on web design, local SEO, AI automation, and growing
                        your business in Richland, Kennewick, and Pasco.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-start justify-between">
                    <div className="flex flex-wrap gap-2 flex-1">
                        <Link
                            href="/blog"
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${!isSearching
                                ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
                                : 'border-white/10 bg-white/5 text-zinc-400 hover:bg-white/8 hover:border-white/15'
                                }`}
                        >
                            All Posts
                        </Link>
                        {categories.map(category => (
                            <Link
                                key={category}
                                href={`/blog/category/${encodeURIComponent(category)}`}
                                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-sm font-medium hover:bg-white/8 hover:border-white/15 transition-all duration-200"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                    <SearchBar />
                </div>

                {/* Search results header */}
                {isSearching && (
                    <div className="mb-10 flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-white">
                            Results for{" "}
                            <span className="text-indigo-400">&quot;{q}&quot;</span>
                        </h2>
                        <Link
                            href="/blog"
                            className="text-zinc-500 hover:text-white flex items-center gap-1 text-sm transition-colors"
                        >
                            <XCircle className="w-4 h-4" /> Clear
                        </Link>
                    </div>
                )}

                {/* Featured posts */}
                {featuredPosts.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">
                                ★
                            </span>
                            Featured
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredPosts.map(post => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-indigo-500/30 hover:bg-white/8 transition-all duration-300"
                                >
                                    <div className="aspect-video bg-gradient-to-br from-indigo-600/20 to-violet-600/20 relative overflow-hidden">
                                        {post.image ? (
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-6xl opacity-30">📝</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Tag className="w-3 h-3" /> {post.category}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {post.readingTime}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-indigo-400 font-medium text-sm flex items-center gap-1">
                                            Read More{" "}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* All posts grid */}
                <section>
                    {!isSearching && (
                        <h2 className="text-xl font-bold text-white mb-6">All Posts</h2>
                    )}

                    {allPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {allPosts.map(post => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-indigo-500/30 hover:bg-white/8 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
                                        <span className="px-2 py-1 rounded-full bg-white/5 border border-white/8">
                                            {post.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />{" "}
                                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                                        <span className="text-xs text-zinc-600">{post.readingTime}</span>
                                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/5">
                            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                            <p className="text-zinc-400 mb-6">
                                We couldn&apos;t find any articles matching &quot;{q}&quot;.
                            </p>
                            <Link
                                href="/blog"
                                className="inline-block px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm transition-all"
                            >
                                View all posts
                            </Link>
                        </div>
                    )}
                </section>

            </div>
        </main>
    );
}
