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
//add a new trainee
export async function addTrainee(traineeData) {
  const { data, error } = await supabase
    .from('trainees')
    .insert([traineeData])
    .select(); // returns inserted rows

  if (error) {
    throw new Error(`Error adding trainee: ${error.message}`);
  }

  return data[0]; // return the inserted trainee
}
//delete trainee by id
export async function deleteTrainee(id) {
  // First, check if trainee exists
  const { data: existing, error: fetchError } = await supabase
    .from('trainees')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // exclude "No rows found" code
    throw new Error(`Error checking trainee existence: ${fetchError.message}`);
  }

  if (!existing) {
    return null; // trainee does not exist
  }

  // Delete trainee
  const { data, error } = await supabase
    .from('trainees')
    .delete()
    .eq('id', id)
    .select(); // returns deleted row(s)

  if (error) {
    throw new Error(`Error deleting trainee: ${error.message}`);
  }

  return data[0]; // return deleted trainee
}