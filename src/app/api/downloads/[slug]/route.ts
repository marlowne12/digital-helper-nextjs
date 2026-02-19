import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import {
  LEAD_MAGNET_PDFS,
  LeadMagnetType,
} from '@/lib/pdf/lead-magnet-templates'

// Map URL slugs to PDF types
const SLUG_MAP: Record<string, LeadMagnetType> = {
  '24-7-lead-machine-guide': 'guide',
  'ai-readiness-checklist': 'checklist',
  'response-time-audit': 'audit',
}

// PDF metadata for downloads
const PDF_METADATA: Record<LeadMagnetType, { title: string; filename: string }> = {
  guide: {
    title: 'The 24/7 Lead Machine Guide',
    filename: '24-7-lead-machine-guide.pdf',
  },
  checklist: {
    title: 'AI Readiness Checklist',
    filename: 'ai-readiness-checklist.pdf',
  },
  audit: {
    title: 'Response Time Audit',
    filename: 'response-time-audit.pdf',
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // Remove .pdf extension if present
    const cleanSlug = slug.replace(/\.pdf$/i, '')
    
    // Look up the PDF type from the slug
    const pdfType = SLUG_MAP[cleanSlug]
    
    if (!pdfType) {
      return NextResponse.json(
        { error: 'PDF not found', validSlugs: Object.keys(SLUG_MAP) },
        { status: 404 }
      )
    }

    // Get the PDF component
    const PDFComponent = LEAD_MAGNET_PDFS[pdfType]
    const metadata = PDF_METADATA[pdfType]

    // Render the PDF to a buffer
    const pdfBuffer = await renderToBuffer(
      React.createElement(PDFComponent) as any // eslint-disable-line @typescript-eslint/no-explicit-any
    )

    // Return the PDF with appropriate headers
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${metadata.filename}"`,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
        'X-PDF-Title': metadata.title,
      },
    })
  } catch (error) {
    console.error('[PDF Generation Error]', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Also support HEAD requests for link validation
export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const cleanSlug = slug.replace(/\.pdf$/i, '')
  const pdfType = SLUG_MAP[cleanSlug]

  if (!pdfType) {
    return new NextResponse(null, { status: 404 })
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
    },
  })
}
