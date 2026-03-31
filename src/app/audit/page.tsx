'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Smartphone,
  Zap,
  Search,
  Shield,
  Phone,
  Bot,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import type { AuditResult } from '@/app/api/audit/route';

const LOADING_STEPS = [
  'Checking mobile friendliness...',
  'Scanning page speed...',
  'Reviewing SEO basics...',
  'Verifying SSL certificate...',
  'Looking for contact info...',
  'Checking for AI readiness...',
  'Calculating your score...',
];

function ScoreCircle({ score }: { score: number }) {
  const color =
    score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg className="absolute inset-0 -rotate-90" width="144" height="144">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="#1f2937" strokeWidth="10" />
        <motion.circle
          cx="72"
          cy="72"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="text-center">
        <motion.span
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <p className="text-xs text-zinc-400 mt-0.5">out of 100</p>
      </div>
    </div>
  );
}

interface CheckRowProps {
  icon: React.ElementType;
  label: string;
  detail?: string;
  pass: boolean;
  score?: number;
  delay: number;
}

function CheckRow({ icon: Icon, label, detail, pass, score, delay }: CheckRowProps) {
  const scoreColor =
    score === undefined
      ? pass
        ? 'text-green-400'
        : 'text-red-400'
      : score >= 75
      ? 'text-green-400'
      : score >= 50
      ? 'text-yellow-400'
      : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.06] transition-colors"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-500/15 flex items-center justify-center">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{label}</p>
        {detail && <p className="text-xs text-zinc-500 mt-0.5 truncate">{detail}</p>}
      </div>
      <div className="flex-shrink-0 flex items-center gap-2">
        {score !== undefined && (
          <span className={`text-sm font-semibold ${scoreColor}`}>{score}/100</span>
        )}
        {pass ? (
          <CheckCircle2 className="w-5 h-5 text-green-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400" />
        )}
      </div>
    </motion.div>
  );
}

export default function AuditPage() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AuditResult | null>(null);

  // Cycle through loading steps
  useEffect(() => {
    if (!loading) return;
    setLoadingStep(0);
    const interval = setInterval(() => {
      setLoadingStep((s) => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
    }, 900);
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email: email || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? 'Audit failed. Please try again.');
      }
      setResult(data as AuditResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const gradeLabel =
    !result
      ? ''
      : result.score >= 90
      ? 'Excellent'
      : result.score >= 75
      ? 'Good'
      : result.score >= 50
      ? 'Needs Work'
      : 'Critical Issues';

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero / Form */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-500/15 px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-300 text-sm font-medium">100% Free • No Sign-up</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Get Your Free Website
              <br />
              <span className="text-indigo-400">Report in 60 Seconds</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-10">
              Instant AI-powered audit: mobile, speed, SEO, security, and more.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 md:p-8 text-left space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Your website URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourbusiness.com"
                required
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Your email{' '}
                <span className="text-zinc-500 font-normal">(get the full report)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze My Site
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </section>

      {/* Loading Steps */}
      <AnimatePresence>
        {loading && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="pb-16 px-4"
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 space-y-3">
                {LOADING_STEPS.map((step, i) => (
                  <div
                    key={step}
                    className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                      i < loadingStep
                        ? 'text-green-400'
                        : i === loadingStep
                        ? 'text-white'
                        : 'text-zinc-600'
                    }`}
                  >
                    {i < loadingStep ? (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    ) : i === loadingStep ? (
                      <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 flex-shrink-0 rounded-full border border-zinc-700" />
                    )}
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !loading && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-24 px-4"
          >
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Score header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
              >
                <ScoreCircle score={result.score} />
                <div className="text-center sm:text-left">
                  <p className="text-zinc-400 text-sm mb-1">Overall Score</p>
                  <h2 className="text-2xl font-bold text-white mb-1">{gradeLabel}</h2>
                  <p className="text-zinc-500 text-sm break-all">{result.url}</p>
                </div>
              </motion.div>

              {/* Check rows */}
              <div className="space-y-3">
                <CheckRow
                  icon={Smartphone}
                  label={result.checks.mobile.label}
                  detail={result.checks.mobile.detail}
                  pass={result.checks.mobile.pass}
                  delay={0.05}
                />
                <CheckRow
                  icon={Zap}
                  label={`Page Speed: ${result.checks.speed.label}`}
                  detail={`${result.checks.speed.loadTimeMs}ms load time`}
                  pass={result.checks.speed.score >= 70}
                  score={result.checks.speed.score}
                  delay={0.10}
                />
                <CheckRow
                  icon={Search}
                  label={result.checks.seo.label}
                  detail={[
                    result.checks.seo.details.title ? '✓ Title' : '✗ Title',
                    result.checks.seo.details.description ? '✓ Meta description' : '✗ Meta description',
                    result.checks.seo.details.h1 ? '✓ H1' : '✗ H1',
                  ].join('  ')}
                  pass={result.checks.seo.pass}
                  delay={0.15}
                />
                <CheckRow
                  icon={Shield}
                  label={result.checks.ssl.label}
                  detail={result.checks.ssl.detail}
                  pass={result.checks.ssl.pass}
                  delay={0.20}
                />
                <CheckRow
                  icon={Phone}
                  label={result.checks.contactInfo.label}
                  detail={result.checks.contactInfo.detail}
                  pass={result.checks.contactInfo.pass}
                  delay={0.25}
                />
                <CheckRow
                  icon={Bot}
                  label={result.checks.aiReady.label}
                  detail={result.checks.aiReady.detail}
                  pass={result.checks.aiReady.pass}
                  delay={0.30}
                />
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-6 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  Want us to fix these issues?
                </h3>
                <p className="text-zinc-400 text-sm mb-5">
                  Book a free strategy call — we'll walk through your report and show you exactly what to fix first.
                </p>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm"
                >
                  Book a Free Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
