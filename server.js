import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './config/supabase.js'; 
import doctorRoutes from './routes/doctorRoutes.js';
import authRoutes from './routes/authRoutes.js'; 
import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js'; 

dotenv.config();

const app = express();

// CORS setup
const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes); // e.g. /auth/login, /auth/register
app.use('/api/doctors', doctorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', userRoutes); // Example base path
// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

