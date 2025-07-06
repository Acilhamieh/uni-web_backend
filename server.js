import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './config/supabase.js'; 
import doctorRoutes from './routes/doctorRoutes.js';
import authRoutes from './routes/authRoutes.js'; 
import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js'; 
import referencesRoutes from './routes/referencesRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import traineeRoutes from './routes/traineeRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import projectRoutes from './routes/projectsRoutes.js';

dotenv.config();

const app = express();

// ✅ Fixed CORS setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.startsWith('http://localhost')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', userRoutes); // Example base path 
app.use('/api/references', referencesRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/trainees', traineeRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/projects', projectRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
  