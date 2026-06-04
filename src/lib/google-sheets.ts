/**
 * Google Sheets Service for Content Management System
 *
 * This service provides read/write operations for storing AI-generated content
 * in Google Sheets with structured tabs for Content_Items, Variants, and Export_Log.
 *
 * Environment Variables Required:
 * - GOOGLE_SHEETS_CLIENT_EMAIL: Service account email
 * - GOOGLE_SHEETS_PRIVATE_KEY: Service account private key (with \n for line breaks)
 * - GOOGLE_SHEETS_SPREADSHEET_ID: The Google Sheets spreadsheet ID
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleAuth } from 'google-auth-library';
import { sheets } from '@googleapis/sheets';
import type {
    ContentItem,
    ContentVariant,
    ContentType,
    ContentStatus,
    VariantStyle,
} from '@/types/content';

// Sheet names
const SHEETS = {
    CONTENT_ITEMS: 'Content_Items',
    VARIANTS: 'Variants',
    EXPORT_LOG: 'Export_Log',
} as const;

// Column indices for each sheet
const COLUMNS = {
    CONTENT_ITEMS: [
        'id',
        'type',
        'slug',
        'title',
        'status',
        'selectedVariantId',
        'keywords',
        'location',
        'targetAudience',
        'tone',
        'targetLength',
        'createdAt',
        'updatedAt',
        'exportedAt',
        'exportPath',
    ],
    VARIANTS: [
        'id',
        'contentItemId',
        'variantNumber',
        'title',
        'slug',
        'content',
        'excerpt',
        'metaTitle',
        'metaDescription',
        'readingTime',
        'variantStyle',
        'wordCount',
        'seoScore',
        'createdAt',
        'isSelected',
    ],
    EXPORT_LOG: [
        'id',
        'itemId',
        'variantId',
        'exportPath',
        'exportedAt',
        'gitCommit',
    ],
} as const;

// Cache the sheets instance
let sheetsInstance: any = null;
let authInstance: GoogleAuth | null = null;

/**
 * Initialize and return the Google Sheets API instance
 */
