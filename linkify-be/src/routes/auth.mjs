import { Router } from "express";
import authController from "../controllers/AuthController.mjs";

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;