import express from 'express';
import {
  handleGetAllDoctors,
  handleAddDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';

const router = express.Router();

router.get('/', handleGetAllDoctors);//done 
router.post('/', handleAddDoctor);//done
router.put('/:id', updateDoctor);//done
router.delete('/:id', deleteDoctor);//done

export default router;
