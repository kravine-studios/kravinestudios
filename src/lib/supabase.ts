import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Site content is stored as one row per section in the `site_content` table:
// key: 'projects' | 'team' | 'stats' | 'social'
// value: jsonb blob holding that section's data
export type ContentKey = 'projects' | 'team' | 'stats' | 'social';

export async function fetchContent<T>(key: ContentKey, fallback: T): Promise<T> {
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
