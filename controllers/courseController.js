import { addCourse ,getAllCourses,deleteCourse } from '../models/courseModel.js';

export async function createCourse(req, res) {
  try {
    const {
      code,
      name,
      credits,
      hours_td,
      hours_tp,
      hours_course,
      classroom_url,
      instructor_id,
      created_by,
      year,
      semester,
    } = req.body;

    const newCourse = await addCourse({
      code,
      name,
      credits,
      hours_td,
      hours_tp,
      hours_course,
      classroom_url,
      instructor_id,
      created_by,
      year,
      semester,
    });

    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//get all courses 
export async function fetchAllCourses(req, res) {
  try {
    const courses = await getAllCourses();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//delete course
export async function removeCourse(req, res) {
  try {
    const id = parseInt(req.params.id);
    await deleteCourse(id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



