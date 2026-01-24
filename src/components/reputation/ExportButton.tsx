"use client"

import React, { useState } from 'react'
import { Download, Loader2, Mail, FileText, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { trackReportExport } from '@/lib/analytics'

interface ExportButtonProps {
    businessName: string;
    reportData: {
        score?: number;
        profile?: {
            name?: string;
            rating?: number;
            reviewCount?: number;
            categories?: string[];
        };
        issues?: string[];
        opportunities?: string[];
        recommendations?: Array<{
            priority: 'high' | 'medium' | 'low';
            action: string;
        }>;
        swot?: {
            strengths?: string[];
            weaknesses?: string[];
            opportunities?: string[];
            threats?: string[];
        };
    };
    location?: string;
    onEmailSend?: () => void;
}

export function ExportButton({
    businessName,
    reportData,
    location,
    onEmailSend,
}: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false)
    const [exportSuccess, setExportSuccess] = useState<'pdf' | 'email' | null>(null)

    const handlePDFExport = async () => {
        setIsExporting(true)
        setExportSuccess(null)

        try {
            const response = await fetch('/api/report-pdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    businessName,
                    location,
                    ...reportData,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate PDF')
            }

            // Download the PDF
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `reputation-report-${businessName.toLowerCase().replace(/\s+/g, '-')}.pdf`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)

            setExportSuccess('pdf')
            trackReportExport('pdf', businessName)

            // Reset success state after 3 seconds
            setTimeout(() => setExportSuccess(null), 3000)
        } catch (error) {
            console.error('PDF export failed:', error)
        } finally {
            setIsExporting(false)
        }
    }

    const handleEmailExport = () => {
        if (onEmailSend) {
            onEmailSend()
            trackReportExport('email', businessName)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="gap-2 bg-white/5 border-white/10 hover:bg-white/10"
                    disabled={isExporting}
                >
                    {isExporting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Exporting...
                        </>
                    ) : exportSuccess ? (
                        <>
                            <Check className="w-4 h-4 text-green-400" />
                            Exported!
                        </>
                    ) : (
                        <>
                            <Download className="w-4 h-4" />
                            Export Report
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900 border-white/10">
                <DropdownMenuItem
                    onClick={handlePDFExport}
                    disabled={isExporting}
                    className="gap-2 text-white hover:bg-white/10 cursor-pointer"
                >
                    <FileText className="w-4 h-4" />
                    Download PDF
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleEmailExport}
                    className="gap-2 text-white hover:bg-white/10 cursor-pointer"
                >
                    <Mail className="w-4 h-4" />
                    Email Report
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
