import { supabaseAdmin, supabaseClient, isSupabaseConfigured } from './supabase';

// Re-export for convenience
export { isSupabaseConfigured };

export interface LeadData {
  email: string;
  businessName?: string;
  location?: string;
  source: 'website_audit' | 'chat' | 'contact' | 'exit_intent' | 'newsletter';
  metadata?: Record<string, unknown>;
  auditResult?: unknown;
}

export interface Lead {
  id: string;
  email: string;
  business_name: string | null;
  location: string | null;
  source: 'website_audit' | 'chat' | 'contact' | 'exit_intent' | 'newsletter';
  metadata: Record<string, unknown> | null;
  audit_result: unknown | null;
  created_at: string;
  updated_at: string;
}

// Check if database is available
function getClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Please set environment variables.');
  }
  const client = supabaseAdmin || supabaseClient;
  if (!client) {
    throw new Error('Supabase client is not initialized');
  }
  return client;
}

/**
 * Create a new lead in the database
 */
export async function createLead(data: LeadData): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const client = getClient();
    
    const leadData = {
      email: data.email,
      business_name: data.businessName || null,
      location: data.location || null,
      source: data.source,
      metadata: data.metadata as Record<string, unknown> | null,
      audit_result: data.auditResult as unknown | null,
    };

    const { data: result, error } = await client
      .from('leads')
      .insert(leadData as never)
      .select('id')
      .single();

    if (error) {
      console.error('[Database] Failed to create lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: (result as { id: string }).id };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Database] Create lead error:', message);
    return { success: false, error: message };
  }
}

/**
 * Get a lead by ID
 */
export async function getLeadById(id: string): Promise<{ success: boolean; lead?: Lead; error?: string }> {
  try {
    const client = getClient();
    
    const { data, error } = await client
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('[Database] Failed to get lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true, lead: data as unknown as Lead };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Database] Get lead error:', message);
    return { success: false, error: message };
  }
}

/**
 * Get leads by source
 */
export async function getLeadsBySource(
  source: LeadData['source'],
  limit: number = 100,
  offset: number = 0
): Promise<{ success: boolean; leads?: Lead[]; error?: string }> {
  try {
    const client = getClient();
    
    const { data, error } = await client
      .from('leads')
      .select('*')
      .eq('source', source)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[Database] Failed to get leads by source:', error);
      return { success: false, error: error.message };
    }

    return { success: true, leads: (data as unknown as Lead[]) || [] };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Database] Get leads by source error:', message);
    return { success: false, error: message };
  }
}

/**
 * Update a lead
 */
export async function updateLead(
  id: string,
  updates: Partial<LeadData>
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getClient();
    
    const updateData = {
      email: updates.email,
      business_name: updates.businessName,
      location: updates.location,
      source: updates.source,
      metadata: updates.metadata as Record<string, unknown> | null,
      audit_result: updates.auditResult as unknown | null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await client
      .from('leads')
      .update(updateData as never)
      .eq('id', id);

    if (error) {
      console.error('[Database] Failed to update lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Database] Update lead error:', message);
    return { success: false, error: message };
  }
}

/**
 * Delete a lead
 */
export async function deleteLead(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const client = getClient();
    
    const { error } = await client
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[Database] Failed to delete lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Database] Delete lead error:', message);
    return { success: false, error: message };
  }
}

/**
 * List all leads with pagination
 */
export async function listLeads(
  limit: number = 50,
  offset: number = 0
): Promise<{ success: boolean; leads?: Lead[]; total?: number; error?: string }> {
  try {
    const client = getClient();
    
    const { data, error, count } = await client
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[Database] Failed to list leads:', error);
      return { success: false, error: error.message };
    }

    return { success: true, leads: (data as unknown as Lead[]) || [], total: count || 0 };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Database] List leads error:', message);
    return { success: false, error: message };
  }
}

/**
 * Get leads statistics
 */
export async function getLeadStats(): Promise<{ 
  success: boolean; 
  stats?: { 
    total: number; 
    bySource: Record<string, number>;
    recent: number;
  }; 
  error?: string 
}> {
  try {
    const client = getClient();
    
    // Get total count
    const { count: total, error: countError } = await client
      .from('leads')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    // Get counts by source
    const { data: sourceData, error: sourceError } = await client
      .from('leads')
      .select('source');

    if (sourceError) throw sourceError;

    const bySource: Record<string, number> = {};
    (sourceData as unknown as { source: string }[])?.forEach((lead: { source: string }) => {
      bySource[lead.source] = (bySource[lead.source] || 0) + 1;
    });

    // Get recent leads (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { count: recent, error: recentError } = await client
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());

    if (recentError) throw recentError;

    return {
      success: true,
      stats: {
        total: total || 0,
        bySource,
        recent: recent || 0,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Database] Get lead stats error:', message);
    return { success: false, error: message };
  }
}