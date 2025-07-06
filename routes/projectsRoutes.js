import express from 'express';
import upload from '../middlewares/uploadMiddleware.js'; // multer middleware
import { createProjectController } from '../controllers/projectsController.js';

const router = express.Router();

// 📁 For multipart/form-data with multiple files:
router.post(
  '/',
  upload.fields([
    { name: 'report_pdf', maxCount: 1 },
    { name: 'presentation_pdf', maxCount: 1 },
  ]),
  createProjectController
);

export default router;
