import express from 'express';
import { handleAddCourse,removeCourse,handleGetAllCourses,handleUpdateCourse} from '../controllers/courseController.js';

const router = express.Router();

router.post('/', handleAddCourse);//done
router.get('/', handleGetAllCourses);//done
router.put('/:id', handleUpdateCourse);
router.delete('/:id', removeCourse);

export default router;
