import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Calculator, MessageSquare, FileText, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Free Marketing Tools | Digital Helper',
    description: 'Free AI-powered marketing tools for local businesses. SEO audits, ROI calculators, and more.',
    openGraph: {
        title: 'Free Marketing Tools | Digital Helper',
        description: 'Free AI-powered marketing tools for local businesses.',
        type: 'website',
    }
};

const tools = [
    {
        name: 'SEO Audit Tool',
        description: 'Get a free, instant SEO analysis of any website. Our AI examines 50+ ranking factors and gives you actionable fixes.',
        icon: Search,
        href: '/tools/seo-audit',
        badge: 'NEW',
        badgeColor: 'bg-green-500',
    },
    {
        name: 'ROI Calculator',
        description: 'See how much revenue you could generate with an optimized web presence. Customized for your industry.',
        icon: Calculator,
        href: '/#roi-calculator',
        badge: null,
        badgeColor: '',
    },
    {
        name: 'AI Chatbot Demo',
        description: 'Try our AI chatbot and see how it could capture leads for your business 24/7.',
        icon: MessageSquare,
        href: '/features/chatbot',
        badge: 'Coming Soon',
        badgeColor: 'bg-purple-500',
    },
    {
        name: 'Review Response Generator',
        description: 'Generate professional responses to customer reviews using AI. Great for positive and negative reviews.',
        icon: FileText,
        href: '/tools/review-responder',
        badge: 'Coming Soon',
        badgeColor: 'bg-purple-500',
    },
];

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <section className="pt-20 pb-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300 text-sm font-medium">100% Free</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Free Marketing Tools
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Powerful AI-powered tools to help local businesses grow. 
                            No sign-up required.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {tools.map((tool) => (
                            <Link
                                key={tool.name}
                                href={tool.href}
                                className="group bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-500/20 rounded-lg">
                                        <tool.icon className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h2 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                                                {tool.name}
                                            </h2>
                                            {tool.badge && (
                                                <span className={`text-xs px-2 py-0.5 ${tool.badgeColor} text-white rounded-full`}>
                                                    {tool.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-400 mb-4">{tool.description}</p>
                                        <span className="inline-flex items-center gap-1 text-purple-400 group-hover:text-purple-300 transition-colors">
                                            Try it free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <p className="text-gray-400 mb-4">
                            Need help implementing recommendations from these tools?
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all"
                        >
                            Get a Free Strategy Call
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
