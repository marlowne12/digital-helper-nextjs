"use client"

import React, { useState } from 'react';
import { Search, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react';
import { validateUrl, normalizeUrl } from '@/lib/validation';
import { EmailGate } from '@/components/EmailGate';
import { AuditResults } from '@/components/AuditResults';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import type { AuditState, AuditResponse } from '@/types/audit.types';

export const WebsiteAudit: React.FC = () => {
  const [state, setState] = useState<AuditState>({
    step: 'input',
    url: '',
    email: '',
    quickPreview: null,
    fullResults: null,
    error: null,
    isLoading: false,
  });

  const [showEmailGate, setShowEmailGate] = useState(false);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, error: null }));

    // Validate URL
    const validation = validateUrl(state.url);
    if (!validation.valid) {
      setState(prev => ({
        ...prev,
        error: validation.error || 'Invalid URL',
      }));
      return;
    }

    // Set loading state
    setState(prev => ({
      ...prev,
      step: 'loading',
      isLoading: true,
      error: null,
    }));

    try {
      // Call API with email to get FULL results immediately
      // But show them in LOCKED state until user provides email
      const response = await fetch('/api/website-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: normalizeUrl(state.url),
          // Pass a dummy email to trigger full results from API
          email: 'preview@digital-helper.com',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze website');
      }

      const data: AuditResponse = await response.json();

      // Guard: if the API returned no usable results, surface an error
      if (!data.fullResults && !data.quickPreview) {
        setState(prev => ({
          ...prev,
          step: 'input',
          isLoading: false,
          error: 'We could not complete the audit. Please check the URL and try again, or contact us directly.',
        }));
        return;
      }

      // Show FULL results immediately, but in LOCKED state
      setState(prev => ({
        ...prev,
        step: 'results',
        isLoading: false,
        quickPreview: data.quickPreview,
        fullResults: data.fullResults || null,
      }));

      // Don't auto-open email gate - let them see locked results first

    } catch (err) {
      setState(prev => ({
        ...prev,
        step: 'input',
        isLoading: false,
        error: 'We could not complete the audit. Please check the URL and try again, or contact us directly.',
      }));
    }
  };

  const handleEmailSubmit = async (email: string) => {
    try {
      // Save the email
      setState(prev => ({
        ...prev,
        email,
      }));

      console.log('📧 Email captured:', email);
      console.log('📄 Sending audit report to:', email);

      // Send email with audit results
      const emailResponse = await fetch('/api/send-audit-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          auditResults: state.fullResults,
          websiteUrl: state.url,
        }),
      });

      if (emailResponse.ok) {
        const emailData = await emailResponse.json();
        console.log('✅ Email sent successfully:', emailData.messageId);
      } else {
        console.error('⚠️ Email failed to send, but continuing...');
      }

      // Close email gate - results are already loaded, just unlock them
      setShowEmailGate(false);

    } catch (error) {
      console.error('Email submission failed:', error);
      // Still close the gate - results are already there (email is optional)
      setShowEmailGate(false);
    }
  };

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const handleNewAudit = () => {
    setState({
      step: 'input',
      url: '',
      email: '',
      quickPreview: null,
      fullResults: null,
      error: null,
      isLoading: false,
    });
    setShowEmailGate(false);
  };

  return (
    <section className="py-24 bg-slate-900 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-6 tracking-wide uppercase border border-cyan-500/20">
            <Search size={12} /> Free Website Analysis
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Is Your Website{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Costing You Customers?
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            Get an instant SEO audit and discover what's holding your site back from ranking on Google.
          </p>
        </div>

        {/* Input Form - Only show when in input or loading state */}
        {(state.step === 'input' || state.step === 'loading') && (
          <>
          {state.step === 'input' && state.error && (
            <div className="max-w-2xl mx-auto rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 mb-4">
              <p className="text-red-400 text-sm">{state.error}</p>
            </div>
          )}
          <Card className="max-w-2xl mx-auto bg-slate-950/50 border-slate-800 backdrop-blur-sm p-2 mb-12 shadow-2xl shadow-cyan-900/10">
            <CardContent className="p-4">
              <form onSubmit={handleAuditSubmit} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={20}
                  />
                  <Input
                    type="text"
                    placeholder="https://yourbusiness.com"
                    className="w-full pl-12 h-14 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                    value={state.url}
                    onChange={(e) => setState(prev => ({ ...prev, url: e.target.value }))}
                    disabled={state.isLoading}
                    required
                  />
                  {state.error && (
                    <p className="text-red-400 text-xs mt-2 ml-2">{state.error}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={state.isLoading || !state.url.trim()}
                  className="h-14 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-cyan-500/20 border-0"
                >
                  {state.isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      Analyzing...
                    </div>
                  ) : (
                    'Analyze My Website'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          </>
        )}

        {/* Loading State - Progress Messages */}
        {state.step === 'loading' && (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin"></div>
                  <div className="space-y-2">
                    <p className="text-white font-medium">Scanning your website...</p>
                    <p className="text-slate-400 text-sm">Analyzing SEO metrics...</p>
                    <p className="text-slate-500 text-xs">Grading performance...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error State - Shown when API call fails or returns no data */}
        {state.step === 'error' && (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-slate-800/50 border-red-800/40">
              <CardContent className="p-8">
                <div className="flex flex-col items-center gap-4">
                  <AlertTriangle size={40} className="text-red-400" />
                  <div className="space-y-2">
                    <p className="text-white font-semibold text-lg">Analysis Failed</p>
                    <p className="text-slate-300 text-sm">
                      Unable to complete analysis. Please try again or contact us for a manual audit.
                    </p>
                    {state.error && (
                      <p className="text-red-400 text-xs mt-1">{state.error}</p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <Button
                      onClick={handleNewAudit}
                      className="h-11 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold border-0"
                    >
                      Try Again
                    </Button>
                    <Button
                      onClick={handleContactClick}
                      variant="outline"
                      className="h-11 px-6 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      Request Manual Audit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Full Results - Show AuditResults Component (Locked until email provided) */}
        {state.step === 'results' && state.fullResults && (
          <div className="max-w-5xl mx-auto">
            <AuditResults
              results={state.fullResults}
              onCtaClick={handleContactClick}
              locked={!state.email}
              onUnlockClick={() => setShowEmailGate(true)}
            />

            {/* New Audit Button */}
            <div className="text-center mt-8">
              <Button
                onClick={handleNewAudit}
                variant="outline"
                className="h-11 px-6 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Analyze Another Website
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Email Gate Modal */}
      <EmailGate
        isOpen={showEmailGate}
        onSubmit={handleEmailSubmit}
        onClose={() => setShowEmailGate(false)}
        title="Get Your Full SEO Report"
        description="Enter your email to unlock the complete audit with detailed recommendations and quick wins."
        ctaText="Unlock Full Report"
      />
    </section>
  );
};
