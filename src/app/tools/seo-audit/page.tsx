'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    CheckCircle, 
    AlertTriangle, 
    XCircle, 
    Info,
    Loader2,
    ArrowRight,
    Download,
    RefreshCw,
    Zap,
    Shield,
    FileText,
    Globe,
    TrendingUp,
    Clock
} from 'lucide-react';
import Link from 'next/link';

interface AuditIssue {
    severity: 'critical' | 'warning' | 'info';
    title: string;
    description: string;
    fix: string;
}

interface AuditCategory {
    name: string;
    score: number;
    maxScore: number;
    issues: AuditIssue[];
}

interface AuditResult {
    url: string;
    overallScore: number;
    grade: string;
    summary: string;
    categories: AuditCategory[];
    quickWins: string[];
    auditedAt: string;
}

export default function SEOAuditPage() {
    const [url, setUrl] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<AuditResult | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/seo-audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, email: email || undefined })
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Audit failed');
            }

            setResult(data.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const getGradeColor = (grade: string) => {
        if (grade.startsWith('A')) return 'text-green-500';
        if (grade.startsWith('B')) return 'text-blue-500';
        if (grade.startsWith('C')) return 'text-yellow-500';
        if (grade.startsWith('D')) return 'text-orange-500';
        return 'text-red-500';
    };

    const getScoreColor = (score: number, max: number) => {
        const pct = (score / max) * 100;
        if (pct >= 80) return 'bg-green-500';
        if (pct >= 60) return 'bg-blue-500';
        if (pct >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getSeverityBg = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-50 border-red-200';
            case 'warning': return 'bg-yellow-50 border-yellow-200';
            default: return 'bg-blue-50 border-blue-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full mb-6">
                            <Zap className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300 text-sm font-medium">Free AI-Powered Analysis</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Instant SEO Audit
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Get a comprehensive SEO analysis of any website in seconds. 
                            Our AI examines 50+ ranking factors and gives you actionable fixes.
                        </p>
                    </motion.div>

                    {/* Audit Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="Enter website URL (e.g., yoursite.com)"
                                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading || !url}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="w-5 h-5" />
                                            Analyze
                                        </>
                                    )}
                                </button>
                            </div>
                            
                            {/* Optional email */}
                            <div className="mt-4 flex items-center gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email (optional - get a PDF report)"
                                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </motion.form>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-12 space-y-4"
                        >
                            <div className="flex items-center justify-center gap-3 text-gray-300">
                                <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                                <span>Fetching and analyzing your website...</span>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4 text-green-400" /> Checking meta tags
                                </span>
                                <span className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4 text-green-400" /> Analyzing content
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-yellow-400 animate-pulse" /> Evaluating UX
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Results Section */}
            <AnimatePresence>
                {result && (
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        className="max-w-5xl mx-auto px-4 pb-20"
                    >
                        {/* Score Card */}
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
                            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">SEO Score for</p>
                                        <h2 className="text-2xl font-bold text-white break-all">{result.url}</h2>
                                        <p className="text-gray-400 text-sm mt-2">
                                            Audited {new Date(result.auditedAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className={`text-7xl font-bold ${getGradeColor(result.grade)}`}>
                                            {result.grade}
                                        </div>
                                        <div className="text-3xl font-semibold text-white mt-2">
                                            {result.overallScore}/100
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 bg-gray-50">
                                <p className="text-gray-700 text-lg">{result.summary}</p>
                            </div>
                        </div>

                        {/* Quick Wins */}
                        {result.quickWins.length > 0 && (
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <Zap className="w-6 h-6" />
                                    <h3 className="text-xl font-bold">Quick Wins - Fix These First!</h3>
                                </div>
                                <ul className="space-y-2">
                                    {result.quickWins.map((win, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                            <span>{win}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Category Breakdown */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4">Detailed Analysis</h3>
                            
                            {result.categories.map((category) => (
                                <div key={category.name} className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <button
                                        onClick={() => setExpandedCategory(
                                            expandedCategory === category.name ? null : category.name
                                        )}
                                        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-left">
                                                <h4 className="font-semibold text-gray-900">{category.name}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {category.issues.filter(i => i.severity === 'critical').length} critical, {' '}
                                                    {category.issues.filter(i => i.severity === 'warning').length} warnings
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${getScoreColor(category.score, category.maxScore)} transition-all`}
                                                    style={{ width: `${(category.score / category.maxScore) * 100}%` }}
                                                />
                                            </div>
                                            <span className="font-semibold text-gray-900 w-16 text-right">
                                                {category.score}/{category.maxScore}
                                            </span>
                                            <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === category.name ? 'rotate-90' : ''}`} />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {expandedCategory === category.name && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-gray-100"
                                            >
                                                <div className="p-6 space-y-4">
                                                    {category.issues.length === 0 ? (
                                                        <div className="flex items-center gap-2 text-green-600">
                                                            <CheckCircle className="w-5 h-5" />
                                                            <span>No issues found - great job!</span>
                                                        </div>
                                                    ) : (
                                                        category.issues.map((issue, i) => (
                                                            <div
                                                                key={i}
                                                                className={`p-4 rounded-lg border ${getSeverityBg(issue.severity)}`}
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    {getSeverityIcon(issue.severity)}
                                                                    <div className="flex-1">
                                                                        <h5 className="font-semibold text-gray-900">{issue.title}</h5>
                                                                        <p className="text-gray-600 text-sm mt-1">{issue.description}</p>
                                                                        <div className="mt-3 p-3 bg-white/50 rounded-lg">
                                                                            <p className="text-sm">
                                                                                <span className="font-medium text-gray-700">How to fix: </span>
                                                                                <span className="text-gray-600">{issue.fix}</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
                            <h3 className="text-2xl font-bold mb-4">Want Us to Fix These Issues?</h3>
                            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                                Our team can implement all these fixes and more. Most local businesses see a 
                                347% increase in leads after we optimize their website.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    Get a Free Strategy Call
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={() => {
                                        setResult(null);
                                        setUrl('');
                                        setError('');
                                    }}
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                    Audit Another Site
                                </button>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Features - shown when no result */}
            {!result && !loading && (
                <section className="max-w-5xl mx-auto px-4 pb-20">
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: TrendingUp,
                                title: '50+ Ranking Factors',
                                description: 'We analyze meta tags, content quality, technical SEO, mobile-friendliness, and more.'
                            },
                            {
                                icon: Zap,
                                title: 'AI-Powered Analysis',
                                description: 'Our AI examines your site like a human SEO expert would, finding issues others miss.'
                            },
                            {
                                icon: FileText,
                                title: 'Actionable Report',
                                description: 'Get specific fixes you can implement today, prioritized by impact.'
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                            >
                                <feature.icon className="w-10 h-10 text-purple-400 mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
