import { createClient } from '@supabase/supabase-js';

// This file is re-introduced to support the mock auth flow.
// The credentials are not used for real database queries in preview mode,
// but the Supabase client library is used for managing mock sessions.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
