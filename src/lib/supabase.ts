import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ocjxewdtihtlhckhrxit.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_OrGLz6VTWwbnka1AMvTKLQ_1fV4aTep';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to convert phone to email format
export const phoneToEmail = (phone: string): string => {
  // Remove any non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  return `${cleanPhone}@brixa.com`;
};
