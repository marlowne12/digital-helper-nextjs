"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Play, Building2 } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
    id: number
    author: string
    role: string
    company: string
    industry: string
    content: string
    rating: number
    avatar?: string
    videoUrl?: string
    metrics?: {
        label: string
        value: string
    }
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        author: "Sarah Jenkins",
        role: "Owner",
        company: "Tri-Cities Coffee Co.",
        industry: "Restaurant",
        content: "Digital Helper completely transformed our online presence. Our mobile traffic has doubled, and customers love the new menu layout. Best investment we've made this year.",
        rating: 5,
        metrics: { label: "Mobile Traffic", value: "+127%" }
    },
    {
        id: 2,
        author: "Mike Peterson",
        role: "General Manager",
        company: "Richland Auto Repair",
        industry: "Automotive",
        content: "The AI chat feature is a game changer. It answers basic questions 24/7 and books appointments for us. I'm saving at least 10 hours a week on phone calls.",
        rating: 5,
        metrics: { label: "Hours Saved", value: "10+/week" }
    },
    {
        id: 3,
        author: "Lisa Chen",
        role: "Director",
        company: "Chen Real Estate Group",
        industry: "Real Estate",
        content: "Our old site was slow and invisible on Google. After the redesign and SEO work, we're ranking #1 for our main keywords in Kennewick. The ROI has been incredible.",
        rating: 5,
        metrics: { label: "Google Rank", value: "#1" }
    },
    {
        id: 4,
        author: "David Martinez",
        role: "Owner",
        company: "Martinez HVAC Solutions",
        industry: "HVAC",
        content: "I was skeptical about AI automation, but the results speak for themselves. We've captured 47 leads in the first month that would have been missed calls. At 3am, the AI was still booking appointments.",
        rating: 5,
        metrics: { label: "New Leads", value: "47/month" }
    },
    {
        id: 5,
        author: "Jennifer Walsh",
        role: "Practice Manager",
        company: "Columbia Basin Dental",
        industry: "Healthcare",
        content: "Our patients love being able to book appointments online any time. The automated reminders have cut our no-show rate in half. Digital Helper made the whole process painless.",
        rating: 5,
        metrics: { label: "No-Shows", value: "-50%" }
    },
    {
        id: 6,
        author: "Robert Kim",
        role: "CEO",
        company: "Pacific Northwest Plumbing",
        industry: "Plumbing",
        content: "We went from page 3 on Google to showing up in the local pack. Emergency calls have tripled because we're now the first result people see when their pipes burst at 2am.",
        rating: 5,
        metrics: { label: "Emergency Calls", value: "+3x" }
    },
    {
        id: 7,
        author: "Amanda Foster",
        role: "Marketing Director",
        company: "Cascade Electric",
        industry: "Electrical",
        content: "The automated review collection system is brilliant. We went from 23 Google reviews to over 150 in just 6 months. Our reputation is now a competitive advantage.",
        rating: 5,
        metrics: { label: "Google Reviews", value: "23→150" }
    },
    {
        id: 8,
        author: "Carlos Rivera",
        role: "Owner",
        company: "Rivera Landscaping",
        industry: "Landscaping",
        content: "The before/after gallery with the AI chatbot has been incredible for conversions. Customers can see our work and get instant quotes without me being available. Revenue is up 40%.",
        rating: 5,
        metrics: { label: "Revenue", value: "+40%" }
    }
]

const industries = ["All", ...Array.from(new Set(testimonials.map(t => t.industry)))]

