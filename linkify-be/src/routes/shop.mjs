import { Router } from "express";
import shopController from "../controllers/ShopController.mjs";
import authMiddleware from "../middleware/AuthMiddleware.mjs";
import { shopUpload } from "../config/cloudinary.mjs";

const router = Router();

router.get("/:profileId", shopController.getProductsByProfile);

router.post(
  "/",
  authMiddleware,
  shopUpload.single("productImage"),
  shopController.createProduct
);

router.patch(
  "/:itemId",
  authMiddleware,
  shopUpload.single("productImage"),
  shopController.updateProduct
);

router.delete("/:itemId", authMiddleware, shopController.deleteProduct);

export default router;
