import { Router } from "express";
import userController from "../controllers/UserController.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";

const router = Router();

router.get('/account', authMiddleware, userController.getAccount);
router.delete('/account', authMiddleware, userController.deleteAccount);
router.patch('/password', authMiddleware, userController.changePassword);

export default router;