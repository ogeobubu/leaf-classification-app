import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import imageRoutes from './routes/imageRoutes';
import connectDB from './config/db';

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/images', imageRoutes);
app.use('/uploads', express.static('uploads'));

export default app;
