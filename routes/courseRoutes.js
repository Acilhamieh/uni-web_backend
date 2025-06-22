import express from 'express';
import { createCourse ,removeCourse} from '../controllers/courseController.js';

const router = express.Router();

router.post('/', createCourse);//done
router.delete('/:id', removeCourse);//done

export default router;
