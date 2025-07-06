import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import {
  createSessionController,
  getAllSessionsController,
} from '../controllers/sessionController.js';

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'question_pdf' },
    { name: 'solution_pdf' },
  ]),
  createSessionController
);

router.get('/', getAllSessionsController);

export default router;
