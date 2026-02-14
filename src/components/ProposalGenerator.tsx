"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    FileText,
    Loader2,
    CheckCircle,
    Clock,
    DollarSign,
    ArrowRight,
    Download,
    AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateProposal, type Proposal } from '@/app/actions/proposal'
import { trackProposalGeneration } from '@/lib/analytics'

interface ProposalGeneratorProps {
    initialBusinessName?: string;
    initialIndustry?: string;
    auditResult?: {
        score?: number;
        issues?: string[];
        opportunities?: string[];
    };
}

export function ProposalGenerator({
    initialBusinessName = '',
    initialIndustry = '',
    auditResult,
}: ProposalGeneratorProps) {
    const [businessName, setBusinessName] = useState(initialBusinessName)
    const [industry, setIndustry] = useState(initialIndustry)
    const [location, setLocation] = useState('Richland, WA')
    const [services, setServices] = useState<string[]>(['website'])
    const [budget, setBudget] = useState<'starter' | 'professional' | 'enterprise'>('professional')

    const [isGenerating, setIsGenerating] = useState(false)
    const [proposal, setProposal] = useState<Proposal | null>(null)
    const [error, setError] = useState('')

    const handleGenerate = async () => {
        if (!businessName || !industry) {
            setError('Please fill in all required fields')
            return
        }

        setError('')
        setIsGenerating(true)

        try {
            const result = await generateProposal({
                businessName,
                industry,
                location,
                auditResult,
                services: services as ('website' | 'seo' | 'automation' | 'reputation')[],
                budget,
            })

            if (result.success && result.proposal) {
                setProposal(result.proposal)
                trackProposalGeneration(businessName)
            } else {
                setError(result.error || 'Failed to generate proposal')
            }
        } catch {
            setError('An unexpected error occurred')
        } finally {
            setIsGenerating(false)
        }
    }

    const toggleService = (service: string) => {
        setServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        )
    }

    if (proposal) {
        return <ProposalView proposal={proposal} onBack={() => setProposal(null)} />
    }

    return (
        <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-accent-purple/10 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-accent-purple" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Generate Proposal</h2>
                    <p className="text-zinc-500">Get a customized service proposal in seconds</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Business Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-zinc-400 mb-2 block">Business Name *</label>
                        <Input
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="Your Business Name"
                            className="h-12 bg-white/5 border-white/10 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-zinc-400 mb-2 block">Industry *</label>
                        <Input
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="e.g., Plumbing, Dental, Legal"
                            className="h-12 bg-white/5 border-white/10 text-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Location</label>
                    <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, State"
                        className="h-12 bg-white/5 border-white/10 text-white"
                    />
                </div>

                {/* Services Selection */}
                <div>
                    <label className="text-sm text-zinc-400 mb-3 block">Services Needed</label>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { id: 'website', label: 'Website Design' },
                            { id: 'seo', label: 'SEO' },
                            { id: 'automation', label: 'AI Automation' },
                            { id: 'reputation', label: 'Reputation Management' },
                        ].map(service => (
                            <button
                                key={service.id}
                                onClick={() => toggleService(service.id)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${services.includes(service.id)
                                    ? 'bg-accent-purple text-white'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                    }`}
                            >
                                {service.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Budget */}
                <div>
                    <label className="text-sm text-zinc-400 mb-3 block">Budget Range</label>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { id: 'starter', label: 'Starter ($2.5K - $5K)' },
                            { id: 'professional', label: 'Professional ($5K - $15K)' },
                            { id: 'enterprise', label: 'Enterprise ($15K+)' },
                        ].map(option => (
                            <button
                                key={option.id}
                                onClick={() => setBudget(option.id as 'starter' | 'professional' | 'enterprise')}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${budget === option.id
                                    ? 'bg-accent-blue text-white'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !businessName || !industry}
                    className="w-full h-14 btn-primary text-lg font-bold rounded-xl"
                >
                    {isGenerating ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating Proposal...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            Generate Proposal
                            <ArrowRight className="w-5 h-5" />
                        </span>
                    )}
                </Button>
            </div>
        </div>
    )
}

function ProposalView({ proposal, onBack }: { proposal: Proposal; onBack: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="glass rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <button onClick={onBack} className="text-zinc-500 hover:text-white transition-colors">
                        ← Back to form
                    </button>
                    <Button size="sm" variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </Button>
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">
                    Proposal for {proposal.businessOverview.name}
                </h1>
                <p className="text-zinc-400 text-lg">{proposal.executiveSummary}</p>
            </div>

            {/* Critical Issues */}
            {proposal.auditFindings.criticalIssues.length > 0 && (
                <div className="glass rounded-3xl p-8">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        Critical Issues Identified
                    </h2>
                    <div className="space-y-4">
                        {proposal.auditFindings.criticalIssues.map((issue, i) => (
                            <div key={i} className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-white font-medium">{issue.issue}</p>
                                        <p className="text-zinc-500 text-sm mt-1">{issue.impact}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${issue.urgency === 'high' ? 'bg-red-500/20 text-red-400' :
                                        issue.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-zinc-500/20 text-zinc-400'
                                        }`}>
                                        {issue.urgency.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Solution */}
            <div className="glass rounded-3xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Proposed Solution</h2>
                <p className="text-zinc-400 mb-6">{proposal.proposedSolution.overview}</p>

                <div className="space-y-4">
                    {proposal.proposedSolution.phases.map((phase, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-8 h-8 rounded-full bg-accent-purple/20 text-accent-purple flex items-center justify-center text-sm font-bold">
                                    {i + 1}
                                </span>
                                <h3 className="text-white font-bold">{phase.name}</h3>
                                <span className="text-zinc-500 text-sm ml-auto">{phase.timeline}</span>
                            </div>
                            <p className="text-zinc-400 text-sm ml-11">{phase.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Investment */}
            <div className="glass rounded-3xl p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    Investment
                </h2>

                <div className="text-4xl font-bold text-accent-purple mb-6">
                    {proposal.investment.totalEstimate}
                </div>

                <div className="space-y-3 mb-6">
                    {proposal.investment.breakdown.map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                            <span className="text-zinc-400">{item.item}</span>
                            <span className="text-white font-medium">{item.cost}</span>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <p className="text-green-400 font-medium">Expected ROI: {proposal.investment.roi}</p>
                </div>
            </div>

            {/* Timeline */}
            <div className="glass rounded-3xl p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent-blue" />
                    Timeline: {proposal.timeline.totalDuration}
                </h2>

                <div className="flex flex-wrap gap-4">
                    {proposal.timeline.milestones.map((milestone, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
                            <CheckCircle className="w-4 h-4 text-accent-purple" />
                            <span className="text-white text-sm">{milestone.name}</span>
                            <span className="text-zinc-500 text-xs">{milestone.week}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Next Steps */}
            <div className="glass rounded-3xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Next Steps</h2>

                <div className="space-y-4">
                    {proposal.nextSteps.map((step) => (
                        <div key={step.step} className="flex items-start gap-4">
                            <span className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">
                                {step.step}
                            </span>
                            <p className="text-zinc-300 pt-1">{step.action}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-accent-purple/10 border border-accent-purple/20 rounded-xl">
                    <p className="text-accent-purple font-medium">{proposal.guarantee}</p>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <Button asChild className="h-14 px-12 btn-primary text-lg font-bold rounded-xl">
                    <a href="/contact">
                        Accept Proposal & Get Started
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                </Button>
            </div>
        </motion.div>
    )
}
