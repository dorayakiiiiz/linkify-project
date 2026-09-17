import { Router } from "express";

import authenticationMiddleware from "../middleware/AuthenticationMiddleware.mjs";
import authorizationMiddleware from "../middleware/AuthorizationMiddleware.mjs";
import adminController from "../controllers/AdminController.mjs";

const router = Router();

// Xác thực đăng nhập (Authentication)
router.use(authenticationMiddleware);
// Phân quyền Admin (Authorization)
router.use(authorizationMiddleware('admin'));

router.get('/users', adminController.getAllUser);
router.get('/users/:id', adminController.getUserDetails);
router.patch('/users/:id/lock', adminController.toggleLockUser);
router.get('/links', adminController.getAllLinks);
router.patch('/links/:id/resolve', adminController.resolveLinkViolation);
router.get('/products', adminController.getAllProducts);
// safe/banned/ban_user (có thao tác xóa trong này)
router.patch('/products/:id/resolve', adminController.resolveProductViolation);
router.get('/analytics', adminController.getSystemAnalytics);


export default router;