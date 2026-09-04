/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_SUPABASE_URL || "https://blnholdbkltvxeaavuyh.supabase.co";
const supabaseAnonKey = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsbmhvbGRia2x0dnhlYWF2dXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NTUyMDYsImV4cCI6MjEwNDAzMTIwNn0.NSyzVHq6eS1Op5gifVCR5FC3oGm0y-gZL_7Oti5dxPU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

