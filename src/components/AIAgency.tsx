"use client"

import React, { useState } from 'react';
import { Bot, Sparkles, Zap, Brain, MessageSquare, LineChart, Cpu, Workflow, CheckCircle2, ChevronDown, Wrench, Stethoscope, Scale, UtensilsCrossed, TrendingUp } from 'lucide-react';

export const AIAgency: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-slate-950 text-white selection:bg-pink-500/30">
            <div className="container mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-900/30 border border-pink-800 text-pink-400 text-xs font-semibold mb-6 animate-fade-in-up">
                        <Bot size={12} /> The Future of Local Business
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Automate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-500">Agency Growth</span>
                    </h1>
                    <p className="text-slate-400 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Stop wasting hours on repetitive tasks. We deploy custom AI agents and automated workflows that handle lead gen, content, and customer support while you sleep.
                    </p>
                </div>

                {/* AI Workflow Showcase */}
                <div className="mb-24 relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="absolute -inset-4 bg-gradient-to-r from-pink-600/20 to-violet-600/20 rounded-3xl blur-2xl group-hover:opacity-100 transition duration-500 opacity-0"></div>
                    <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                        <img
                            src="/assets/ai_workflows.png"
                            alt="AI Automation Workflows"
                            className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-lg">
                            <div className="flex items-center gap-2 text-pink-400 font-bold mb-2">
                                <Workflow size={24} />
                                <span className="text-2xl">Intelligent Workflows</span>
                            </div>
                            <p className="text-slate-300 text-sm md:text-base italic">"Our automation systems replace up to 40 hours of manual labor per week for local service businesses."</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    {/* Automation Pillars */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Core AI Services</h2>
                        {[
                            {
                                icon: <Sparkles className="text-yellow-400" />,
                                title: "AI Content Generation",
                                desc: "Perfectly crafted blog posts, social media updates, and ad copy. We train AI on your brand's unique voice for consistent excellence."
                            },
                            {
                                icon: <MessageSquare className="text-pink-400" />,
                                title: "24/7 Smart Appointment Setting",
                                desc: "Our AI chat agents qualify leads and book meetings directly into your calendar. Never miss a midnight inquiry again."
                            },
                            {
                                icon: <Brain className="text-violet-400" />,
                                title: "Lead Nurturing Automations",
                                desc: "Personalized email and SMS follow-up sequences that move prospects through your funnel with zero manual effort."
                            },
                            {
                                icon: <LineChart className="text-cyan-400" />,
                                title: "GMB Question & Answer AI",
                                desc: "Instantly respond to questions on your Google Business Profile, boosting local engagement and Maps rankings."
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-pink-500/30 transition-all group">
                                <div className="mt-1 p-3 bg-slate-950 rounded-xl border border-slate-800 h-fit group-hover:bg-slate-900 transition-colors">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-1 text-white group-hover:text-pink-300 transition-colors">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Neural Visualizer */}
                    <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-violet-600 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-8 flex flex-col justify-center items-center min-h-[400px]">
                            <div className="grid grid-cols-3 gap-8 relative">
                                {/* Connecting Lines (CSS-only decoration) */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <div className="w-full h-px bg-white"></div>
                                    <div className="w-px h-full bg-white absolute"></div>
                                </div>

                                {[Bot, Cpu, Brain, Zap, Workflow, Sparkles].map((Icon, idx) => (
                                    <div key={idx} className="relative z-10 w-16 h-16 bg-slate-950 rounded-full border border-pink-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)] animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }}>
                                        <Icon className="text-pink-400" size={32} />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 text-center">
                                <div className="text-pink-400 font-mono text-sm mb-2">ANALYZING WORKFLOWS...</div>
                                <div className="h-1.5 w-48 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-pink-500 w-1/2 animate-loading-bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Integration Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center mb-24">
                    <h2 className="text-3xl font-bold mb-4">Seamless Ecosystem</h2>
                    <p className="text-slate-400 mb-12">We integrate AI directly into the tools you already use.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Google Business', 'Facebook Ads', 'Gmail / Outlook', 'Zapier / Make'].map((tool) => (
                            <div key={tool} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center gap-3">
                                <CheckCircle2 size={16} className="text-pink-400" />
                                <span className="text-sm font-semibold">{tool}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ROI Calculator Section */}
                <ROICalculatorSection />

                {/* Industry Use Cases Section */}
                <IndustryUseCasesSection />

                {/* Implementation Timeline Section */}
                <ImplementationTimelineSection />

                {/* FAQ Section */}
                <FAQSection />

            </div>

            <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s infinite linear;
        }
      `}</style>
        </div>
    );
};

const ROICalculatorSection: React.FC = () => {
    const [currentLeads, setCurrentLeads] = useState(10);
    const [leadValue, setLeadValue] = useState(500);
    const [conversionRate, setConversionRate] = useState(25);

    const calculateROI = () => {
        const monthlySalesWithoutAI = (currentLeads * leadValue * conversionRate) / 100;
        const improvedLeads = currentLeads * 2.5;
        const improvedSales = (improvedLeads * leadValue * conversionRate) / 100;
        const monthlySavings = improvedSales - monthlySalesWithoutAI;
        const aiCost = 700;
        const netMonthly = monthlySavings - aiCost;
        const annual = netMonthly * 12;

        return {
            currentMonthly: monthlySalesWithoutAI,
            improvedMonthly: improvedSales,
            monthlySavings,
            aiCost,
            netMonthly,
            annual,
            improvedLeads
        };
    };

    const roi = calculateROI();

    return (
        <div className="mb-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Interactive ROI Calculator</h2>
                <p className="text-slate-400">See exactly how much AI automation could save your Tri-Cities business</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800 rounded-3xl p-8 md:p-12">
                {/* Input Controls */}
                <div className="space-y-8">
                    <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-200">
                            Current Monthly Leads
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="5"
                                max="100"
                                step="5"
                                value={currentLeads}
                                onChange={(e) => setCurrentLeads(Number(e.target.value))}
                                className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                            <span className="text-2xl font-bold text-pink-400 min-w-[60px]">{currentLeads}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-200">
                            Average Lead Value ($)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="100"
                                max="5000"
                                step="100"
                                value={leadValue}
                                onChange={(e) => setLeadValue(Number(e.target.value))}
                                className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                            <span className="text-2xl font-bold text-pink-400 min-w-[80px]">${leadValue}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-3 text-slate-200">
                            Conversion Rate (%)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="5"
                                max="75"
                                step="5"
                                value={conversionRate}
                                onChange={(e) => setConversionRate(Number(e.target.value))}
                                className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                            <span className="text-2xl font-bold text-pink-400 min-w-[60px]">{conversionRate}%</span>
                        </div>
                    </div>
                </div>

                {/* Results Display */}
                <div className="space-y-6">
                    <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6">
                        <p className="text-slate-400 text-sm mb-2">Current Monthly Revenue</p>
                        <div className="text-3xl font-bold text-cyan-400">${roi.currentMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>

                    <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6">
                        <p className="text-slate-400 text-sm mb-2">With AI Automation (2.5x Leads)</p>
                        <div className="text-3xl font-bold text-pink-400">${roi.improvedMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <p className="text-slate-400 text-xs mt-2">~{roi.improvedLeads.toFixed(0)} leads/month</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-900/20 to-violet-900/20 border border-pink-500/30 rounded-2xl p-6">
                        <p className="text-slate-300 text-sm mb-2 font-semibold">Monthly Net Savings</p>
                        <div className="text-3xl font-bold text-pink-300">${roi.netMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <p className="text-slate-400 text-xs mt-2">After ${roi.aiCost}/month in automation costs</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6">
                        <p className="text-slate-300 text-sm mb-2 font-semibold">Annual Savings Projection</p>
                        <div className="text-4xl font-bold text-green-400">${roi.annual.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                        <p className="text-slate-400 text-xs mt-2">12-month total</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const IndustryUseCasesSection: React.FC = () => {
    const industries = [
        {
            name: "HVAC & Home Services",
            icon: <Wrench className="text-orange-400" size={32} />,
            features: [
                "Automated appointment scheduling",
                "24/7 chatbot for emergency calls",
                "Review generation & response automation",
                "Lead qualification workflows"
            ],
            roi: "$3,000-5,000",
            roiDesc: "additional revenue/month"
        },
        {
            name: "Healthcare & Medical",
            icon: <Stethoscope className="text-red-400" size={32} />,
            features: [
                "Patient intake form automation",
                "Appointment reminder sequences",
                "Insurance verification chatbot",
                "Post-visit follow-up campaigns"
            ],
            roi: "$10,000+",
            roiDesc: "from 10-15 new patients/month"
        },
        {
            name: "Professional Services",
            icon: <Scale className="text-blue-400" size={32} />,
            features: [
                "Intelligent lead qualification",
                "Contract & document automation",
                "Email campaign orchestration",
                "Client nurture sequences"
            ],
            roi: "10+ hrs",
            roiDesc: "time saved per week"
        },
        {
            name: "Restaurants & Retail",
            icon: <UtensilsCrossed className="text-yellow-400" size={32} />,
            features: [
                "AI-powered online ordering",
                "Loyalty program automation",
                "Reservation management",
                "Inventory alert systems"
            ],
            roi: "+30%",
            roiDesc: "repeat customer increase"
        }
    ];

    return (
        <div className="mb-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Industry-Specific Use Cases</h2>
                <p className="text-slate-400">Proven AI solutions for Tri-Cities businesses</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {industries.map((industry, i) => (
                    <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:border-pink-500/30 transition-all hover:-translate-y-1">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                                {industry.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">{industry.name}</h3>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            {industry.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 size={16} className="text-pink-400 shrink-0 mt-1" />
                                    <span className="text-slate-300 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-slate-800">
                            <p className="text-slate-400 text-xs mb-1">Estimated ROI:</p>
                            <div className="text-2xl font-bold text-pink-400">{industry.roi}</div>
                            <p className="text-slate-400 text-xs mt-1">{industry.roiDesc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ImplementationTimelineSection: React.FC = () => {
    const timeline = [
        {
            phase: "Week 1-2",
            title: "Requirements & Discovery",
            icon: <Brain className="text-blue-400" size={32} />,
            tasks: [
                "Business process audit",
                "Identify automation opportunities",
                "Map customer journey",
                "Define success metrics"
            ]
        },
        {
            phase: "Week 3-4",
            title: "AI Model Training & Integration",
            icon: <Cpu className="text-purple-400" size={32} />,
            tasks: [
                "Configure AI models",
                "Train on your data & voice",
                "Build integration pipelines",
                "Set up testing environment"
            ]
        },
        {
            phase: "Week 5-6",
            title: "Testing & Refinement",
            icon: <Zap className="text-yellow-400" size={32} />,
            tasks: [
                "Comprehensive testing",
                "Gather feedback",
                "Fine-tune responses",
                "Performance optimization"
            ]
        },
        {
            phase: "Week 7-8",
            title: "Launch & Monitoring",
            icon: <TrendingUp className="text-green-400" size={32} />,
            tasks: [
                "Go live to production",
                "Team training & handoff",
                "24/7 monitoring",
                "Ongoing optimization"
            ]
        }
    ];

    return (
        <div className="mb-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Implementation Timeline</h2>
                <p className="text-slate-400">From discovery to full automation in 8 weeks</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
                {timeline.map((phase, i) => (
                    <div key={i} className="relative">
                        {/* Connection Line */}
                        {i < timeline.length - 1 && (
                            <div className="hidden md:block absolute top-16 left-[60%] w-[140%] h-0.5 bg-gradient-to-r from-pink-500/50 to-transparent"></div>
                        )}

                        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 relative z-10 hover:border-pink-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                                    {phase.icon}
                                </div>
                                <div className="text-pink-400 text-sm font-bold">{phase.phase}</div>
                            </div>

                            <h3 className="text-xl font-bold mb-4">{phase.title}</h3>

                            <ul className="space-y-2">
                                {phase.tasks.map((task, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                                        <CheckCircle2 size={14} className="text-pink-400 shrink-0 mt-0.5" />
                                        <span>{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "Is AI going to replace my employees?",
            a: "No. AI handles repetitive, time-consuming tasks so your team can focus on higher-value work like strategy, customer relationships, and growth. It's about augmenting your team, not replacing them. Most of our clients report increased team satisfaction because employees are doing more meaningful work."
        },
        {
            q: "What if the AI says something wrong?",
            a: "We build in multiple safeguards. All customer-facing AI responses are reviewed before sending. You maintain full control with a dashboard where you can approve, edit, or reject any AI-generated content. Critical decisions always require human approval."
        },
        {
            q: "Do I need technical skills to use this?",
            a: "Not at all. Our AI systems are designed for non-technical business owners. You interact through simple dashboards, no coding required. We handle all the technical setup and provide ongoing training and support."
        },
        {
            q: "How much does AI automation cost?",
            a: "It depends on what you automate. Single services start at $197/month (chatbot), while comprehensive automation packages run $497-997/month. Most clients see ROI within 2-4 months. We also offer custom pricing for larger implementations."
        },
        {
            q: "Can AI write in my unique brand voice?",
            a: "Yes! We train the AI on your existing content, brand guidelines, and communication style. The AI learns your voice through examples you provide. It takes 1-2 weeks of training, but once trained, it maintains consistency across all channels."
        },
        {
            q: "What happens if I want to cancel?",
            a: "You can cancel anytime—no long-term contracts. We keep all your data and AI models, so if you ever want to resume, we can restart quickly. We're confident in our results, so we don't use contracts to lock you in."
        },
        {
            q: "How do you ensure data privacy?",
            a: "Data privacy is paramount. We use bank-grade encryption, secure APIs, and never sell your data. All AI models are trained on your data and remain your property. We're compliant with GDPR, CCPA, and HIPAA (where applicable)."
        },
        {
            q: "Can you integrate AI with my existing tools?",
            a: "Yes! We integrate with Zapier, Make, CRM systems, email platforms, and most business software. If we can't integrate directly, we build custom connectors. Most integrations take 2-3 days to set up."
        }
    ];

    return (
        <div className="mb-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-400">Everything you need to know about AI automation for your business</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-900/60 transition-colors"
                        >
                            <span className="font-semibold text-lg pr-8">{faq.q}</span>
                            <ChevronDown
                                size={20}
                                className={`shrink-0 text-pink-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {openIndex === i && (
                            <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                                {faq.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
