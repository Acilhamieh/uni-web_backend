import supabase from '../config/supabase.js';

export async function getAllTrainees() {
  const { data, error } = await supabase
    .from('trainees')
    .select('*')
    .order('id', { ascending: false }); // newest first

  if (error) {
    throw new Error(`Error fetching trainees: ${error.message}`);
  }

  return data;
}
