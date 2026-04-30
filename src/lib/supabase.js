import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Database features will be disabled.');
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');

export const logEvent = async (eventName, userId, metadata = {}) => {
  try {
    const { error } = await supabase
      .from('events')
      .insert([
        { 
          name: eventName, 
          user_id: userId, 
          metadata,
          timestamp: new Date().toISOString()
        }
      ]);
    if (error) throw error;
  } catch (error) {
    console.error('Error logging event:', error);
  }
};

export const logTransaction = async (txData) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .insert([txData]);
    if (error) throw error;
  } catch (error) {
    console.error('Error logging transaction:', error);
  }
};
