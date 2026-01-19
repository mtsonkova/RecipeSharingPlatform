"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type AuthError = {
  message: string;
};

type AuthResult =
  | { success: true }
  | { success: false; error: AuthError };

/**
 * Server action to sign up a new user with email and password.
 * Automatically creates a profile entry after successful signup.
 */
export async function signUp(
  email: string,
  password: string,
  username: string
): Promise<AuthResult> {
  const supabase = await createClient();

  // Validate inputs
  if (!email || !password || !username) {
    return {
      success: false,
      error: { message: "Email, password, and username are required" },
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: { message: "Password must be at least 6 characters" },
    };
  }

  // Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (authError || !authData.user) {
    return {
      success: false,
      error: {
        message: authError?.message ?? "Failed to create account",
      },
    };
  }

  // Create profile entry
  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    username,
    email: authData.user.email ?? null,
  });

  if (profileError) {
    // If profile creation fails, we should still allow signup
    // but log the error. In production, you might want to handle this differently.
    console.error("Failed to create profile:", profileError);
  }

  revalidatePath("/");
  return { success: true };
}

/**
 * Server action to sign in an existing user with email and password.
 */
export async function signIn(
  email: string,
  password: string
): Promise<AuthResult> {
  const supabase = await createClient();

  if (!email || !password) {
    return {
      success: false,
      error: { message: "Email and password are required" },
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: { message: error.message },
    };
  }

  revalidatePath("/");
  return { success: true };
}

/**
 * Server action to sign out the current user.
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}
