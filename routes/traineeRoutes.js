import express from 'express';
import { handleGetAllTrainees,handleAddTrainee,handleDeleteTrainee } from '../controllers/traineeController.js';

const router = express.Router();

router.get('/', handleGetAllTrainees);
router.post('/', handleAddTrainee);
router.delete('/:id', handleDeleteTrainee); // added delete route
export default router;
