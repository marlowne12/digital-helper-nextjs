"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, Users, ArrowRight, Sparkles, Check } from 'lucide-react'

interface IndustryData {
  name: string
  avgJobValue: number
  conversionLift: number // percentage increase expected
  description: string
}

const industries: Record<string, IndustryData> = {
  plumbing: {
    name: "Plumbing",
    avgJobValue: 450,
    conversionLift: 35,
    description: "Emergency calls + recurring maintenance"
  },
  hvac: {
    name: "HVAC",
    avgJobValue: 650,
    conversionLift: 40,
    description: "Seasonal peaks + service contracts"
  },
  electrical: {
    name: "Electrical",
    avgJobValue: 380,
    conversionLift: 30,
    description: "Residential + commercial projects"
  },
  landscaping: {
    name: "Landscaping",
    avgJobValue: 320,
    conversionLift: 45,
    description: "Recurring maintenance + seasonal work"
  },
  roofing: {
    name: "Roofing",
    avgJobValue: 8500,
    conversionLift: 25,
    description: "High-value projects + storm damage"
  },
  cleaning: {
    name: "Cleaning Services",
    avgJobValue: 180,
    conversionLift: 50,
    description: "Recurring clients + commercial contracts"
  },
  automotive: {
    name: "Auto Repair",
    avgJobValue: 420,
    conversionLift: 35,
    description: "Regular service + major repairs"
  },
  other: {
    name: "Other Service",
    avgJobValue: 400,
    conversionLift: 30,
    description: "Local service business"
  }
}

