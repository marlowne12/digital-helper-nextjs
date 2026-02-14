import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getAllCategories, getFeaturedPosts, searchPosts } from '@/lib/blog';
import { ArrowRight, Calendar, Clock, Tag, XCircle } from 'lucide-react';
import SearchBar from '@/components/blog/SearchBar';

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
        <main className="min-h-screen pt-32 pb-20 bg-background-primary">
            <div className="container mx-auto px-6">

                {/* Hero */}
                <div className="max-w-4xl mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-accent-purple text-sm font-medium mb-6">
                        Insights & Resources
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        The Digital Helper <span className="text-gradient">Blog</span>
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed">
                        Actionable tips on web design, local SEO, AI automation, and growing your business in Richland, Kennewick, and Pasco.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-8 mb-12 items-start justify-between">
                    <div className="flex flex-wrap gap-3 flex-1">
                        <Link
                            href="/blog"
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${!isSearching
                                ? 'bg-accent-purple/10 border-accent-purple/20 text-accent-purple hover:bg-accent-purple/20'
                                : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:bg-white/[0.06]'
                                }`}
                        >
                            All Posts
                        </Link>
                        {categories.map(category => (
                            <Link
                                key={category}
                                href={`/blog/category/${encodeURIComponent(category)}`}
                                className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 text-sm font-medium hover:bg-white/[0.06] transition-colors"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                    <SearchBar />
                </div>

                {/* Search Results Header */}
                {isSearching && (
                    <div className="mb-8 flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-white">
                            Search results for <span className="text-accent-purple">&quot;{q}&quot;</span>
                        </h2>
                        <Link href="/blog" className="text-zinc-500 hover:text-white flex items-center gap-1 text-sm">
                            <XCircle className="w-4 h-4" /> Clear Search
                        </Link>
                    </div>
                )}

                {/* Featured Posts (Hidden when searching) */}
                {featuredPosts.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center text-accent-purple text-sm">★</span>
                            Featured
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredPosts.map(post => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group glass p-1 rounded-2xl overflow-hidden hover:border-accent-purple/30 transition-all"
                                >
                                    <div className="aspect-video bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 rounded-xl mb-4 relative overflow-hidden">
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
                                                <span className="text-6xl opacity-50">📝</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-zinc-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <Tag className="w-3 h-3" /> {post.category}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {post.readingTime}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-accent-purple font-medium text-sm flex items-center gap-1">
                                            Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Posts Grid */}
                <section>
                    {!isSearching && <h2 className="text-2xl font-bold text-white mb-8">All Posts</h2>}

                    {allPosts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allPosts.map(post => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group glass p-6 rounded-2xl hover:border-accent-purple/30 transition-all"
                                >
                                    <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
                                        <span className="px-2 py-1 rounded bg-white/[0.05]">{post.category}</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-purple transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                                        <span className="text-xs text-zinc-600">{post.readingTime}</span>
                                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-accent-purple group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                            <p className="text-zinc-400 mb-6">We couldn&apos;t find any articles matching &quot;{q}&quot;.</p>
                            <Link href="/blog" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors inline-block">
                                View all posts
                            </Link>
                        </div>
                    )}
                </section>

            </div>
        </main>
    );
}
