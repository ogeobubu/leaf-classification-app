import express from 'express';
import dotenv from 'dotenv';
import imageRoutes from './routes/imageRoutes';
import connectDB from './config/db';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/images', imageRoutes);

export default app;
