import { Router } from "express";
// import multer from 'multer'
// multer là middleware giúp giải mã data từ form data (dùng khi có ảnh/file 
// up lên request). multer sẽ lưu file tạm vào đâu đó xong truy cập qua req.file/.files

import upload from "../config/cloudinary.mjs";

import profileController from "../controllers/ProfileController.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";

const router = Router();
// const storage = multer.memoryStorage(); // lưu tạm file trong RAM
// const upload = multer({ storage });

router.post('/onboarding', authMiddleware, upload.single("avatar"), profileController.createProfile);

export default router;