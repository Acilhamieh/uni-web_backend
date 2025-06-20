// controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'token';

// -----------------------------
// Register
// -----------------------------
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    await createUser({ firstName, lastName, email, password, role });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(400).json({ error: err.message });
  }
};

// -----------------------------
// Login
// -----------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '3d' });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    res.status(200).json({
      message: 'Login successful',
      role: user.role,
      userId: user.id,
      customUserId: user.custom_user_id,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(400).json({ error: err.message });
  }
};

// -----------------------------
// Logout
// -----------------------------
export const logout = (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.status(200).json({ message: 'Logged out successfully' });
};
