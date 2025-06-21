import supabase from '../config/supabase.js';

// 🔍 Get all doctors
export async function getAllDoctors() {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .order('id', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

// ➕ Add a new doctor
export async function addDoctor({ first_name, last_name, linkedin_url, created_by }) {
  const { data, error } = await supabase
    .from('doctors')
    .insert([{ first_name, last_name, linkedin_url, created_by }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// 🖊️ Update a doctor
export async function updateDoctor(id, { first_name, last_name, linkedin_url }) {
  const { data, error } = await supabase
    .from('doctors')
    .update({
      first_name,
      last_name,
      linkedin_url,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ❌ Delete a doctor
export async function deleteDoctor(id) {
  const { error } = await supabase
    .from('doctors')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return true;
}
