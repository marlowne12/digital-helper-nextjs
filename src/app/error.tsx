"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-background-primary flex items-center justify-center px-6">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-red-500/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] bg-accent-primary/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-lg w-full text-center"
            >
                {/* Error Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-12 h-12 text-red-400" />
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Something went wrong
                </h1>
                <p className="text-zinc-400 text-lg mb-8 max-w-md mx-auto">
                    We encountered an unexpected error. This has been logged and we&apos;ll look into it.
                </p>

                {/* Error Details (Development) */}
                {process.env.NODE_ENV === 'development' && error.message && (
                    <div className="glass p-4 rounded-xl mb-8 text-left">
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Error Details</p>
                        <code className="text-red-400 text-sm break-all">{error.message}</code>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => reset()}
                        className="h-14 px-8 btn-primary text-lg font-bold rounded-xl group"
                    >
                        <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="h-14 px-8 btn-secondary text-lg rounded-xl group"
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-5 h-5" />
                            Go Home
                        </Link>
                    </Button>
                </div>

                {/* Support Link */}
                <p className="mt-12 text-zinc-500 text-sm">
                    Need help?{' '}
                    <Link href="/contact" className="text-accent-primary hover:underline inline-flex items-center gap-1">
                        Contact support
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </p>
            </motion.div>
        </div>
    )
}
