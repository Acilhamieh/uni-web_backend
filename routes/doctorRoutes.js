import express from 'express';
import {
  getAllDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';

const router = express.Router();

router.get('/', getAllDoctors);//done 
router.post('/', addDoctor);//done
router.put('/:id', updateDoctor);//done
router.delete('/:id', deleteDoctor);//done

export default router;
