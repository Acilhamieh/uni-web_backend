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