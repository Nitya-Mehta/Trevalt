import { createClient } from '@supabase/supabase-js';

// WARNING: This client bypasses Row Level Security (RLS).
// NEVER use this client in components or actions exposed to unauthenticated users
// unless you are enforcing strict server-side validation (like rate limiting).
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}
