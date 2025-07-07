// src/lib/supabaseClient.ts

/**
 * Supabase Client Initialization
 *
 * This file exports a configured Supabase client instance for interacting with your Supabase backend.
 * The client is created using your project-specific URL and public anon key.
 *
 * Usage:
 * - Import `supabase` into any module that needs to perform Supabase queries
 * - This client is safe for use on the client side (browser) and server side (API routes)
 *
 * Security Note:
 * - This key is the public "anon" key and has Row Level Security (RLS) enforced in Supabase
 * - Do not use this key for privileged operations; use service keys in secure environments only
 */

import { createClient } from '@supabase/supabase-js';

// Supabase project URL
const supabaseUrl = 'https://briffnfmhjyngtjcbemp.supabase.co';

// Public anon key (with RLS enforced)
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyaWZmbmZtaGp5bmd0amNiZW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDI0NDgsImV4cCI6MjA2MzA3ODQ0OH0.cRmi-qpcYDK5OB8kP_4-mJqFKnKfv6VtXHr0G5V01hI';

// Create and export the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
