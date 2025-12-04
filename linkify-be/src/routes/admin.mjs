import { Router } from "express";

import authMiddleware from "../middleware/AuthMiddleware.mjs";
import adminController from "../controllers/AdminController.mjs";

const router = Router();

// fix thành adminMiddleware sau
router.use(authMiddleware);

router.get('/users', adminController.getAllUser);

router.get('/users/:id', adminController.getUserDetails);

router.patch('/users/:id/lock', adminController.toggleLockUser);

router.get('/links', adminController.getAllLinks);

router.patch('/links/:id/resolve', adminController.resolveLinkViolation);

router.get('/products', adminController.getAllProducts);

// safe/banned/ban_user (có thao tác xóa trong này)
router.patch('/products/:id/resolve', adminController.resolveProductViolation);


export default router;