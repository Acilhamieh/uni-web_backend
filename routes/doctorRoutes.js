import express from 'express';
import {
  handleGetAllDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';

const router = express.Router();

router.get('/', handleGetAllDoctors);//done 
router.post('/', addDoctor);//done
router.put('/:id', updateDoctor);//done
router.delete('/:id', deleteDoctor);//done

export default router;
