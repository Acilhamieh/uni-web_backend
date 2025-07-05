import express from 'express';
import { handleGetAllTrainees,handleAddTrainee } from '../controllers/traineeController.js';

const router = express.Router();

router.get('/', handleGetAllTrainees);
router.post('/', handleAddTrainee);

export default router;
