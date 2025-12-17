import { Router } from "express";
// import multer from 'multer'
// multer là middleware giúp giải mã data từ form data (dùng khi có ảnh/file 
// up lên request). multer sẽ lưu file tạm vào đâu đó xong truy cập qua req.file/.files

import upload, {backgroundUpload} from "../config/cloudinary.mjs";

import profileController from "../controllers/ProfileController.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";

const router = Router();
// const storage = multer.memoryStorage(); // lưu tạm file trong RAM
// const upload = multer({ storage });

router.get('/public/:username', profileController.getPublicProfile);

router.use(authMiddleware);

router.get('/me', profileController.getProfiles);
router.post('/onboarding', upload.single("avatar"), profileController.createProfile);
router.get('/check-username/:username', profileController.checkUsername);

// Thêm dòng này: Route riêng cho update design 
router.patch('/design', profileController.updateDesign);
// Route upload background image
router.post('/upload-background', backgroundUpload.single("image"), profileController.uploadBackground);
router.patch('/', upload.single("avatar"), profileController.updateProfile);
router.patch('/:profileId/deactivate', profileController.deactivateProfile);
router.patch('/:profileId/activate', profileController.reactivateProfile);
router.delete('/:profileId', profileController.deleteProfile);

export default router;