'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    Building2,
    Send,
    Loader2,
    CheckCircle,
    ChevronRight,
    Phone,
    Clock,
    MapPin,
    Sparkles,
    ArrowRight,
    X,
    Plus,
    MessageSquare,
    Zap,
    Code2,
} from 'lucide-react';
import Link from 'next/link';

interface BusinessContext {
    name: string;
    type: string;
    city: string;
    phone: string;
    hours: string;
    services: string[];
    description: string;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const BUSINESS_TYPES = [
    { value: 'HVAC company', label: 'HVAC' },
    { value: 'plumbing company', label: 'Plumbing' },
    { value: 'dental practice', label: 'Dentist' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'auto repair shop', label: 'Auto Repair' },
    { value: 'law firm', label: 'Law Firm' },
    { value: 'real estate agency', label: 'Real Estate' },
    { value: 'general contracting business', label: 'Contractor' },
    { value: 'landscaping company', label: 'Landscaping' },
    { value: 'salon or spa', label: 'Salon / Spa' },
    { value: 'chiropractic office', label: 'Chiropractor' },
    { value: 'gym or fitness studio', label: 'Fitness' },
];

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
    default: [
        'What are your hours?',
        'Can I get a free estimate?',
        'Do you service my area?',
    ],
    'HVAC company': [
        'My AC stopped working — how fast can you come?',
        'How much does a tune-up cost?',
        'Do you do emergency service?',
    ],
    'plumbing company': [
        'I have a leaking pipe — can someone come today?',
        'Do you fix water heaters?',
        'What areas do you serve?',
    ],
    'dental practice': [
        'Are you accepting new patients?',
        'Do you take my insurance?',
        'I have a toothache — can I get an appointment today?',
    ],
    'restaurant': [
        'What time do you close tonight?',
        'Do you take reservations?',
        'Do you have vegetarian options?',
    ],
};

function getSuggestedQuestions(type: string): string[] {
    return SUGGESTED_QUESTIONS[type] ?? SUGGESTED_QUESTIONS.default;
}

type Step = 'form' | 'loading' | 'chat';

