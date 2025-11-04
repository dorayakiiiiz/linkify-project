import { Router } from "express";
import userController from "../controllers/UserController.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";

const router = Router();

router.get('/account', authMiddleware, userController.getAccount);

export default router;