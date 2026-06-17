import { createClient } from "@supabase/supabase-js";

const URL = import.meta.env.VITE_SUPABASE_URL || "";
// Aceita o nome novo (publishable key) e o antigo (anon key) — usa o que estiver definido.
const KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "";

export const API_CONFIGURED = !!(URL && KEY);

export const supabase = createClient(URL || "https://placeholder.supabase.co", KEY || "placeholder");

export class ApiError extends Error {}
