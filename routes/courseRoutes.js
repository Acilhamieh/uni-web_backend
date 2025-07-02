import express from 'express';
import { handleAddCourse,handleDeleteCourse,handleGetAllCourses,handleUpdateCourse,handleGetCourseById} from '../controllers/courseController.js';

const router = express.Router();

router.post('/', handleAddCourse);//done
router.get('/', handleGetAllCourses);//done
router.put('/:id', handleUpdateCourse);
router.delete('/:id', handleDeleteCourse);
 router.get('/:id', handleGetCourseById);//done

export default router;
