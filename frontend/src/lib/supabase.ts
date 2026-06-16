import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL || "";
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const API_CONFIGURED = !!(URL && ANON_KEY);

export const supabase = createClient(URL || "https://placeholder.supabase.co", ANON_KEY || "placeholder");

export class ApiError extends Error {}
