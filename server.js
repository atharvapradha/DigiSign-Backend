import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import docRoutes from './routes/docRoutes.js';
import fileRoutes from './routes/fileroutes.js';
import signRoutes from './routes/signRoute.js';

import { connectDB } from './config/dbconfigrations.js';

const app = express();
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Updated CORS to allow both local and deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://digi-sign-frontend.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Serve static files
app.use('/uploads', express.static('uploads'));
app.use('/signed', express.static('signed'));

// ✅ Routes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/docs', docRoutes);
app.use('/api', fileRoutes);
app.use('/api/sign', signRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('API is working!');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
