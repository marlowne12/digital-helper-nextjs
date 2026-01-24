import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
import { z } from 'zod';

const sanitizeFilename = (filename: string): string => {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove dangerous chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .substring(0, 50); // Limit length
};

// PDF Styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 30,
        borderBottom: 2,
        borderBottomColor: '#00d4aa',
        paddingBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0a0a0f',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 12,
        color: '#666666',
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0a0a0f',
        marginBottom: 12,
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 4,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    scoreCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#00d4aa',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    scoreText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    scoreLabel: {
        fontSize: 14,
        color: '#666666',
    },
    listItem: {
        fontSize: 11,
        color: '#333333',
        marginBottom: 6,
        paddingLeft: 15,
    },
    bulletPoint: {
        width: 6,
        height: 6,
        backgroundColor: '#00d4aa',
        borderRadius: 3,
        marginRight: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 11,
        color: '#666666',
        width: 120,
    },
    value: {
        fontSize: 11,
        color: '#333333',
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        borderTop: 1,
        borderTopColor: '#e0e0e0',
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 9,
        color: '#999999',
    },
    recommendation: {
        backgroundColor: '#f0fdf4',
        padding: 12,
        borderRadius: 6,
        marginBottom: 10,
        borderLeft: 3,
        borderLeftColor: '#00d4aa',
    },
    recommendationPriority: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#00d4aa',
        marginBottom: 4,
    },
    recommendationText: {
        fontSize: 11,
        color: '#333333',
    },
});

interface ReportData {
    businessName: string;
    location?: string;
    generatedAt: string;
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
}

// PDF Document Component
function ReputationReportPDF({ data }: { data: ReportData }) {
    return React.createElement(
        Document,
        null,
        React.createElement(
            Page,
            { size: 'A4', style: styles.page },
            // Header
            React.createElement(
                View,
                { style: styles.header },
                React.createElement(Text, { style: styles.title }, `Reputation Audit Report`),
                React.createElement(Text, { style: styles.subtitle }, `${data.businessName}${data.location ? ` • ${data.location}` : ''}`),
                React.createElement(Text, { style: styles.subtitle }, `Generated: ${data.generatedAt}`)
            ),
            // Score Section
            data.score !== undefined && React.createElement(
                View,
                { style: styles.section },
                React.createElement(
                    View,
                    { style: styles.scoreContainer },
                    React.createElement(
                        View,
                        { style: styles.scoreCircle },
                        React.createElement(Text, { style: styles.scoreText }, String(data.score))
                    ),
                    React.createElement(
                        View,
                        null,
                        React.createElement(Text, { style: { fontSize: 14, fontWeight: 'bold', color: '#333' } }, 'Overall Score'),
                        React.createElement(Text, { style: styles.scoreLabel }, data.score >= 70 ? 'Good standing' : data.score >= 40 ? 'Room for improvement' : 'Needs attention')
                    )
                )
            ),
            // Profile Info
            data.profile && React.createElement(
                View,
                { style: styles.section },
                React.createElement(Text, { style: styles.sectionTitle }, 'Business Profile'),
                React.createElement(
                    View,
                    { style: styles.row },
                    React.createElement(Text, { style: styles.label }, 'Business Name:'),
                    React.createElement(Text, { style: styles.value }, data.profile.name || data.businessName)
                ),
                data.profile.rating && React.createElement(
                    View,
                    { style: styles.row },
                    React.createElement(Text, { style: styles.label }, 'Rating:'),
                    React.createElement(Text, { style: styles.value }, `${data.profile.rating}/5 (${data.profile.reviewCount || 0} reviews)`)
                ),
                data.profile.categories && React.createElement(
                    View,
                    { style: styles.row },
                    React.createElement(Text, { style: styles.label }, 'Categories:'),
                    React.createElement(Text, { style: styles.value }, data.profile.categories.join(', '))
                )
            ),
            // Issues
            data.issues && data.issues.length > 0 && React.createElement(
                View,
                { style: styles.section },
                React.createElement(Text, { style: styles.sectionTitle }, 'Issues Identified'),
                ...data.issues.map((issue, i) =>
                    React.createElement(
                        View,
                        { key: i, style: styles.row },
                        React.createElement(View, { style: styles.bulletPoint }),
                        React.createElement(Text, { style: styles.listItem }, issue)
                    )
                )
            ),
            // Recommendations
            data.recommendations && data.recommendations.length > 0 && React.createElement(
                View,
                { style: styles.section },
                React.createElement(Text, { style: styles.sectionTitle }, 'Recommendations'),
                ...data.recommendations.slice(0, 5).map((rec, i) =>
                    React.createElement(
                        View,
                        { key: i, style: styles.recommendation },
                        React.createElement(Text, { style: styles.recommendationPriority }, rec.priority.toUpperCase()),
                        React.createElement(Text, { style: styles.recommendationText }, rec.action)
                    )
                )
            ),
            // Footer
            React.createElement(
                View,
                { style: styles.footer },
                React.createElement(Text, { style: styles.footerText }, 'Digital Helper • digital-helper.com'),
                React.createElement(Text, { style: styles.footerText }, 'Page 1')
            )
        )
    );
}

export async function POST(request: NextRequest) {
    try {
        const data: ReportData = await request.json();

        // Validate required fields
        if (!data.businessName) {
            return NextResponse.json(
                { error: 'Business name is required' },
                { status: 400 }
            );
        }

        // Add generated timestamp
        data.generatedAt = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const pdfBuffer = await renderToBuffer(
            React.createElement(ReputationReportPDF, { data }) as any // eslint-disable-line @typescript-eslint/no-explicit-any
        );

        // Return PDF as response
        const sanitizedFilename = sanitizeFilename(data.businessName);
        return new NextResponse(pdfBuffer as unknown as BodyInit, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="reputation-report-${sanitizedFilename}.pdf"`,
            },
        });
    } catch (error) {
        console.error('[PDF Generation Error]', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}
