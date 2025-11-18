import { Router } from "express";
import linkController from "../controllers/LinkController.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";

const router = Router();

router.post('/create', authMiddleware, linkController.createLink);

// router.delete('/delete-link', (req, res) => {
//     res.send(`Delete Link with ID: ${req.params.id}`);
// });

// router.patch('/update-link', (req, res) => {
//     res.send(`Update Link with ID: ${req.params.id}`);
// });


export default router;

