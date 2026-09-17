import { Router } from "express";
// import { avatarUpload, backgroundUpload } from "../config/storage/cloudinary.mjs";
import { avatarUpload, backgroundUpload } from "../config/storage/r2.mjs";
import profileController from "../controllers/ProfileController.mjs";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware.mjs";

const router = Router();

router.get('/public/:username', profileController.getPublicProfile);

router.use(authenticationMiddleware);

router.get('/me', profileController.getProfiles);
router.post('/onboarding', avatarUpload.single("avatar"), profileController.createProfile);
router.get('/check-username/:username', profileController.checkUsername);

// Route riêng cho update design 
router.patch('/design', profileController.updateDesign);
// Route upload background image
router.post('/upload-background', backgroundUpload.single("image"), profileController.uploadBackground);
router.patch('/', avatarUpload.single("avatar"), profileController.updateProfile);
router.patch('/:profileId/deactivate', profileController.deactivateProfile);
router.patch('/:profileId/activate', profileController.reactivateProfile);
router.delete('/:profileId', profileController.deleteProfile);

export default router;