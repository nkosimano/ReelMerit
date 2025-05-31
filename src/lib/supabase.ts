import { createClient } from '@supabase/supabase-js';

// Normally these would be in .env file and accessed via import.meta.env
const supabaseUrl = 'https://your-supabase-project-url.supabase.co';
const supabaseKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);