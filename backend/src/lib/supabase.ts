import { createClient } from "@supabase/supabase-js";
import { config } from "../config.js";

const options = { auth: { autoRefreshToken: false, persistSession: false } };

export const supabaseAdmin = createClient(config.supabaseUrl, config.supabaseSecretKey, options);

export function createAuthClient() {
  return createClient(config.supabaseUrl, config.supabaseSecretKey, options);
}