export function ROICalculator() {
  const [industry, setIndustry] = useState<string>("")
  const [avgJobValue, setAvgJobValue] = useState<number>(0)
  const [monthlyLeads, setMonthlyLeads] = useState<number>(0)
  const [conversionRate, setConversionRate] = useState<number>(20)
  const [showResults, setShowResults] = useState(false)
  const [isCustomValue, setIsCustomValue] = useState(false)

  // When industry changes, auto-fill average job value
  const handleIndustryChange = (selectedIndustry: string) => {
    setIndustry(selectedIndustry)
    if (selectedIndustry && industries[selectedIndustry] && !isCustomValue) {
      setAvgJobValue(industries[selectedIndustry].avgJobValue)
    }
    setShowResults(false)
  }

  const handleJobValueChange = (value: number) => {
    setAvgJobValue(value)
    setIsCustomValue(true)
    setShowResults(false)
  }

  // Calculate ROI projections
  const projections = useMemo(() => {
    if (!industry || !avgJobValue || !monthlyLeads) return null

    const industryData = industries[industry]
    const conversionLift = industryData?.conversionLift || 30

    // Current revenue
    const currentMonthlyJobs = (monthlyLeads * conversionRate) / 100
    const currentMonthlyRevenue = currentMonthlyJobs * avgJobValue
    const currentAnnualRevenue = currentMonthlyRevenue * 12

    // Projected with Digital Helper (conservative estimate)
    const newLeadsPercent = conversionLift / 100
    const projectedLeads = monthlyLeads * (1 + newLeadsPercent)
    const improvedConversionRate = Math.min(conversionRate * 1.15, 40) // 15% conversion improvement, cap at 40%
    const projectedMonthlyJobs = (projectedLeads * improvedConversionRate) / 100
    const projectedMonthlyRevenue = projectedMonthlyJobs * avgJobValue
    const projectedAnnualRevenue = projectedMonthlyRevenue * 12

    // ROI calculation
    const additionalAnnualRevenue = projectedAnnualRevenue - currentAnnualRevenue
    const estimatedInvestment = 1500 * 12 // Assuming ~$1500/mo average service cost
    const roi = ((additionalAnnualRevenue - estimatedInvestment) / estimatedInvestment) * 100

    return {
      currentMonthlyRevenue,
      currentAnnualRevenue,
      projectedLeads: Math.round(projectedLeads),
      projectedMonthlyJobs: Math.round(projectedMonthlyJobs * 10) / 10,
      projectedMonthlyRevenue,
      projectedAnnualRevenue,
      additionalAnnualRevenue,
      additionalMonthlyRevenue: additionalAnnualRevenue / 12,
      roi: Math.round(roi),
      leadIncrease: Math.round(newLeadsPercent * 100),
      conversionImprovement: Math.round((improvedConversionRate - conversionRate) / conversionRate * 100)
    }
  }, [industry, avgJobValue, monthlyLeads, conversionRate])

  const canCalculate = industry && avgJobValue > 0 && monthlyLeads > 0

  const handleCalculate = () => {
    if (canCalculate) {
      setShowResults(true)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <section id="roi-calculator" className="py-24 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
          >
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
              See Your Growth Potential
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Calculate how much additional revenue you could generate with a stronger digital presence.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 md:p-12"
          >
            {/* Input Form */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Industry Select */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-medium">
                  <Users className="w-4 h-4 text-purple-400" />
                  Your Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => handleIndustryChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                >
                  <option value="">Select your industry...</option>
                  {Object.entries(industries).map(([key, data]) => (
                    <option key={key} value={key}>{data.name}</option>
                  ))}
                </select>
                {industry && industries[industry] && (
                  <p className="text-slate-500 text-sm">{industries[industry].description}</p>
                )}
              </div>

              {/* Average Job Value */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-medium">
                  <DollarSign className="w-4 h-4 text-purple-400" />
                  Average Job Value
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    value={avgJobValue || ''}
                    onChange={(e) => handleJobValueChange(Number(e.target.value))}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  />
                </div>
                <p className="text-slate-500 text-sm">What&apos;s your typical job worth?</p>
              </div>

              {/* Monthly Leads */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-medium">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  Current Monthly Leads
                </label>
                <input
                  type="number"
                  value={monthlyLeads || ''}
                  onChange={(e) => {
                    setMonthlyLeads(Number(e.target.value))
                    setShowResults(false)
                  }}
                  placeholder="Enter number"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                />
                <p className="text-slate-500 text-sm">Calls, form fills, messages per month</p>
              </div>

              {/* Conversion Rate */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-medium">
                  <Check className="w-4 h-4 text-purple-400" />
                  Current Conversion Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={conversionRate}
                    onChange={(e) => {
                      setConversionRate(Math.min(100, Math.max(1, Number(e.target.value))))
                      setShowResults(false)
                    }}
                    min={1}
                    max={100}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                </div>
                <p className="text-slate-500 text-sm">% of leads that become paying jobs</p>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="text-center mb-8">
              <motion.button
                whileHover={{ scale: canCalculate ? 1.02 : 1 }}
                whileTap={{ scale: canCalculate ? 0.98 : 1 }}
                onClick={handleCalculate}
                disabled={!canCalculate}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  canCalculate
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                Calculate My ROI
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Results */}
            <AnimatePresence>
              {showResults && projections && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-slate-700 pt-8">
                    <h3 className="text-2xl font-bold text-white text-center mb-8">
                      Your Growth Projection
                    </h3>

                    {/* Comparison Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {/* Current State */}
                      <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                        <div className="text-slate-400 text-sm uppercase tracking-wider mb-4">Currently</div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">Monthly Leads</span>
                            <span className="text-white font-semibold">{monthlyLeads}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">Monthly Revenue</span>
                            <span className="text-white font-semibold">{formatCurrency(projections.currentMonthlyRevenue)}</span>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                            <span className="text-slate-300">Annual Revenue</span>
                            <span className="text-xl text-white font-bold">{formatCurrency(projections.currentAnnualRevenue)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Projected State */}
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">
                            With Digital Helper
                          </span>
                        </div>
                        <div className="text-purple-300 text-sm uppercase tracking-wider mb-4">Projected</div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">Monthly Leads</span>
                            <span className="text-white font-semibold">
                              {projections.projectedLeads}
                              <span className="text-green-400 text-sm ml-2">+{projections.leadIncrease}%</span>
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">Monthly Revenue</span>
                            <span className="text-white font-semibold">{formatCurrency(projections.projectedMonthlyRevenue)}</span>
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-purple-500/30">
                            <span className="text-slate-300">Annual Revenue</span>
                            <span className="text-xl text-white font-bold">{formatCurrency(projections.projectedAnnualRevenue)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                      >
                        <div className="text-3xl font-bold text-green-400">
                          +{formatCurrency(projections.additionalMonthlyRevenue)}
                        </div>
                        <div className="text-slate-400 text-sm">Monthly Increase</div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                      >
                        <div className="text-3xl font-bold text-green-400">
                          +{formatCurrency(projections.additionalAnnualRevenue)}
                        </div>
                        <div className="text-slate-400 text-sm">Annual Increase</div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center p-4 rounded-xl bg-purple-500/10 border border-purple-500/20"
                      >
                        <div className="text-3xl font-bold text-purple-400">
                          +{projections.leadIncrease}%
                        </div>
                        <div className="text-slate-400 text-sm">More Leads</div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center p-4 rounded-xl bg-purple-500/10 border border-purple-500/20"
                      >
                        <div className="text-3xl font-bold text-purple-400">
                          {projections.roi > 0 ? '+' : ''}{projections.roi}%
                        </div>
                        <div className="text-slate-400 text-sm">Est. ROI</div>
                      </motion.div>
                    </div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-center"
                    >
                      <p className="text-slate-400 mb-4">
                        Ready to unlock this growth potential?
                      </p>
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
                      >
                        Get Your Free Strategy Call
                        <ArrowRight className="w-5 h-5" />
                      </a>
                      <p className="text-slate-500 text-sm mt-4">
                        * Projections based on industry averages. Actual results may vary.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
