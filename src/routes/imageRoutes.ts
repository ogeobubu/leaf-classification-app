import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/imageController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     summary: Uploads an image for leaf classification
 *     tags:
 *       - Images
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The leaf image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 leaf:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     species:
 *                       type: string
 *                     image:
 *                       type: string
 *                     features:
 *                       type: object
 *                       properties:
 *                         length:
 *                           type: number
 *                         width:
 *                           type: number
 *                         color:
 *                           type: string
 * 
 * /api/leaves:
 *   get:
 *     summary: Get all classified leaves
 *     tags:
 *       - Leaves
 *     responses:
 *       200:
 *         description: Successfully retrieved all leaves
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   species:
 *                     type: string
 *                   image:
 *                     type: string
 *                   features:
 *                     type: object
 *                     properties:
 *                       length:
 *                         type: number
 *                       width:
 *                         type: number
 *                       color:
 *                         type: string
 */

router.post('/upload', upload.single('image'), uploadImage);

export default router;
