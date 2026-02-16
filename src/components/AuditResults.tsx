"use client"

import React, { useState } from 'react';
import {
  Zap,
  Search,
  Smartphone,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ArrowRight,
  Lightbulb,
  ExternalLink,
  Lock,
  Mail,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AuditFullResult, CategoryScore } from '@/types/audit.types';

interface AuditResultsProps {
  results: AuditFullResult;
  onCtaClick?: () => void;
  locked?: boolean;
  onUnlockClick?: () => void;
}

const categoryConfig: Record<
  string,
  { label: string; icon: React.ElementType }
> = {
  performance: { label: 'Performance', icon: Zap },
  seo: { label: 'SEO', icon: Search },
  mobile: { label: 'Mobile', icon: Smartphone },
  security: { label: 'Security', icon: ShieldCheck },
};

function getGradeColor(grade: string): string {
  switch (grade) {
    case 'A':
    case 'B':
      return 'text-green-400';
    case 'C':
      return 'text-yellow-400';
    case 'D':
    case 'F':
      return 'text-red-400';
    default:
      return 'text-slate-400';
  }
}

function getGradeBg(grade: string): string {
  switch (grade) {
    case 'A':
    case 'B':
      return 'bg-green-500/10 border-green-500/20';
    case 'C':
      return 'bg-yellow-500/10 border-yellow-500/20';
    case 'D':
    case 'F':
      return 'bg-red-500/10 border-red-500/20';
    default:
      return 'bg-slate-500/10 border-slate-500/20';
  }
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-red-400';
}

function getScoreBarColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}

function getStatusIcon(status: CategoryScore['status']) {
  switch (status) {
    case 'good':
      return <CheckCircle size={14} className="text-green-400" />;
    case 'needs-work':
      return <AlertTriangle size={14} className="text-yellow-400" />;
    case 'critical':
      return <XCircle size={14} className="text-red-400" />;
  }
}

