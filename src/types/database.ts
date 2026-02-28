export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          email: string
          business_name: string | null
          location: string | null
          source: 'website_audit' | 'chat' | 'contact' | 'exit_intent' | 'newsletter'
          metadata: Json | null
          audit_result: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          business_name?: string | null
          location?: string | null
          source: 'website_audit' | 'chat' | 'contact' | 'exit_intent' | 'newsletter'
          metadata?: Json | null
          audit_result?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          business_name?: string | null
          location?: string | null
          source?: 'website_audit' | 'chat' | 'contact' | 'exit_intent' | 'newsletter'
          metadata?: Json | null
          audit_result?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      content_items: {
        Row: {
          id: string
          type: 'blog' | 'service' | 'location'
          slug: string
          title: string
          status: 'draft' | 'reviewing' | 'selected' | 'exported'
          selected_variant_id: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
          exported_at: string | null
          export_path: string | null
        }
        Insert: {
          id?: string
          type: 'blog' | 'service' | 'location'
          slug: string
          title: string
          status?: 'draft' | 'reviewing' | 'selected' | 'exported'
          selected_variant_id?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          exported_at?: string | null
          export_path?: string | null
        }
        Update: {
          id?: string
          type?: 'blog' | 'service' | 'location'
          slug?: string
          title?: string
          status?: 'draft' | 'reviewing' | 'selected' | 'exported'
          selected_variant_id?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          exported_at?: string | null
          export_path?: string | null
        }
      }
      content_variants: {
        Row: {
          id: string
          content_item_id: string
          variant_number: 1 | 2 | 3
          title: string
          slug: string
          content: string
          excerpt: string
          meta_title: string
          meta_description: string
          reading_time: string
          variant_style: 'seo-focused' | 'story-driven' | 'problem-solution'
          word_count: number
          seo_score: number
          created_at: string
          is_selected: boolean
        }
        Insert: {
          id?: string
          content_item_id: string
          variant_number: 1 | 2 | 3
          title: string
          slug: string
          content: string
          excerpt: string
          meta_title: string
          meta_description: string
          reading_time: string
          variant_style: 'seo-focused' | 'story-driven' | 'problem-solution'
          word_count?: number
          seo_score?: number
          created_at?: string
          is_selected?: boolean
        }
        Update: {
          id?: string
          content_item_id?: string
          variant_number?: 1 | 2 | 3
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          meta_title?: string
          meta_description?: string
          reading_time?: string
          variant_style?: 'seo-focused' | 'story-driven' | 'problem-solution'
          word_count?: number
          seo_score?: number
          created_at?: string
          is_selected?: boolean
        }
      }
      export_logs: {
        Row: {
          id: string
          item_id: string
          variant_id: string
          export_path: string
          exported_at: string
          git_commit: string | null
        }
        Insert: {
          id?: string
          item_id: string
          variant_id: string
          export_path: string
          exported_at?: string
          git_commit?: string | null
        }
        Update: {
          id?: string
          item_id?: string
          variant_id?: string
          export_path?: string
          exported_at?: string
          git_commit?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}