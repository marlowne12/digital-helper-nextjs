
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByCategory, getAllCategories } from '@/lib/blog';
import { ArrowRight, Calendar, ArrowLeft } from 'lucide-react';
import SearchBar from '@/components/blog/SearchBar';

interface Props {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

    return {
        title: `${decodedCategory} Posts | Digital Helper Blog`,
        description: `Read our latest articles about ${decodedCategory}.`,
    };
}

export async function generateStaticParams() {
    const categories = getAllCategories();
    return categories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const posts = getPostsByCategory(decodedCategory);

    return (
        <main className="min-h-screen pt-32 pb-20 bg-background-primary">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="max-w-4xl mb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                    <span className="block text-accent-purple font-medium mb-2">Category Archive</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {decodedCategory}
                    </h1>
                    <p className="text-xl text-zinc-400">
                        {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mb-12">
                    <SearchBar />
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
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
                        <p className="text-zinc-400">No posts found in this category.</p>
                        <Link href="/blog" className="text-accent-purple hover:underline mt-4 inline-block">View all posts</Link>
                    </div>
                )}
            </div>
        </main>
    );
}
