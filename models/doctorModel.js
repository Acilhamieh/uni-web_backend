import supabase from '../config/supabase.js';

// 🔍 Get all doctors
export async function getAllDoctors() {
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .order('id', { ascending: false });

  if (error) throw new Error(error.message);

  const formattedData = data.map((doctor) => ({
    id: doctor.id,
    full_name: `${doctor.first_name} ${doctor.last_name}`,
    phone: doctor.phone,
    email: doctor.email,
    office_room: doctor.office_room,
    linkedin_url: doctor.linkedin_url,
    created_by: doctor.created_by,
    created_at: doctor.created_at,
    updated_at: doctor.updated_at,
  }));

  return formattedData;
}

// ➕ Add a new doctor
export async function addDoctor({ first_name, last_name, phone, email, office_room, linkedin_url, created_by }) {
  const { data, error } = await supabase
    .from('doctors')
    .insert([{
      first_name,
      last_name,
      phone,
      email,
      office_room,
      linkedin_url,
      created_by,
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  const formattedDoctor = {
    id: data.id,
    full_name: `${data.first_name} ${data.last_name}`,
    phone: data.phone,
    email: data.email,
    office_room: data.office_room,
    linkedin_url: data.linkedin_url,
    created_by: data.created_by,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return formattedDoctor;
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
