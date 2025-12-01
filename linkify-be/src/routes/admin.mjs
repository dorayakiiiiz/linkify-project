import { Router } from "express";

import authMiddleware from "../middleware/AuthMiddleware.mjs";
import adminController from "../controllers/AdminController.mjs";

const router = Router();

// fix thành adminMiddleware sau
router.use(authMiddleware);

router.get('/users', adminController.getAllUser);

router.patch('/users/:id/lock', adminController.toggleLockUser);

export default router;