import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found | Digital Helper' };
    }

    return {
        title: `${post.title} | Digital Helper Blog`,
        description: post.excerpt,
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Simple markdown-like content rendering
    const renderContent = (content: string) => {
        return content
            .split('\n')
            .map((line, i) => {
                // Headers
                if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{line.replace('## ', '')}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3">{line.replace('### ', '')}</h3>;
                }
                // List items
                if (line.startsWith('- ')) {
                    return (
                        <li key={i} className="text-zinc-300 ml-4 mb-2 flex items-start gap-2">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-purple flex-shrink-0" />
                            <span>{line.replace('- ', '')}</span>
                        </li>
                    );
                }
                // Numbered list
                if (/^\d+\. /.test(line)) {
                    const match = line.match(/^(\d+)\. (.*)$/);
                    if (match) {
                        return (
                            <li key={i} className="text-zinc-300 ml-4 mb-2 flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-bold flex items-center justify-center flex-shrink-0">
                                    {match[1]}
                                </span>
                                <span>{match[2]}</span>
                            </li>
                        );
                    }
                }
                // Bold text with **
                if (line.includes('**')) {
                    const parts = line.split(/\*\*(.*?)\*\*/g);
                    return (
                        <p key={i} className="text-zinc-400 mb-4 leading-relaxed">
                            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}
                        </p>
                    );
                }
                // Links in markdown format
                if (line.includes('[') && line.includes('](')) {
                    const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
                    if (linkMatch) {
                        const before = line.substring(0, line.indexOf('['));
                        const after = line.substring(line.indexOf(')') + 1);
                        return (
                            <p key={i} className="text-zinc-400 mb-4 leading-relaxed">
                                {before}
                                <Link href={linkMatch[2]} className="text-accent-purple hover:underline">{linkMatch[1]}</Link>
                                {after}
                            </p>
                        );
                    }
                }
                // Tables (simple)
                if (line.startsWith('|')) {
                    // Skip table formatting for now, render as code-like
                    return <p key={i} className="text-zinc-500 font-mono text-sm mb-1">{line}</p>;
                }
                // Empty lines
                if (line.trim() === '') {
                    return null;
                }
                // Regular paragraph
                return <p key={i} className="text-zinc-400 mb-4 leading-relaxed">{line}</p>;
            });
    };

    return (
        <main className="min-h-screen pt-32 pb-20 bg-background-primary">
            <article className="container mx-auto px-6 max-w-3xl">

                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
                        <span className="px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-medium flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {post.readingTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-zinc-400 leading-relaxed">
                        {post.excerpt}
                    </p>
                </header>

                {/* Featured Image */}
                <div className="aspect-video bg-gradient-to-br from-accent-purple/10 to-accent-blue/10 rounded-2xl mb-12 relative overflow-hidden border border-white/[0.05]">
                    {post.image ? (
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 800px"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-8xl opacity-30">📄</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                    {renderContent(post.content)}
                </div>

                {/* Share & CTA */}
                <footer className="mt-16 pt-8 border-t border-white/[0.08]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <span className="text-zinc-500 text-sm">Share this article:</span>
                            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                                <Share2 className="w-5 h-5" />
                            </Button>
                        </div>
                        <Button asChild className="btn-primary">
                            <Link href="/contact">Get a Free Consultation</Link>
                        </Button>
                    </div>
                </footer>

                {/* Author */}
                <div className="mt-12 glass p-6 rounded-2xl flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold text-xl">
                        DH
                    </div>
                    <div>
                        <p className="text-white font-semibold">{post.author}</p>
                        <p className="text-zinc-500 text-sm">Web design, SEO, and AI automation for Tri-Cities businesses.</p>
                    </div>
                </div>

                {/* Related Posts */}
                <section className="mt-20 border-t border-white/[0.08] pt-16">
                    <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {getAllPosts()
                            .filter(p => p.slug !== post.slug && p.category === post.category)
                            .slice(0, 2)
                            .map(related => (
                                <Link
                                    key={related.slug}
                                    href={`/blog/${related.slug}`}
                                    className="group glass p-6 rounded-2xl hover:border-accent-purple/30 transition-all block"
                                >
                                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                                        <Tag className="w-3 h-3" /> {related.category}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-purple transition-colors">
                                        {related.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm line-clamp-2 mb-4">
                                        {related.excerpt}
                                    </p>
                                    <span className="text-accent-purple text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Read Article <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            ))}
                    </div>
                </section>

            </article>
        </main>
    );
}
