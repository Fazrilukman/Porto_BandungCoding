import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn("⚠️ Supabase credentials not configured. Using placeholder values.");
  console.warn("To enable database features: Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env file");
}

export const supabase = createClient(supabaseUrl, supabaseKey);