"use client"

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Loader2, Calendar, FileSearch, DollarSign, Mail, CheckCircle } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { storeChatLead } from '@/app/actions/leads';
import { trackChatInteraction } from '@/lib/analytics';


export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Lead capture states
    const [showEmailCapture, setShowEmailCapture] = useState(false);
    const [email, setEmail] = useState('');
    const [emailCaptured, setEmailCaptured] = useState(false);
    const [capturingEmail, setCapturingEmail] = useState(false);
    const [userMessageCount, setUserMessageCount] = useState(0);
    const [hasAutoOpened, setHasAutoOpened] = useState(false);

    // Auto-open chat after a delay (only once)
    useEffect(() => {
        if (hasAutoOpened) return;

        const dismissed = localStorage.getItem('chat-dismissed');
        if (dismissed) return;

        const timer = setTimeout(() => {
            setIsOpen(true);
            setHasAutoOpened(true);
            trackChatInteraction('opened');
        }, 1500);
        return () => clearTimeout(timer);
    }, [hasAutoOpened]);

    // Show email capture after 3+ user messages
    useEffect(() => {
        if (userMessageCount >= 3 && !emailCaptured && !showEmailCapture) {
            setShowEmailCapture(true);
        }
    }, [userMessageCount, emailCaptured, showEmailCapture]);

    // Manual state management for input since useChat in this version doesn't provide it
    const [input, setInput] = React.useState('');
    const { messages, sendMessage, status, setMessages } = useChat();

    // Set initial welcome message
    React.useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: "👋 **Hi! I'm your AI Digital Partner.**\n\nI'm equipped with real-time tools to help you grow:\n\n🚀 **Instant Project Quotes** (Get a price in seconds)\n🔍 **Live Website Audits** (I'll analyze your site's SEO & speed)\n📅 **Priority Scheduling** (Book a meeting instantly)\n\nTry asking: *'Audit google.com'* or *'I need a quote for a new store'*"
                } as any // eslint-disable-line @typescript-eslint/no-explicit-any
            ]);
        }
    }, [messages.length, setMessages]);

    const isLoading = status === 'streaming' || status === 'submitted';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user' as const, content: input };
        setInput('');
        setUserMessageCount(prev => prev + 1);
        trackChatInteraction('message_sent', userMessageCount + 1);
        await sendMessage(userMessage as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!email || !isValidEmail) {
            alert('Please enter a valid email address.');
            return;
        }

        setCapturingEmail(true);
        try {
            const conversationSummary = messages
                .filter((m: any) => m.role === 'user') // eslint-disable-line @typescript-eslint/no-explicit-any
                .map((m: any) => m.content) // eslint-disable-line @typescript-eslint/no-explicit-any
                .slice(-3)
                .join(' | ');

            await storeChatLead({
                email,
                conversationSummary,
                messageCount: userMessageCount,
            });
            setEmailCaptured(true);
            setShowEmailCapture(false);
        } catch (error) {
            console.error('Failed to store chat lead', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setCapturingEmail(false);
        }
    };

    const dismissEmailCapture = () => {
        setShowEmailCapture(false);
    };

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, scrollToBottom]);

    // Helper to render tool results or icons in chat
    const renderToolResult = useCallback((toolInvocations: any[]) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        if (!toolInvocations) return null;

        return toolInvocations.map((tool, idx) => {
            if (tool.toolName === 'generateQuote' && 'result' in tool) {
                return (
                    <div key={idx} className="mt-2 p-3 bg-teal-900/40 border border-teal-500/30 rounded-lg text-sm">
                        <div className="flex items-center gap-2 text-teal-300 font-semibold mb-1">
                            <DollarSign size={14} /> Price Estimate: ${tool.result.estimatedPrice}
                        </div>
                        <p className="text-white/80">{tool.result.message}</p>
                    </div>
                );
            }
            if (tool.toolName === 'scheduleCall' && 'result' in tool) {
                return (
                    <div key={idx} className="mt-2 p-3 bg-indigo-900/40 border border-indigo-500/30 rounded-lg text-sm">
                        <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-1">
                            <Calendar size={14} /> Schedule a Call
                        </div>
                        <a
                            href={tool.result.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium transition-colors"
                        >
                            Book Time via Calendly
                        </a>
                    </div>
                );
            }
            if (tool.toolName === 'analyzeWebsite' && 'result' in tool) {
                return (
                    <div key={idx} className="mt-2 p-3 bg-orange-900/40 border border-orange-500/30 rounded-lg text-sm">
                        <div className="flex items-center gap-2 text-orange-300 font-semibold mb-1">
                            <FileSearch size={14} /> Site Analysis: {tool.result.score}/100
                        </div>
                        <ul className="list-disc list-inside text-white/80 space-y-1 mb-2">
                            {tool.result.issues.map((issue: string, i: number) => (
                                <li key={i}>{issue}</li>
                            ))}
                        </ul>
                        <p className="text-orange-200/80 italic text-xs">&quot;{tool.result.opportunity}&quot;</p>
                    </div>
                );
            }
            return null;
        });
    }, []);


    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <Card className="mb-4 w-[90vw] max-w-[380px] h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-float">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-teal-600 to-cyan-600 flex justify-between items-center text-white shadow-lg">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 rounded-full">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Digital Helper AI</h3>
                                <span className="text-xs text-cyan-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 text-white h-8 w-8 rounded-full"
                        >
                            <X size={18} />
                        </Button>
                    </div>

                    {/* Messages */}
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-transparent">
                        {messages.map((msg: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                                        ? 'bg-cyan-600 text-white rounded-tr-none'
                                        : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'
                                        }`}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold mb-1 uppercase tracking-wider">
                                            <Bot size={12} /> Assistant
                                        </div>
                                    )}
                                    {msg.content}
                                    {msg.toolInvocations && renderToolResult(msg.toolInvocations)}
                                </div>
                            </div>
                        ))}
                        {isLoading && messages[messages.length - 1]?.role === 'user' && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 text-cyan-500 animate-spin" />
                                    <span className="text-xs text-slate-400">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </CardContent>

                    {/* Email Capture Banner */}
                    {showEmailCapture && !emailCaptured && (
                        <div className="p-3 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 border-t border-cyan-500/30">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-cyan-300 font-medium">
                                    Get insights sent to your inbox
                                </p>
                                <button
                                    onClick={dismissEmailCapture}
                                    className="text-slate-500 hover:text-white text-xs"
                                >
                                    Maybe later
                                </button>
                            </div>
                            <form onSubmit={handleEmailSubmit} className="flex gap-2">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email..."
                                    className="flex-1 h-8 text-xs bg-slate-800 border-slate-700 text-white"
                                />
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={capturingEmail}
                                    className="h-8 bg-cyan-600 hover:bg-cyan-500 text-xs"
                                >
                                    {capturingEmail ? <Loader2 className="w-3 h-3 animate-spin" /> : <Mail className="w-3 h-3" />}
                                </Button>
                            </form>
                        </div>
                    )}

                    {/* Email Captured Confirmation */}
                    {emailCaptured && (
                        <div className="p-2 bg-green-900/30 border-t border-green-500/30 flex items-center justify-center gap-2 text-xs text-green-400">
                            <CheckCircle className="w-3 h-3" />
                            Thanks! We&apos;ll be in touch.
                        </div>
                    )}

                    {/* Input */}
                    <CardFooter className="p-3 bg-slate-900 border-t border-slate-800">
                        <form onSubmit={handleSubmit} className="flex gap-2 relative w-full">
                            <Input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Ask about pricing, services..."
                                className="w-full bg-slate-800 text-white text-sm rounded-xl py-6 pl-4 pr-10 focus-visible:ring-cyan-500 border-slate-700"
                            />
                            <Button
                                size="icon"
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
                            >
                                <Send size={14} />
                            </Button>
                        </form>
                    </CardFooter>

                    <div className="text-[10px] text-center text-slate-500 pb-2 bg-slate-900">
                        Powered by Gemini Flash AI
                    </div>
                </Card>
            )}

            {/* Toggle Button */}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'scale-0' : 'scale-100'} transition-transform duration-300 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg hover:shadow-cyan-500/50 hover:bg-cyan-600 border-0`}
            >
                <MessageSquare size={24} />
            </Button>
        </div>
    );
};
