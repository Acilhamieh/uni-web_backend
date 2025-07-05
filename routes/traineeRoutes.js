import express from 'express';
import { handleGetAllTrainees } from '../controllers/traineeController.js';

const router = express.Router();

router.get('/', handleGetAllTrainees);

export default router;
