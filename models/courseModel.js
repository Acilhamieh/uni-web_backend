import supabase from '../config/supabase.js';
// ➕ Add a course

export async function addCourse({
  code,
  name,
  credits,
  hours_td,
  hours_tp,
  hours_course,
  classroom_url = null,
  created_by,
  semester,
  level,
  prequisties = null,
  description,
  objective,
  instructor_id,
}) {
  const { data, error } = await supabase
    .from('courses')
    .insert([{
      code,
      name,
      credits,
      hours_td,
      hours_tp,
      hours_course,
      classroom_url,
      created_by,
      semester,
      level,
      prequisties,
      description,
      objective,
      instructor_id,
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  const formattedCourse = {
    id: data.id,
    code: data.code,
    name: data.name,
    credits: data.credits,
    hours_td: data.hours_td,
    hours_tp: data.hours_tp,
    hours_course: data.hours_course,
    classroom_url: data.classroom_url,
    created_by: data.created_by,
    semester: data.semester,
    level: data.level,
    prequisties: data.prequisties,
    description: data.description,
    objective: data.objective,
    instructor_id: data.instructor_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return formattedCourse;
}

//get all courses
// This function retrieves all courses from the 'courses' table, including related doctor and user information.
export async function getAllCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      id,
      code,
      name,
      credits,
      hours_td,
      hours_tp,
      hours_course,
      classroom_url,
      created_by,
      semester,
      level,
      prequisties,
      description,
      objective,
      instructor_id,   
      created_at,
      updated_at,
      doctors (
        first_name,
        last_name
      )
    `)
    .order('id', { ascending: false });

  if (error) throw new Error(error.message);

  const formattedCourses = data.map(course => ({
    id: course.id,
    code: course.code,
    name: course.name,
    credits: course.credits,
    hours_td: course.hours_td,
    hours_tp: course.hours_tp,
    hours_course: course.hours_course,
    classroom_url: course.classroom_url,
    created_by: course.created_by,
    semester: course.semester,
    level: course.level,
    prequisties: course.prequisties,
    description: course.description,
    objective: course.objective,
    instructor_id: course.instructor_id, // added to response
    instructor_name: course.doctors
      ? `${course.doctors.first_name} ${course.doctors.last_name}`
      : null,
    created_at: course.created_at,
    updated_at: course.updated_at,
  }));

  return formattedCourses;
}
//update course 
export async function updateCourse(id, {
  code,
  name,
  credits,
  hours_td,
  hours_tp,
  hours_course,
  classroom_url = null,
  created_by,
  semester,
  level,
  prequisties = null,
  description,
  objective,
  instructor_id,
}) {
  const { data, error } = await supabase
    .from('courses')
    .update({
      code,
      name,
      credits,
      hours_td,
      hours_tp,
      hours_course,
      classroom_url,
      created_by,
      semester,
      level,
      prequisties,
      description,
      objective,
      instructor_id,
      // updated_at is handled by trigger, no need to set here
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    id: data.id,
    code: data.code,
    name: data.name,
    credits: data.credits,
    hours_td: data.hours_td,
    hours_tp: data.hours_tp,
    hours_course: data.hours_course,
    classroom_url: data.classroom_url,
    created_by: data.created_by,
    semester: data.semester,
    level: data.level,
    prequisties: data.prequisties,
    description: data.description,
    objective: data.objective,
    instructor_id: data.instructor_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}
//get course by id
export async function getCourseById(id) {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      id,
      code,
      name,
      credits,
      hours_td,
      hours_tp,
      hours_course,
      classroom_url,
      created_by,
      semester,
      level,
      prequisties,
      description,
      objective,
      created_at,
      updated_at,
      doctors (
        first_name,
        last_name
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  const course = {
    id: data.id,
    code: data.code,
    name: data.name,
    credits: data.credits,
    hours_td: data.hours_td,
    hours_tp: data.hours_tp,
    hours_course: data.hours_course,
    classroom_url: data.classroom_url,
    created_by: data.created_by,
    semester: data.semester,
    level: data.level,
    prequisties: data.prequisties,
    description: data.description,
    objective: data.objective,
    instructor_name: data.doctors
      ? `${data.doctors.first_name} ${data.doctors.last_name}`
      : null,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return course;
}


//delete course
export async function deleteCourse(id) {
  const { data, error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') { // no rows found
      throw new Error(`Course with id ${id} not found.`);
    }
    throw new Error(error.message);
  }

  return true;
}