
import { createClient } from '@supabase/supabase-js';

// Default to demo values if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-anon-key';

// Configure with mock values for development
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log a helpful message to set up Supabase
console.log('To connect to your Supabase project, click the green Supabase button in the top right and connect your project.');
