/**
 * Test script to verify Supabase connection
 * Run with: npx tsx scripts/test-supabase-connection.ts
 */

import { createClient } from "@supabase/supabase-js";

async function testSupabaseConnection() {
  console.log("🔍 Testing Supabase connection...\n");

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Missing environment variables!");
    console.error("   Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
    console.error("   Please check your .env.local file.");
    process.exit(1);
  }

  console.log("✓ Environment variables found");
  console.log(`  URL: ${supabaseUrl.substring(0, 30)}...`);
  console.log(`  Key: ${supabaseAnonKey.substring(0, 20)}...\n`);

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Test 1: Check if we can reach Supabase
    console.log("📡 Testing connection to Supabase...");
    const { data: healthCheck, error: healthError } = await supabase
      .from("profiles")
      .select("count")
      .limit(0);

    if (healthError) {
      // If table doesn't exist, that's okay - we're just testing connection
      if (healthError.code === "PGRST116" || healthError.message.includes("relation") || healthError.message.includes("does not exist")) {
        console.log("⚠️  Connection successful, but 'profiles' table may not exist yet");
        console.log("   This is okay if you haven't run migrations yet.\n");
      } else {
        throw healthError;
      }
    } else {
      console.log("✓ Successfully connected to Supabase database\n");
    }

    // Test 2: Check auth service
    console.log("🔐 Testing Supabase Auth service...");
    const { data: authData, error: authError } = await supabase.auth.getSession();

    if (authError) {
      console.error(`❌ Auth service error: ${authError.message}`);
      process.exit(1);
    }

    console.log("✓ Auth service is accessible");
    if (authData.session) {
      console.log("  (Active session found)");
    } else {
      console.log("  (No active session - this is normal)");
    }

    console.log("\n✅ All connection tests passed!");
    console.log("   Your Supabase connection is working correctly.\n");

    return true;
  } catch (error: unknown) {
    console.error("\n❌ Connection test failed!");
    if (error instanceof Error) {
      console.error(`   Error: ${error.message}`);
    } else {
      console.error(`   Unknown error: ${error}`);
    }
    process.exit(1);
  }
}

// Run the test
testSupabaseConnection()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });
