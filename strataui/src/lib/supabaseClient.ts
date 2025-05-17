// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://briffnfmhjyngtjcbemp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyaWZmbmZtaGp5bmd0amNiZW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDI0NDgsImV4cCI6MjA2MzA3ODQ0OH0.cRmi-qpcYDK5OB8kP_4-mJqFKnKfv6VtXHr0G5V01hI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);