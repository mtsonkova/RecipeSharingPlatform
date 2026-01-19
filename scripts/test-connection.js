/**
 * Quick test to verify Supabase connection
 * Run with: node scripts/test-connection.js
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing environment variables!');
    console.error('   Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
  }

  console.log('✓ Environment variables found');
  console.log(`  URL: ${supabaseUrl.substring(0, 40)}...\n`);

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Test database connection
    console.log('📡 Testing database connection...');
    const { error: dbError } = await supabase.from('profiles').select('count').limit(0);
    
    if (dbError) {
      if (dbError.code === 'PGRST116' || dbError.message?.includes('relation') || dbError.message?.includes('does not exist')) {
        console.log('⚠️  Connection works, but tables may not exist yet (run migrations)');
      } else {
        throw dbError;
      }
    } else {
      console.log('✓ Database connection successful');
    }

    // Test auth service
    console.log('\n🔐 Testing Auth service...');
    const { error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      throw authError;
    }
    
    console.log('✓ Auth service accessible');

    console.log('\n✅ All tests passed! Supabase connection is working.\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection test failed!');
    console.error(`   Error: ${error.message}`);
    if (error.details) {
      console.error(`   Details: ${error.details}`);
    }
    process.exit(1);
  }
}

testConnection();