async function getSheets(): Promise<any> {
    if (sheetsInstance) {
        return sheetsInstance;
    }

    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
        throw new Error(
            'Missing Google Sheets credentials. Please set GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, and GOOGLE_SHEETS_SPREADSHEET_ID environment variables.'
        );
    }

    // Format private key - handle escaped newlines from environment
    const formattedKey = privateKey.replace(/\\n/g, '\n');

    authInstance = new GoogleAuth({
        credentials: {
            client_email: clientEmail,
            private_key: formattedKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await authInstance.getClient();
    sheetsInstance = sheets('v4') as any;
    sheetsInstance._options.auth = authClient;

    return sheetsInstance;
}

/**
 * Get the spreadsheet ID from environment
 */
function getSpreadsheetId(): string {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
        throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID environment variable is not set');
    }
    return spreadsheetId;
}

/**
 * Initialize sheets with headers if they don't exist
 */
export async function initializeSheets(): Promise<void> {
    try {
        const sheetsApi = await getSheets();
        const spreadsheetId = getSpreadsheetId();

        // Get existing sheets
        const response = await sheetsApi.spreadsheets.get({
            spreadsheetId,
        });

        const existingSheetNames = response.data.sheets?.map((s: any) => s.properties?.title) || [];

        // Create sheets that don't exist
        for (const sheetName of Object.values(SHEETS)) {
            if (!existingSheetNames.includes(sheetName)) {
                await (sheetsApi.spreadsheets.batchUpdate as any)({
                    spreadsheetId,
                    resource: {
                        requests: [
                            {
                                addSheet: {
                                    properties: {
                                        title: sheetName,
                                    },
                                },
                            },
                        ],
                    },
                });
            }
        }

        // Add headers to Content_Items sheet
        await ensureHeaders(spreadsheetId, SHEETS.CONTENT_ITEMS, COLUMNS.CONTENT_ITEMS);
        await ensureHeaders(spreadsheetId, SHEETS.VARIANTS, COLUMNS.VARIANTS);
        await ensureHeaders(spreadsheetId, SHEETS.EXPORT_LOG, COLUMNS.EXPORT_LOG);
    } catch (error) {
        console.error('Failed to initialize Google Sheets:', error);
        throw new Error(`Failed to initialize Google Sheets: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Ensure headers exist in a sheet
 */
async function ensureHeaders(spreadsheetId: string, sheetName: string, headers: readonly string[]): Promise<void> {
    const sheetsApi = await getSheets();

    // Get existing data to check if headers exist
    const existingData = await sheetsApi.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A1:Z1`,
    });

    if (!existingData.data.values || existingData.data.values.length === 0) {
        // Add headers
        await (sheetsApi.spreadsheets.values.update as any)({
            spreadsheetId,
            range: `${sheetName}!A1`,
            valueInputOption: 'RAW',
            resource: {
                values: [headers],
            },
        });
    }
}

/**
 * Convert a ContentItem to a row array
 */
function contentItemToRow(item: ContentItem): (string | number)[] {
    return [
        item.id,
        item.type,
        item.slug,
        item.title,
        item.status,
        item.selectedVariantId || '',
        item.metadata.keywords.join(','),
        item.metadata.location || '',
        item.metadata.targetAudience || '',
        item.metadata.tone || '',
        item.metadata.targetLength || '',
        item.createdAt.toISOString(),
        item.updatedAt.toISOString(),
        item.exportedAt?.toISOString() || '',
        item.exportPath || '',
    ];
}

/**
 * Convert a row array to a ContentItem
 */
function rowToContentItem(row: (string | number)[]): ContentItem {
    return {
        id: String(row[0]),
        type: row[1] as ContentType,
        slug: String(row[2]),
        title: String(row[3]),
        status: row[4] as ContentStatus,
        variants: [], // Loaded separately
        selectedVariantId: row[5] ? String(row[5]) : undefined,
        metadata: {
            keywords: row[6] ? String(row[6]).split(',').filter(Boolean) : [],
            location: row[7] ? String(row[7]) : undefined,
            targetAudience: row[8] ? String(row[8]) : undefined,
            tone: row[9] as any,
            targetLength: row[10] ? Number(row[10]) : undefined,
        },
        createdAt: new Date(String(row[11])),
        updatedAt: new Date(String(row[12])),
        exportedAt: row[13] ? new Date(String(row[13])) : undefined,
        exportPath: row[14] ? String(row[14]) : undefined,
    };
}

/**
 * Convert a ContentVariant to a row array
 */
function variantToRow(variant: ContentVariant): (string | number | boolean)[] {
    return [
        variant.id,
        variant.contentItemId,
        variant.variantNumber,
        variant.title,
        variant.slug,
        variant.content,
        variant.excerpt,
        variant.metaTitle,
        variant.metaDescription,
        variant.readingTime,
        variant.variantStyle,
        variant.wordCount,
        variant.seoScore,
        variant.createdAt.toISOString(),
        variant.isSelected,
    ];
}

/**
 * Convert a row array to a ContentVariant
 */
function rowToVariant(row: (string | number | boolean)[]): ContentVariant {
    return {
        id: String(row[0]),
        contentItemId: String(row[1]),
        variantNumber: row[2] as 1 | 2 | 3,
        title: String(row[3]),
        slug: String(row[4]),
        content: String(row[5]),
        excerpt: String(row[6]),
        metaTitle: String(row[7]),
        metaDescription: String(row[8]),
        readingTime: String(row[9]),
        variantStyle: row[10] as VariantStyle,
        wordCount: Number(row[11]),
        seoScore: Number(row[12]),
        createdAt: new Date(String(row[13])),
        isSelected: Boolean(row[14]),
    };
}

/**
 * Generate a unique ID
 */
function generateId(): string {
    return `cnt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a slug from a title
 */
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 60);
}

/**
 * Calculate reading time from word count
 */
function calculateReadingTime(wordCount: number): string {
    const wordsPerMinute = 200;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
}

/**
 * Calculate SEO score based on content characteristics
 */
function calculateSEOScore(content: string, metaTitle: string, metaDescription: string): number {
    let score = 50;

    // Check meta title length (optimal: 50-60 characters)
    if (metaTitle.length >= 50 && metaTitle.length <= 60) score += 15;
    else if (metaTitle.length >= 40 && metaTitle.length <= 70) score += 10;
    else if (metaTitle.length > 0) score += 5;

    // Check meta description length (optimal: 150-160 characters)
    if (metaDescription.length >= 150 && metaDescription.length <= 160) score += 15;
    else if (metaDescription.length >= 120 && metaDescription.length <= 170) score += 10;
    else if (metaDescription.length > 0) score += 5;

    // Check content length (optimal: 300+ words for SEO)
    const wordCount = content.split(/\s+/).length;
    if (wordCount >= 300) score += 15;
    else if (wordCount >= 200) score += 10;
    else if (wordCount >= 100) score += 5;

    // Check for headings (H1, H2, H3 in markdown)
    const headings = content.match(/^#+\s/gm);
    if (headings && headings.length >= 3) score += 10;
    else if (headings && headings.length >= 1) score += 5;

    // Check for lists
    const lists = content.match(/^[\-\*]\s/gm);
    if (lists && lists.length >= 3) score += 5;

    return Math.min(score, 100);
}

// ============================================================
// PUBLIC API METHODS
// ============================================================

/**
 * Create a new content item and save to Google Sheets
 */
export async function createContentItem(
    item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'variants'>
): Promise<string> {
    try {
        await initializeSheets();

        const sheetsApi = await getSheets();
        const spreadsheetId = getSpreadsheetId();

        const newItem: ContentItem = {
            ...item,
            id: generateId(),
            slug: item.slug || slugify(item.title),
            variants: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const row = contentItemToRow(newItem);

        await (sheetsApi.spreadsheets.values.append as any)({
            spreadsheetId,
            range: `${SHEETS.CONTENT_ITEMS}!A:Z`,
            valueInputOption: 'RAW',
            resource: {
                values: [row],
            },
        });

        return newItem.id;
    } catch (error) {
        console.error('Failed to create content item:', error);
        throw new Error(`Failed to create content item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Save variants to Google Sheets
 */
export async function saveVariants(itemId: string, variants: ContentVariant[]): Promise<void> {
    try {
        await initializeSheets();

        const sheetsApi = await getSheets();
        const spreadsheetId = getSpreadsheetId();

        const rows = variants.map((variant) => variantToRow({
            ...variant,
            contentItemId: itemId,
        }));

        await (sheetsApi.spreadsheets.values.append as any)({
            spreadsheetId,
            range: `${SHEETS.VARIANTS}!A:Z`,
            valueInputOption: 'RAW',
            resource: {
                values: rows,
            },
        });
    } catch (error) {
        console.error('Failed to save variants:', error);
        throw new Error(`Failed to save variants: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Get a content item by ID with all its variants
 */
export async function getContentItem(id: string): Promise<ContentItem | null> {
    try {
        await initializeSheets();

        const sheetsApi = await getSheets();
        const spreadsheetId = getSpreadsheetId();

        // Get content item
        const itemResponse = await sheetsApi.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEETS.CONTENT_ITEMS}!A:Z`,
        });

        const rows = itemResponse.data.values || [];
        const headerRow = rows[0];
        const dataRows = rows.slice(1);

        // Find the item by ID
        const idIndex = headerRow?.indexOf('id') ?? 0;
        const itemRow = dataRows.find((row: (string | number)[]) => String(row[idIndex]) === id);

        if (!itemRow) {
            return null;
        }

        const item = rowToContentItem(itemRow);

        // Get variants for this item
        const variantsResponse = await sheetsApi.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEETS.VARIANTS}!A:Z`,
        });

        const variantRows = variantsResponse.data.values || [];
        const variantHeaderRow = variantRows[0];
        const variantDataRows = variantRows.slice(1);

        const contentItemIdIndex = variantHeaderRow?.indexOf('contentItemId') ?? 1;
        const variantRowData = variantDataRows.filter((row: (string | number | boolean)[]) => String(row[contentItemIdIndex]) === id);

        item.variants = variantRowData.map((row: (string | number | boolean)[]) => rowToVariant(row));

        return item;
    } catch (error) {
        console.error('Failed to get content item:', error);
        throw new Error(`Failed to get content item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * List all content items, optionally filtered by type
 */
export async function listContentItems(type?: ContentType): Promise<ContentItem[]> {
    try {
        await initializeSheets();

        const sheetsApi = await getSheets();
        const spreadsheetId = getSpreadsheetId();

        const response = await sheetsApi.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEETS.CONTENT_ITEMS}!A:Z`,
        });

        const rows = response.data.values || [];
        if (rows.length <= 1) {
            return [];
        }

        const headerRow = rows[0];
        const dataRows = rows.slice(1);

        const typeIndex = headerRow?.indexOf('type') ?? 1;

        const items = dataRows
            .filter((row: (string | number)[]) => {
                if (type) {
                    return String(row[typeIndex]) === type;
                }
                return true;
            })
            .map((row: (string | number)[]) => rowToContentItem(row));

        return items;
    } catch (error) {
        console.error('Failed to list content items:', error);
        throw new Error(`Failed to list content items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Update the selected variant for a content item
 */
export async function updateSelectedVariant(itemId: string, variantId: string): Promise<void> {
    try {
        await initializeSheets();

        const sheetsApi = await getSheets();
        const spreadsheetId = getSpreadsheetId();

        // Get current data
        const response = await sheetsApi.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEETS.CONTENT_ITEMS}!A:Z`,
        });

        const rows = response.data.values || [];
        const headerRow = rows[0];
        const dataRows = rows.slice(1);

        const idIndex = headerRow?.indexOf('id') ?? 0;
        const selectedVariantIdIndex = headerRow?.indexOf('selectedVariantId') ?? 5;
        const rowIndex = dataRows.findIndex((row: (string | number)[]) => String(row[idIndex]) === itemId);

        if (rowIndex === -1) {
            throw new Error(`Content item with ID ${itemId} not found`);
        }

        // Update the selectedVariantId
        const rowNumber = rowIndex + 2; // +1 for header, +1 for 1-based indexing
        await (sheetsApi.spreadsheets.values.update as any)({
            spreadsheetId,
            range: `${SHEETS.CONTENT_ITEMS}!F${rowNumber}`, // selectedVariantId is column F
            valueInputOption: 'RAW',
            resource: {
                values: [[variantId]],
            },
        });

        // Also update isSelected status on variants
        const variantsResponse = await sheetsApi.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEETS.VARIANTS}!A:Z`,
        });

        const variantRows = variantsResponse.data.values || [];
        const variantHeaderRow = variantRows[0];
        const variantDataRows = variantRows.slice(1);

        const variantIdIndex = variantHeaderRow?.indexOf('id') ?? 0;
        const isSelectedIndex = variantHeaderRow?.indexOf('isSelected') ?? 14;
        const contentItemIdIndex = variantHeaderRow?.indexOf('contentItemId') ?? 1;

        // Build update requests
        const updateRequests: { range: string; values: (string | boolean)[][] }[] = [];

        variantDataRows.forEach((row: (string | number | boolean)[], index: number) => {
            const rowVariantId = String(row[variantIdIndex]);
            const rowContentItemId = String(row[contentItemIdIndex]);
            const rowNumber = index + 2;

            if (rowContentItemId === itemId) {
                updateRequests.push({
                    range: `${SHEETS.VARIANTS}!O${rowNumber}`, // isSelected is column O
                    values: [[rowVariantId === variantId]],
                });
            }
        });

        // Execute all updates
        for (const update of updateRequests) {
            await sheetsApi.spreadsheets.values.update({
                spreadsheetId,
                range: update.range,
                valueInputOption: 'RAW',
                resource: {
                    values: update.values,
                },
            });
        }
    } catch (error) {
        console.error('Failed to update selected variant:', error);
        throw new Error(`Failed to update selected variant: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Log an export to the export log
 */
export async function logExport(
    itemId: string,
    variantId: string,
    path: string,
    gitCommit?: string
): Promise<void> {
    try {
        await initializeSheets();

        const sheetsApi = await getSheets();
        const spreadsheetId = getSpreadsheetId();

        const logId = `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const row = [
            logId,
            itemId,
            variantId,
            path,
            new Date().toISOString(),
            gitCommit || '',
        ];

        await sheetsApi.spreadsheets.values.append({
            spreadsheetId,
            range: `${SHEETS.EXPORT_LOG}!A:Z`,
            valueInputOption: 'RAW',
            resource: {
                values: [row],
            },
        });

        // Update the content item with export info
        const contentResponse = await sheetsApi.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEETS.CONTENT_ITEMS}!A:Z`,
        });

        const rows = contentResponse.data.values || [];
        const headerRow = rows[0];
        const dataRows = rows.slice(1);

        const idIndex = headerRow?.indexOf('id') ?? 0;
        const rowIndex = dataRows.findIndex((row: (string | number)[]) => String(row[idIndex]) === itemId);

        if (rowIndex !== -1) {
            const rowNumber = rowIndex + 2;

            // Update exportedAt and exportPath
            const exportedAtIndex = headerRow?.indexOf('exportedAt') ?? 13;
            const exportPathIndex = headerRow?.indexOf('exportPath') ?? 14;

            // Column letters (A=1, B=2, etc.)
            const getColumnLetter = (index: number): string => {
                return String.fromCharCode(65 + index);
            };

            // Use individual updates instead of batchUpdate for compatibility
            await (sheetsApi.spreadsheets.values.update as any)({
                spreadsheetId,
                range: `${SHEETS.CONTENT_ITEMS}!${getColumnLetter(exportedAtIndex)}${rowNumber}`,
                valueInputOption: 'RAW',
                resource: {
                    values: [[new Date().toISOString()]],
                },
            });

            await (sheetsApi.spreadsheets.values.update as any)({
                spreadsheetId,
                range: `${SHEETS.CONTENT_ITEMS}!${getColumnLetter(exportPathIndex)}${rowNumber}`,
                valueInputOption: 'RAW',
                resource: {
                    values: [[path]],
                },
            });
        }
    } catch (error) {
        console.error('Failed to log export:', error);
        throw new Error(`Failed to log export: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Helper function to get the sheet ID by name
 */
async function getSheetIdByName(spreadsheetId: string, sheetName: string): Promise<number> {
    const sheetsApi = await getSheets();
    const response = await sheetsApi.spreadsheets.get({
        spreadsheetId,
    });

    const sheet = response.data.sheets?.find((s: any) => s.properties?.title === sheetName);
    if (!sheet) {
        throw new Error(`Sheet ${sheetName} not found`);
    }
    return sheet.properties?.sheetId || 0;
}

/**
 * Delete a content item and all its variants
 */
export async function deleteContentItem(id: string): Promise<void> {
    try {
        await initializeSheets();

        const sheetsApi = await getSheets();
        const spreadsheetId = getSpreadsheetId();

        // Get content items
        const contentResponse = await sheetsApi.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEETS.CONTENT_ITEMS}!A:Z`,
        });

        const contentRows = contentResponse.data.values || [];
        const contentHeaderRow = contentRows[0];
        const contentDataRows = contentRows.slice(1);

        const idIndex = contentHeaderRow?.indexOf('id') ?? 0;
        const contentRowIndex = contentDataRows.findIndex((row: (string | number)[]) => String(row[idIndex]) === id);

        if (contentRowIndex === -1) {
            throw new Error(`Content item with ID ${id} not found`);
        }

        // Get the sheet ID for Content_Items
        const contentSheetId = await getSheetIdByName(spreadsheetId, SHEETS.CONTENT_ITEMS);

        // Delete content item row (1-indexed, +1 for header)
        await sheetsApi.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: {
                requests: [
                    {
                        deleteDimension: {
                            range: {
                                sheetId: contentSheetId,
                                dimension: 'ROWS',
                                startIndex: contentRowIndex + 1,
                                endIndex: contentRowIndex + 2,
                            },
                        },
                    },
                ],
            },
        });

        // Delete associated variants
        const variantsResponse = await sheetsApi.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEETS.VARIANTS}!A:Z`,
        });

        const variantRows = variantsResponse.data.values || [];
        const variantHeaderRow = variantRows[0];
        const variantDataRows = variantRows.slice(1);

        const contentItemIdIndex = variantHeaderRow?.indexOf('contentItemId') ?? 1;
        const variantIndicesToDelete = variantDataRows
            .map((row: (string | number | boolean)[], index: number) => ({ row, index }))
            .filter(({ row }: { row: (string | number | boolean)[] }) => String(row[contentItemIdIndex]) === id)
            .map(({ index }: { index: number }) => index + 1) // +1 for header
            .sort((a: number, b: number) => b - a); // Sort descending to delete from bottom up

        // Get the sheet ID for Variants
        const variantsSheetId = await getSheetIdByName(spreadsheetId, SHEETS.VARIANTS);

        for (const variantIndex of variantIndicesToDelete) {
            await sheetsApi.spreadsheets.batchUpdate({
                spreadsheetId,
                resource: {
                    requests: [
                        {
                            deleteDimension: {
                                range: {
                                    sheetId: variantsSheetId,
                                    dimension: 'ROWS',
                                    startIndex: variantIndex,
                                    endIndex: variantIndex + 1,
                                },
                            },
                        },
                    ],
                },
            });
        }
    } catch (error) {
        console.error('Failed to delete content item:', error);
        throw new Error(`Failed to delete content item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Get all export logs for a content item
 */
export async function getExportLogs(itemId: string): Promise<
    Array<{
        id: string;
        itemId: string;
        variantId: string;
        exportPath: string;
        exportedAt: Date;
        gitCommit?: string;
    }>
> {
    try {
        await initializeSheets();

        const sheetsApi = await getSheets();
        const spreadsheetId = getSpreadsheetId();

        const response = await sheetsApi.spreadsheets.values.get({
            spreadsheetId,
            range: `${SHEETS.EXPORT_LOG}!A:Z`,
        });

        const rows = response.data.values || [];
        if (rows.length <= 1) {
            return [];
        }

        const headerRow = rows[0];
        const dataRows = rows.slice(1);

        const itemIdIndex = headerRow?.indexOf('itemId') ?? 1;

        return dataRows
            .filter((row: (string | number)[]) => String(row[itemIdIndex]) === itemId)
            .map((row: (string | number)[]) => ({
                id: String(row[0]),
                itemId: String(row[1]),
                variantId: String(row[2]),
                exportPath: String(row[3]),
                exportedAt: new Date(String(row[4])),
                gitCommit: row[5] ? String(row[5]) : undefined,
            }));
    } catch (error) {
        console.error('Failed to get export logs:', error);
        throw new Error(`Failed to get export logs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Re-export utility functions
export { slugify, calculateReadingTime, calculateSEOScore };
