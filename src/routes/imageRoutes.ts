import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { uploadImage } from "../controllers/imageController";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 40 * 1024 * 1024 }, // Limit to 40MB
});

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);

export default router;
