import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables are not set. Database features will be disabled.');
}

// Client for browser usage (public)
export const supabaseClient: SupabaseClient<Database> | null = supabaseUrl && supabaseKey
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : null;

// Admin client for server-side operations (private)
export const supabaseAdmin: SupabaseClient<Database> | null = supabaseUrl && supabaseServiceKey
  ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : supabaseClient;

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!supabaseUrl && !!supabaseKey;
}