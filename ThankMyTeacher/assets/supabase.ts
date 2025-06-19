import { createClient } from "@supabase/supabase-js";
import Constants from 'expo-constants';

// Get environment variables from Expo Constants
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || supabaseUrl === 'https://your-project.supabase.co') {
  console.error('❌ Supabase URL is not configured. Please set EXPO_PUBLIC_SUPABASE_URL in your .env file');
  console.error('Current value:', supabaseUrl);
}

if (!supabaseKey || supabaseKey === 'your-anon-key') {
  console.error('❌ Supabase anon key is not configured. Please set EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env file');
  console.error('Current value:', supabaseKey);
}

// Use actual values or throw error if not configured
const finalSupabaseUrl = supabaseUrl;
const finalSupabaseKey = supabaseKey;

if (!finalSupabaseUrl || !finalSupabaseKey) {
  throw new Error(
    'Supabase configuration is missing. Please create a .env file with:\n' +
    'EXPO_PUBLIC_SUPABASE_URL=your-project-url\n' +
    'EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key'
  );
}

console.log('✅ Supabase configured with URL:', finalSupabaseUrl);

export const supabase = createClient(finalSupabaseUrl, finalSupabaseKey);