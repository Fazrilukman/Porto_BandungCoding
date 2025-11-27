import { createClient } from '@supabase/supabase-js'

// Ambil kunci dari file .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Buat client untuk dipakai di seluruh aplikasi
export const supabase = createClient(supabaseUrl, supabaseKey)