export const AuditResults: React.FC<AuditResultsProps> = ({
  results,
  onCtaClick,
  locked = false,
  onUnlockClick,
}) => {
  const [showRawMetrics, setShowRawMetrics] = useState(false);
  const [showLockOverlay, setShowLockOverlay] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const categoryEntries = Object.entries(results.categories) as [
    keyof typeof categoryConfig,
    CategoryScore,
  ][];

  // Show lock overlay after 10 seconds when locked
  React.useEffect(() => {
    if (locked && !showLockOverlay) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setShowLockOverlay(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [locked, showLockOverlay]);

  return (
    <div className="w-full animate-fade-in-up space-y-6 relative">
      {/* Countdown Badge - Shows during free preview */}
      {locked && !showLockOverlay && countdown > 0 && (
        <div className="fixed top-4 right-4 z-50 animate-pulse">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm">
            🔓 Free preview: {countdown}s remaining
          </div>
        </div>
      )}

      {/* Locked Overlay - Shows after 10 seconds */}
      {locked && showLockOverlay && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <Card className="relative z-10 max-w-md mx-4 bg-slate-800/95 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500/30 mb-4">
                <Lock className="text-cyan-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Want to Save This Report?
              </h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Enter your email to <span className="text-cyan-400 font-semibold">copy/save these results</span> and receive a <span className="text-cyan-400 font-semibold">detailed PDF report</span> in your inbox.
              </p>
              <Button
                onClick={onUnlockClick}
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/30 border-0"
              >
                <Mail size={18} className="mr-2" />
                Get My Free Report
              </Button>
              <p className="text-slate-500 text-xs mt-4">
                🔒 No spam, ever. We respect your privacy.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Results Content - Locked state prevents interaction after overlay shows */}
      <div className={locked && showLockOverlay ? 'pointer-events-none select-none blur-[0.5px] opacity-90' : ''}>

      {/* Header - Grade Badge */}
      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Grade circle */}
            <div
              className={`flex items-center justify-center w-24 h-24 rounded-full border-2 ${getGradeBg(results.grade)}`}
            >
              <span
                className={`text-5xl font-bold ${getGradeColor(results.grade)}`}
              >
                {results.grade}
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-xl font-bold text-white">
                  Overall Score: {results.score}/100
                </h3>
                <Badge
                  className={`text-xs ${getGradeBg(results.grade)} ${getGradeColor(results.grade)} border`}
                >
                  Grade {results.grade}
                </Badge>
              </div>
              <p className="text-slate-400 text-sm mb-3">{results.summary}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ExternalLink size={12} />
                <span className="truncate">{results.url}</span>
                <span>|</span>
                <span>{results.totalIssues} issues found</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Grid - Following TrustBar.tsx grid pattern */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryEntries.map(([key, category]) => {
          const config = categoryConfig[key];
          const Icon = config.icon;
          return (
            <Card
              key={key}
              className="bg-slate-800/30 border-slate-700/50 hover:border-cyan-500/20 transition-colors"
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="text-cyan-400" size={18} />
                  <span className="text-sm font-medium text-white">
                    {config.label}
                  </span>
                  {getStatusIcon(category.status)}
                </div>

                {/* Score bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <span
                      className={`text-2xl font-bold ${getScoreColor(category.score)}`}
                    >
                      {category.score}
                    </span>
                    <span className="text-xs text-slate-500">/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${getScoreBarColor(category.score)}`}
                      style={{ width: `${category.score}%` }}
                    />
                  </div>
                </div>

                {/* Issue count */}
                <p className="text-xs text-slate-500">
                  {category.issues.length}{' '}
                  {category.issues.length === 1 ? 'issue' : 'issues'} found
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Wins */}
      {results.quickWins.length > 0 && (
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-yellow-400" size={18} />
              <h4 className="text-base font-bold text-white">Quick Wins</h4>
              <Badge className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs">
                {results.quickWins.length} actions
              </Badge>
            </div>
            <ul className="space-y-2">
              {results.quickWins.map((win, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle
                    size={14}
                    className="text-cyan-400 mt-0.5 shrink-0"
                  />
                  <span className="text-slate-300">{win}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Raw Metrics (Collapsible) */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-0">
          <button
            onClick={() => setShowRawMetrics(!showRawMetrics)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/20 transition-colors rounded-xl"
          >
            <span className="text-sm font-medium text-white">
              Detailed Issues ({results.totalIssues})
            </span>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform duration-200 ${showRawMetrics ? 'rotate-180' : ''}`}
            />
          </button>

          {showRawMetrics && (
            <div className="px-5 pb-5 space-y-4">
              {categoryEntries.map(([key, category]) => {
                if (category.issues.length === 0) return null;
                const config = categoryConfig[key];
                return (
                  <div key={key}>
                    <h5 className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-2">
                      {config.label}
                    </h5>
                    <div className="space-y-2">
                      {category.issues.map((issue, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {issue.severity === 'critical' && (
                              <XCircle size={12} className="text-red-400" />
                            )}
                            {issue.severity === 'warning' && (
                              <AlertTriangle
                                size={12}
                                className="text-yellow-400"
                              />
                            )}
                            {issue.severity === 'good' && (
                              <CheckCircle
                                size={12}
                                className="text-green-400"
                              />
                            )}
                            <span className="text-sm font-medium text-white">
                              {issue.title}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 ml-5">
                            {issue.description}
                          </p>
                          {issue.impact && (
                            <p className="text-xs text-cyan-400/70 ml-5 mt-1">
                              Impact: {issue.impact}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* CTA Footer */}
      {onCtaClick && (
        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-cyan-500/20">
          <CardContent className="p-6 text-center">
            <h4 className="text-lg font-bold text-white mb-2">
              Ready to Fix These Issues?
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              Our team can implement all recommended improvements and boost your
              online presence.
            </p>
            <Button
              onClick={onCtaClick}
              className="h-11 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20 border-0"
            >
              Get a Free Consultation
              <ArrowRight size={16} />
            </Button>
          </CardContent>
        </Card>
      )}
      </div>
      {/* End Results Content */}
    </div>
  );
};