export function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [selectedIndustry, setSelectedIndustry] = useState("All")
    const [isMobile, setIsMobile] = useState(false)
    const [touchStart, setTouchStart] = useState(0)

    const filteredTestimonials = selectedIndustry === "All"
        ? testimonials
        : testimonials.filter(t => t.industry === selectedIndustry)

    // Responsive check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Auto-play
    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(() => {
            setDirection(1)
            setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [isAutoPlaying, filteredTestimonials.length])

    // Reset index when filter changes
    useEffect(() => {
        setCurrentIndex(0)
    }, [selectedIndustry])

    const handlePrev = useCallback(() => {
        setIsAutoPlaying(false)
        setDirection(-1)
        setCurrentIndex((prev) => 
            prev === 0 ? filteredTestimonials.length - 1 : prev - 1
        )
    }, [filteredTestimonials.length])

    const handleNext = useCallback(() => {
        setIsAutoPlaying(false)
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
    }, [filteredTestimonials.length])

    const handleDotClick = (index: number) => {
        setIsAutoPlaying(false)
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
    }

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX)
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEnd = e.changedTouches[0].clientX
        const diff = touchStart - touchEnd
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext()
            else handlePrev()
        }
    }

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        })
    }

    const currentTestimonial = filteredTestimonials[currentIndex]

    if (!currentTestimonial) {
        return null
    }

    return (
        <section className="py-24 bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
            
            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="ml-2 text-zinc-400 text-sm">
                                4.9/5 from {testimonials.length * 12}+ reviews
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                                Local Businesses Love Us
                            </span>
                        </h2>

                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Real results from real businesses in the Pacific Northwest
                        </p>
                    </motion.div>
                </div>

                {/* Industry Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {industries.map((industry) => (
                        <button
                            key={industry}
                            onClick={() => setSelectedIndustry(industry)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                selectedIndustry === industry
                                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                        >
                            {industry}
                        </button>
                    ))}
                </div>

                {/* Carousel Container */}
                <div 
                    className="relative max-w-4xl mx-auto"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Main Card */}
                    <div className="relative overflow-hidden rounded-3xl min-h-[400px] md:min-h-[350px]">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentTestimonial.id}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-700/50 backdrop-blur-xl shadow-2xl"
                            >
                                {/* Quote Icon */}
                                <Quote className="absolute top-8 right-8 w-16 h-16 text-purple-500/10" />

                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Left: Content */}
                                    <div className="flex-1">
                                        {/* Rating */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>

                                        {/* Quote */}
                                        <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-medium">
                                            &ldquo;{currentTestimonial.content}&rdquo;
                                        </blockquote>

                                        {/* Author */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                                                {currentTestimonial.avatar ? (
                                                    <Image
                                                        src={currentTestimonial.avatar}
                                                        alt={currentTestimonial.author}
                                                        width={56}
                                                        height={56}
                                                        className="rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-white font-bold text-xl">
                                                        {currentTestimonial.author.charAt(0)}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <div className="text-white font-bold text-lg">{currentTestimonial.author}</div>
                                                <div className="text-slate-400">
                                                    {currentTestimonial.role} at {currentTestimonial.company}
                                                </div>
                                            </div>

                                            {/* Industry Badge */}
                                            <div className="hidden md:flex items-center gap-2 ml-auto px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                                <Building2 className="w-4 h-4 text-purple-400" />
                                                <span className="text-sm text-zinc-400">{currentTestimonial.industry}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Metric Card */}
                                    {currentTestimonial.metrics && (
                                        <div className="md:w-48 flex-shrink-0">
                                            <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex flex-col items-center justify-center text-center">
                                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                                    {currentTestimonial.metrics.value}
                                                </div>
                                                <div className="text-sm text-purple-200 font-medium">
                                                    {currentTestimonial.metrics.label}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Video CTA (if available) */}
                                {currentTestimonial.videoUrl && (
                                    <button className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                                        <Play className="w-4 h-4" />
                                        <span className="text-sm font-medium">Watch Video Testimonial</span>
                                    </button>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 backdrop-blur-sm"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 backdrop-blur-sm"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {filteredTestimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`transition-all duration-300 rounded-full ${
                                    index === currentIndex
                                        ? 'w-8 h-2 bg-purple-500'
                                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Auto-play indicator */}
                    {isAutoPlaying && (
                        <div className="flex justify-center mt-4">
                            <div className="text-xs text-zinc-500 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Auto-playing
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
                >
                    {[
                        { value: "50+", label: "Local Businesses" },
                        { value: "4.9", label: "Average Rating" },
                        { value: "98%", label: "Client Retention" },
                        { value: "127%", label: "Avg. Traffic Increase" }
                    ].map((stat, i) => (
                        <div 
                            key={i}
                            className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-zinc-500">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105"
                    >
                        Join Our Success Stories
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
