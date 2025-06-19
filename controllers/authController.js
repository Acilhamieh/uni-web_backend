import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supabase from '../config/supabase.js';

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'token'; // You can name it anything

// -----------------------------
// Register
// -----------------------------
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role = 'student' } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from('users').insert([
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
    ]);

    if (error) return res.status(400).json({ error: error.message });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// -----------------------------
// Login
// -----------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '3d' });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    return res.status(200).json({
      message: 'Login successful',
      role: user.role,
      userId: user.id,
      customUserId: user.custom_user_id,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// -----------------------------
// Logout
// -----------------------------
export const logout = (req, res) => {
  res.clearCookie(COOKIE_NAME);
  return res.status(200).json({ message: 'Logged out successfully' });
};
