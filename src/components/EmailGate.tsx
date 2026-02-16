"use client"

import React, { useState } from 'react';
import { Mail, X, Loader2, CheckCircle, Shield } from 'lucide-react';
import { validateEmail } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface EmailGateProps {
  isOpen: boolean;
  onSubmit: (email: string) => void;
  onClose: () => void;
  title?: string;
  description?: string;
  ctaText?: string;
}

export const EmailGate: React.FC<EmailGateProps> = ({
  isOpen,
  onSubmit,
  onClose,
  title = 'Get Your Full Report',
  description = 'Enter your email to unlock the complete audit with actionable recommendations.',
  ctaText = 'Unlock Full Report',
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateEmail(email);
    if (!validation.valid) {
      setError(validation.error || 'Invalid email');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(email);
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <Card className="relative w-[90vw] max-w-[440px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl animate-fade-in-up overflow-hidden">
        {/* Gradient accent bar */}
        <div className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute top-4 right-4 hover:bg-slate-800 text-slate-400 hover:text-white h-8 w-8 rounded-full z-10"
        >
          <X size={16} />
        </Button>

        <CardContent className="p-8">
          {success ? (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                <CheckCircle className="text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Report Unlocked!</h3>
              <p className="text-slate-400 text-sm">
                Your full audit report is ready below.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                  <Mail className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                    disabled={loading}
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-400 text-xs mt-2">{error}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-cyan-500/20 border-0"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    ctaText
                  )}
                </Button>
              </form>

              {/* Privacy disclaimer */}
              <div className="flex items-center justify-center gap-1.5 mt-4 text-slate-500 text-xs">
                <Shield size={12} />
                <span>No spam, ever. We respect your privacy.</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
