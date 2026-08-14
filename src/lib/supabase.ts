import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

const isConfigured = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

if (!isConfigured) {
  console.warn('⚠️ Missing Supabase env vars. Admin features will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ContentKey = 'projects' | 'team' | 'stats' | 'social';

export async function fetchContent<T>(key: ContentKey, fallback: T): Promise<T> {
  if (!isConfigured) return fallback;

  const { data, error } = await supabase
    .from('site_content')
    .select('value')
    .eq('key', key)
    .maybeSingle();

  if (error) {
    console.error(`Failed to fetch "${key}" from Supabase:`, error.message);
    return fallback;
  }

  return data ? (data.value as T) : fallback;
}

export async function saveContent<T>(key: ContentKey, value: T): Promise<void> {
  const { error } = await supabase
    .from('site_content')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });

  if (error) {
    console.error(`Failed to save "${key}" to Supabase:`, error.message);
    throw error;
  }
}
