import { Router } from "express";
import userController from "../controllers/UserController.mjs";
import authenticationMiddleware from "../middleware/AuthenticationMiddleware.mjs";

const router = Router();

router.use(authenticationMiddleware);

router.get('/account', userController.getAccount);
router.patch('/info', userController.updateAccountInfo);
router.delete('/account', userController.deleteAccount);
router.patch('/password', userController.changePassword);

export default router;