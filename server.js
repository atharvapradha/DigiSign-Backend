import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import docRoutes from './routes/docRoutes.js';
import fileRoutes from './routes/fileroutes.js';
import signRoutes from './routes/signRoute.js'; // ✅ Import signature route

import { connectDB } from './config/dbconfigrations.js';

const app = express();
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Adjust this based on frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Serve static files
app.use('/uploads', express.static('uploads'));
app.use('/signed', express.static('signed')); // ✅ Optional: serve signed PDFs

// ✅ Routes
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/docs', docRoutes);
app.use('/api', fileRoutes);
app.use('/api/sign', signRoutes); // ✅ Signature route added here

// ✅ Health check
app.get('/', (req, res) => {
  res.send('API is working!');
});

// ✅ Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
