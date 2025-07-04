import supabase from '../config/supabase.js';

export async function getReferencesByCourseId(courseId) {
  const { data, error } = await supabase
    .from("references")
    .select("*")
    .eq("course_id", courseId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
// Add a new reference
export async function addReference(referenceData) {
  const { data, error } = await supabase
    .from("references")
    .insert([referenceData])
    .select(); // returns inserted rows

  if (error) {
    throw new Error(error.message);
  }

  return data[0]; // return the inserted reference
}
//delete a reference by id
export async function deleteReference(id) {
  const { data, error } = await supabase
    .from("references")
    .delete()
    .eq("id", id)
    .select(); // returns deleted rows

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    // No rows deleted => not found
    return null;
  }

  return true; // deleted successfully
}
