import supabase from '../config/supabase.js';
// ➕ Add a course
export async function addCourse(courseData) {
  const { data, error } = await supabase
    .from('courses')
    .insert([courseData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getAllCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      doctors (
        id,
        first_name,
        last_name
      ),
      users (
        id,
        firstName,
        lastName
      )
    `)
    .order('id', { ascending: false });

  if (error) throw new Error(error.message);
  return data.map(course => ({
    ...course,
    instructor: course.doctors
      ? {
          id: course.doctors.id,
          full_name: `${course.doctors.first_name} ${course.doctors.last_name}`,
        }
      : null,
    created_by_user: course.users
      ? {
          id: course.users.id,
          full_name: `${course.users.firstName} ${course.users.lastName}`,
        }
      : null,
  }));
}
//delete course
export async function deleteCourse(id) {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return true;
}