export default function DemoBuilder() {
    const [step, setStep] = useState<Step>('form');
    const [business, setBusiness] = useState<BusinessContext>({
        name: '',
        type: 'HVAC company',
        city: '',
        phone: '',
        hours: 'Mon–Fri 8am–6pm, Sat 9am–2pm',
        services: [],
        description: '',
    });
    const [serviceInput, setServiceInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [streaming, setStreaming] = useState(false);
    const [gbpLoading, setGbpLoading] = useState(false);
    const [gbpError, setGbpError] = useState('');
    const [formError, setFormError] = useState('');
    const [messageCount, setMessageCount] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (step === 'chat') {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [step]);

    const handleAutoFill = async () => {
        if (!business.name || !business.city) {
            setGbpError('Enter your business name and city first.');
            return;
        }
        setGbpError('');
        setGbpLoading(true);
        try {
            const res = await fetch('/api/gbp-lookup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: `${business.name} ${business.city}` }),
            });
            if (res.ok) {
                const data = await res.json();
                setBusiness((prev) => ({
                    ...prev,
                    phone: data.phone ?? prev.phone,
                    description: data.description ?? prev.description,
                    services: data.categories?.length ? data.categories.slice(0, 6) : prev.services,
                }));
            } else {
                setGbpError('Could not auto-fill — fill in manually below.');
            }
        } catch {
            setGbpError('Could not auto-fill — fill in manually below.');
        } finally {
            setGbpLoading(false);
        }
    };

    const handleAddService = () => {
        const trimmed = serviceInput.trim();
        if (trimmed && !business.services.includes(trimmed) && business.services.length < 12) {
            setBusiness((prev) => ({ ...prev, services: [...prev.services, trimmed] }));
            setServiceInput('');
        }
    };

    const handleRemoveService = (s: string) => {
        setBusiness((prev) => ({ ...prev, services: prev.services.filter((x) => x !== s) }));
    };

    const handleStartDemo = async () => {
        if (!business.name.trim()) {
            setFormError('Please enter your business name.');
            return;
        }
        setFormError('');
        setStep('loading');

        // Simulate knowledge-loading delay for dramatic effect
        await new Promise((r) => setTimeout(r, 2200));

        // Kick off with a welcome message from the AI
        const welcomeMsg: Message = {
            role: 'assistant',
            content: `Hi there! I'm the AI assistant for **${business.name}**. I can help with questions about our services, hours, and scheduling. How can I help you today?`,
        };
        setMessages([welcomeMsg]);
        setStep('chat');
    };

    const handleSend = async (text?: string) => {
        const userText = (text ?? input).trim();
        if (!userText || streaming) return;

        setInput('');
        const userMsg: Message = { role: 'user', content: userText };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setMessageCount((c) => c + 1);
        setStreaming(true);

        try {
            const res = await fetch('/api/demo-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: updated.map((m) => ({ role: m.role, content: m.content })),
                    businessContext: {
                        name: business.name,
                        type: business.type,
                        city: business.city || undefined,
                        phone: business.phone || undefined,
                        hours: business.hours || undefined,
                        services: business.services.length ? business.services : undefined,
                        description: business.description || undefined,
                    },
                }),
            });

            if (!res.ok || !res.body) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
                ]);
                return;
            }

            const assistantMsg: Message = { role: 'assistant', content: '' };
            setMessages((prev) => [...prev, assistantMsg]);

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let accumulated = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                accumulated += decoder.decode(value, { stream: true });
                setMessages((prev) => {
                    const copy = [...prev];
                    copy[copy.length - 1] = { role: 'assistant', content: accumulated };
                    return copy;
                });
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Connection error — please try again.' },
            ]);
        } finally {
            setStreaming(false);
        }
    };

    const renderMarkdown = (text: string) =>
        text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br/>');

    const embedSnippet = `<script src="https://widget.digital-helper.com/chat.js"
  data-business="${encodeURIComponent(business.name)}"
  data-type="${encodeURIComponent(business.type)}"
  data-city="${encodeURIComponent(business.city)}">
</script>`;

    return (
        <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
            <AnimatePresence mode="wait">

                {/* ── STEP: FORM ────────────────────────────────── */}
                {step === 'form' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-2xl mx-auto px-4 py-16"
                    >
                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-medium"
                                style={{ background: 'rgba(0,212,170,0.12)', color: '#00d4aa' }}>
                                <Sparkles className="w-4 h-4" />
                                Live AI Agent Demo
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                See Your AI Agent
                                <span className="block text-gradient">In 60 Seconds</span>
                            </h1>
                            <p className="text-gray-400 text-lg max-w-lg mx-auto">
                                Enter your business info and watch a custom AI assistant come to life — ready to answer your customers&apos; questions right now.
                            </p>
                        </div>

                        {/* Form Card */}
                        <div className="glass rounded-2xl p-8 space-y-6">
                            {/* Business Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Business Name <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={business.name}
                                        onChange={(e) => setBusiness({ ...business, name: e.target.value })}
                                        placeholder="e.g., Tri-Cities HVAC Pro"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-gray-500 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Business Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Business Type</label>
                                <div className="flex flex-wrap gap-2">
                                    {BUSINESS_TYPES.map((bt) => (
                                        <button
                                            key={bt.value}
                                            type="button"
                                            onClick={() => setBusiness({ ...business, type: bt.value })}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${business.type === bt.value
                                                    ? 'border-teal-500 text-teal-400 bg-teal-500/10'
                                                    : 'border-white/10 text-gray-400 bg-white/5 hover:border-white/20 hover:text-gray-300'
                                                }`}
                                        >
                                            {bt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* City + Phone row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            value={business.city}
                                            onChange={(e) => setBusiness({ ...business, city: e.target.value })}
                                            placeholder="Richland, WA"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-gray-500 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="tel"
                                            value={business.phone}
                                            onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
                                            placeholder="(509) 555-0100"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-gray-500 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Hours */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Business Hours</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={business.hours}
                                        onChange={(e) => setBusiness({ ...business, hours: e.target.value })}
                                        placeholder="Mon–Fri 8am–6pm, Sat 9am–2pm"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-gray-500 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Services */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Services <span className="text-gray-500 font-normal">(optional — add up to 12)</span>
                                </label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={serviceInput}
                                        onChange={(e) => setServiceInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                                        placeholder="e.g., AC installation"
                                        className="flex-1 px-4 py-2.5 rounded-xl text-white placeholder-gray-500 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddService}
                                        className="px-4 py-2.5 rounded-xl text-teal-400 border border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/20 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                {business.services.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {business.services.map((s) => (
                                            <span key={s} className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm bg-teal-500/10 text-teal-300 border border-teal-500/20">
                                                {s}
                                                <button type="button" onClick={() => handleRemoveService(s)} className="text-teal-400/60 hover:text-teal-300">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Auto-fill from GBP */}
                            <div className="border-t border-white/10 pt-5 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleAutoFill}
                                    disabled={gbpLoading}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/15 text-gray-300 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
                                >
                                    {gbpLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Zap className="w-4 h-4 text-yellow-400" />
                                    )}
                                    Auto-fill from Google
                                </button>
                                {gbpError && <p className="text-sm text-red-400">{gbpError}</p>}
                                {!gbpError && (
                                    <p className="text-xs text-gray-600">
                                        Pulls phone, description & categories from your Google Business Profile
                                    </p>
                                )}
                            </div>

                            {formError && (
                                <p className="text-sm text-red-400">{formError}</p>
                            )}

                            {/* CTA */}
                            <button
                                type="button"
                                onClick={handleStartDemo}
                                disabled={!business.name.trim()}
                                className="w-full py-4 rounded-xl text-white font-semibold text-lg bg-accent-gradient hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                Build My AI Agent
                                <ChevronRight className="w-5 h-5" />
                            </button>
                            <p className="text-center text-xs text-gray-600">No account required. Free demo.</p>
                        </div>
                    </motion.div>
                )}

                {/* ── STEP: LOADING ─────────────────────────────── */}
                {step === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center min-h-screen px-4 gap-8"
                    >
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-2xl bg-accent-gradient flex items-center justify-center mx-auto mb-6">
                                <Bot className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Building your AI agent…</h2>
                            <p className="text-gray-400">Loading knowledge for <span className="text-teal-400 font-medium">{business.name}</span></p>
                        </div>

                        <div className="w-full max-w-sm space-y-3">
                            {[
                                { label: 'Business profile loaded', delay: 0.1 },
                                { label: `${business.type} knowledge base ready`, delay: 0.5 },
                                { label: 'FAQ generation complete', delay: 1.0 },
                                { label: 'Lead capture tools armed', delay: 1.5 },
                                { label: 'Agent online', delay: 1.9 },
                            ].map(({ label, delay }) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay, duration: 0.4 }}
                                    className="flex items-center gap-3 text-sm"
                                >
                                    <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                                    <span className="text-gray-300">{label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── STEP: CHAT ────────────────────────────────── */}
                {step === 'chat' && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-2xl mx-auto px-4 py-10"
                    >
                        {/* Chat header */}
                        <div className="glass rounded-2xl overflow-hidden">
                            {/* Title bar */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10"
                                style={{ background: 'rgba(0,212,170,0.06)' }}>
                                <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white truncate">{business.name}</p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                                        <span className="text-xs text-teal-400">AI Assistant — Online</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { setStep('form'); setMessages([]); setMessageCount(0); }}
                                    className="text-gray-500 hover:text-gray-300 transition-colors"
                                    title="Start over"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="h-96 overflow-y-auto px-5 py-4 space-y-4">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.role === 'assistant' && (
                                            <div className="w-7 h-7 rounded-lg bg-accent-gradient flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                    ? 'bg-teal-600 text-white rounded-tr-sm'
                                                    : 'bg-white/8 text-gray-200 rounded-tl-sm border border-white/10'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content || '…') }}
                                        />
                                    </div>
                                ))}
                                {streaming && messages[messages.length - 1]?.role === 'user' && (
                                    <div className="flex justify-start">
                                        <div className="w-7 h-7 rounded-lg bg-accent-gradient flex items-center justify-center mr-2 flex-shrink-0">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl bg-white/8 border border-white/10">
                                            <span className="flex gap-1">
                                                <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Suggested questions */}
                            {messageCount < 2 && (
                                <div className="px-5 pb-3 flex flex-wrap gap-2">
                                    {getSuggestedQuestions(business.type).map((q) => (
                                        <button
                                            key={q}
                                            type="button"
                                            onClick={() => handleSend(q)}
                                            disabled={streaming}
                                            className="text-xs px-3 py-1.5 rounded-full border border-teal-500/30 text-teal-400 bg-teal-500/5 hover:bg-teal-500/15 transition-colors disabled:opacity-40"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input */}
                            <div className="px-4 pb-4">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    className="flex gap-2"
                                >
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        disabled={streaming}
                                        placeholder="Ask a question…"
                                        className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-500 bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm disabled:opacity-60"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || streaming}
                                        className="px-4 py-3 rounded-xl bg-accent-gradient text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                                    >
                                        {streaming ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Stats + CTA — appear after first real interaction */}
                        <AnimatePresence>
                            {messageCount >= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 space-y-4"
                                >
                                    {/* Stats row */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { icon: MessageSquare, label: 'Questions answered', value: `${messageCount}` },
                                            { icon: Clock, label: 'Avg response time', value: '< 2s' },
                                            { icon: Zap, label: 'Powered by', value: 'Gemini AI' },
                                        ].map(({ icon: Icon, label, value }) => (
                                            <div key={label} className="glass rounded-xl p-4 text-center">
                                                <Icon className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                                                <p className="text-lg font-bold text-white">{value}</p>
                                                <p className="text-xs text-gray-500">{label}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Embed code preview */}
                                    {messageCount >= 2 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="glass rounded-xl p-5"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <Code2 className="w-4 h-4 text-teal-400" />
                                                <p className="text-sm font-medium text-gray-300">Embed on your website in one line</p>
                                            </div>
                                            <pre className="text-xs text-teal-300 bg-black/40 rounded-lg p-3 overflow-x-auto border border-white/10 whitespace-pre-wrap break-all">
                                                {embedSnippet}
                                            </pre>
                                        </motion.div>
                                    )}

                                    {/* CTA */}
                                    <div className="rounded-2xl p-6 text-center bg-accent-gradient">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            Ready to deploy this on your site?
                                        </h3>
                                        <p className="text-white/80 text-sm mb-5">
                                            We configure, host, and maintain your AI agent — fully done-for-you. Setup in 48 hours.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-teal-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                            >
                                                Get Started — Free Strategy Call
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => { setStep('form'); setMessages([]); setMessageCount(0); }}
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 text-white font-medium rounded-xl hover:bg-white/25 transition-colors border border-white/20 text-sm"
                                            >
                                                Try a different business
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
