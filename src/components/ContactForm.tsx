"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, 
    CheckCircle2, 
    AlertCircle, 
    Loader2,
    Building2,
    Globe,
    DollarSign,
    Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { contactFormSchema, type ContactFormData } from '@/lib/validators';
import { z } from 'zod';

const SERVICE_OPTIONS = [
    { value: 'web-design', label: 'Web Design & Development', icon: '🎨' },
    { value: 'seo', label: 'SEO & Local Search', icon: '📈' },
    { value: 'ai-automation', label: 'AI Automation', icon: '🤖' },
    { value: 'lead-generation', label: 'Lead Generation', icon: '🎯' },
    { value: 'reputation-management', label: 'Reputation Management', icon: '⭐' },
    { value: 'custom', label: 'Custom Solution', icon: '🔧' },
] as const;

const BUDGET_OPTIONS = [
    { value: 'under-1k', label: 'Under $1,000' },
    { value: '1k-3k', label: '$1,000 - $3,000' },
    { value: '3k-5k', label: '$3,000 - $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: 'over-10k', label: '$10,000+' },
    { value: 'not-sure', label: 'Not sure yet' },
] as const;

const TIMELINE_OPTIONS = [
    { value: 'asap', label: 'ASAP - Urgent' },
    { value: '1-2-weeks', label: '1-2 Weeks' },
    { value: '1-month', label: 'Within 1 Month' },
    { value: '2-3-months', label: '2-3 Months' },
    { value: 'flexible', label: 'Flexible' },
] as const;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FieldErrors {
    fullName?: string[];
    email?: string[];
    phone?: string[];
    company?: string[];
    service?: string[];
    budget?: string[];
    timeline?: string[];
    message?: string[];
    website?: string[];
}

export function ContactForm() {
    const [formData, setFormData] = React.useState<Partial<ContactFormData>>({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        service: undefined,
        budget: undefined,
        timeline: undefined,
        message: '',
        website: '',
        honeypot: '',
    });
    const [formState, setFormState] = React.useState<FormState>('idle');
    const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
    const [showAdvanced, setShowAdvanced] = React.useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear field error when user types
        if (fieldErrors[name as keyof FieldErrors]) {
            setFieldErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        setFieldErrors({});

        // Validate locally first
        try {
            contactFormSchema.parse(formData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setFieldErrors(error.flatten().fieldErrors as FieldErrors);
                setFormState('error');
                return;
            }
        }

        try {
                       const response = await fetch(\'/api/notion-leads\', {              method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setFormState('success');
            } else {
                if (result.details) {
                    setFieldErrors(result.details);
                }
                setFormState('error');
            }
        } catch {
            setFormState('error');
        }
    };

    const inputClasses = (fieldName: keyof FieldErrors) => `
        w-full px-4 py-3 
        bg-white/[0.03] border rounded-xl 
        text-white outline-none 
        transition-all duration-200
        placeholder:text-zinc-500
        ${fieldErrors[fieldName]
            ? 'border-red-500/50 focus:border-red-500'
            : 'border-white/[0.08] focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20'
        }
    `;

    const selectClasses = (fieldName: keyof FieldErrors) => `
        ${inputClasses(fieldName)}
        appearance-none cursor-pointer
        bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23888%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')]
        bg-no-repeat bg-[right_1rem_center] bg-[length:1rem]
    `;

    // Success state
    if (formState === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center"
                >
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">
                    Message Sent Successfully!
                </h3>
                <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                    Thanks for reaching out! We typically respond within 24 hours. 
                    Check your email for a confirmation.
                </p>
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <p className="text-sm text-zinc-300">
                            <strong className="text-white">What happens next?</strong>
                            <br />
                            Our team will review your inquiry and prepare a personalized response. 
                            For urgent matters, call us at{' '}
                            <a href="tel:+15098768454" className="text-indigo-400 hover:underline">
                                (509) 876-8454
                            </a>
                        </p>
                    </div>
                    <Button
                        onClick={() => {
                            setFormState('idle');
                            setFormData({
                                fullName: '',
                                email: '',
                                phone: '',
                                company: '',
                                service: undefined,
                                budget: undefined,
                                timeline: undefined,
                                message: '',
                                website: '',
                                honeypot: '',
                            });
                        }}
                        variant="outline"
                        className="text-zinc-400 hover:text-white"
                    >
                        Send Another Message
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Essential Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                        Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClasses('fullName')}
                    />
                    {fieldErrors.fullName && (
                        <p className="text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.fullName[0]}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                        Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={inputClasses('email')}
                    />
                    {fieldErrors.email && (
                        <p className="text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.email[0]}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Company Name
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Business Name"
                        className={inputClasses('company')}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(509) 555-0123"
                        className={inputClasses('phone')}
                    />
                </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    What can we help you with? <span className="text-red-400">*</span>
                </label>
                <select
                    name="service"
                    required
                    value={formData.service || ''}
                    onChange={handleChange}
                    className={selectClasses('service')}
                >
                    <option value="" disabled className="bg-slate-900">Select a service...</option>
                    {SERVICE_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value} className="bg-slate-900">
                            {opt.icon} {opt.label}
                        </option>
                    ))}
                </select>
                {fieldErrors.service && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.service[0]}
                    </p>
                )}
            </div>

            {/* Toggle for Advanced Fields */}
            <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2"
            >
                {showAdvanced ? '− Hide' : '+ Show'} budget & timeline options
            </button>

            {/* Advanced Fields (Budget & Timeline) */}
            <AnimatePresence>
                {showAdvanced && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="grid sm:grid-cols-2 gap-4 overflow-hidden"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Budget Range
                            </label>
                            <select
                                name="budget"
                                value={formData.budget || ''}
                                onChange={handleChange}
                                className={selectClasses('budget')}
                            >
                                <option value="" className="bg-slate-900">Select budget...</option>
                                {BUDGET_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value} className="bg-slate-900">
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Timeline
                            </label>
                            <select
                                name="timeline"
                                value={formData.timeline || ''}
                                onChange={handleChange}
                                className={selectClasses('timeline')}
                            >
                                <option value="" className="bg-slate-900">Select timeline...</option>
                                {TIMELINE_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value} className="bg-slate-900">
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="sm:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Current Website (if any)
                            </label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://yourwebsite.com"
                                className={inputClasses('website')}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Message */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    Tell us about your project <span className="text-red-400">*</span>
                </label>
                <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your goals, challenges, and what you're looking to achieve..."
                    className={`${inputClasses('message')} resize-none`}
                />
                {fieldErrors.message && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.message[0]}
                    </p>
                )}
                <p className="text-xs text-zinc-500">
                    The more details you provide, the better we can prepare for our conversation.
                </p>
            </div>

            {/* Honeypot (hidden from humans, traps bots) */}
            <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="absolute -left-[9999px] opacity-0 h-0 w-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />

            {/* Error Message */}
            {formState === 'error' && !Object.keys(fieldErrors).length && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                >
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <p className="text-sm text-red-300">
                        Something went wrong. Please try again or call us directly at{' '}
                        <a href="tel:+15098768454" className="underline">(509) 876-8454</a>
                    </p>
                </motion.div>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full h-14 text-lg group bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors"
            >
                {formState === 'submitting' ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        Send Message
                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </Button>

            <p className="text-xs text-zinc-500 text-center">
                By submitting this form, you agree to our{' '}
                <a href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</a>.
                We&apos;ll never share your information.
            </p>
        </form>
    );
}
