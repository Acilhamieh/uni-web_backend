import express from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /auth/register
router.post('/register', register);

// @route   POST /auth/login
router.post('/login', login);

// @route   POST /auth/logout
router.post('/logout', logout);

export default router;
