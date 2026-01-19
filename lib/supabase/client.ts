import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/types/database";

/**
 * Creates a Supabase client for use in Client Components.
 * Uses @supabase/ssr for proper cookie handling and auth state management.
 *
 * Note: For Next.js App Router, we use @supabase/ssr instead of @supabase/supabase-js
 * directly to ensure proper authentication state synchronization between client and server.
 *
 * @example
 * ```tsx
 * 'use client'
 * import { createClient } from '@/lib/supabase/client'
 * const supabase = createClient()
 * ```
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file.\n" +
        "Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
