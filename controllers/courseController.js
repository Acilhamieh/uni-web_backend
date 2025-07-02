import * as CourseaModel  from '../models/courseModel.js';
// Add a new course
export async function handleAddCourse(req, res) {
  try {
    const courseData = req.body;

    const newCourse = await CourseaModel.addCourse(courseData);

    res.status(201).json({
      success: true,
      message: 'Course added successfully.',
      data: newCourse,
    });
  } catch (error) {
    console.error('Add course error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
//get all courses 
export async function handleGetAllCourses(req, res) {
  try {
    const courses = await CourseaModel.getAllCourses();

    res.status(200).json({
      success: true,
      message: 'Courses retrieved successfully.',
      data: courses,
    });
  } catch (error) {
    console.error('Get all courses error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
//update a course 
export async function handleUpdateCourse(req, res) {
  try {
    const { id } = req.params;
    const courseData = req.body;

    const updatedCourse = await CourseaModel.updateCourse(Number(id), courseData);

    res.status(200).json({
      success: true,
      message: 'Course updated successfully.',
      data: updatedCourse,
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
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



