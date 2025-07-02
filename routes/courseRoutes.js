import express from 'express';
import { handleAddCourse,removeCourse,handleGetAllCourses} from '../controllers/courseController.js';

const router = express.Router();

router.post('/', handleAddCourse);//done
router.get('/', handleGetAllCourses);
router.delete('/:id', removeCourse);//done  

export default router;
