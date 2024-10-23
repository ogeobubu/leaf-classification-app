import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import imageRoutes from './routes/imageRoutes';
import connectDB from './config/db';
import path from 'path';

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/images', imageRoutes);
app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, '../client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

export default app;
