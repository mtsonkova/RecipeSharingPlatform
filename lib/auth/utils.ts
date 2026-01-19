import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Get the current authenticated user.
 * Returns null if not authenticated.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Get the current user's profile data.
 * Returns null if not authenticated or profile doesn't exist.
 */
export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}

/**
 * Require authentication. If user is not authenticated, redirect to login.
 * Returns the authenticated user.
 */
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

/**
 * Require authentication and return user profile.
 * If user is not authenticated, redirect to login.
 */
export async function requireAuthWithProfile() {
  const user = await requireAuth();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    // Profile should exist, but if it doesn't, redirect to signup
    redirect("/signup");
  }

  return { user, profile };
}
