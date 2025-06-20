import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test the connection by selecting from a known table (e.g., 'users')
const testSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('users').select('*').limit(1);
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connected successfully');
    }
  } catch (err) {
    console.error('❌ Error testing Supabase connection:', err.message);
  }
};

testSupabaseConnection();

export default supabase;
