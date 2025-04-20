import express from "express";
import FileController from "../controllers/fileController.js";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Multer konfigürasyonu
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/'); // veya path.resolve(...) ile tam dizin
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, `${uuidv4()}.${ext}`);
    }   
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        cb(null, allowed.includes(file.mimetype));
    }
});

router.post("/upload", upload.single("image"), FileController.uploadFile);

export default router;