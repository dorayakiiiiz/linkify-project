import ShopItem from "../models/ShopItem.mjs";
import Profile from "../models/Profile.mjs";

class ShopController {
  // [GET] /api/shop/:profileId - Get all products by profile (public)
  async getProductsByProfile(req, res, next) {
    try {
      const { profileId } = req.params;
      const products = await ShopItem.find({ profile: profileId }).sort({
        createdAt: -1,
      });
      res.status(200).json({ products });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // [POST] /api/shop - Create new product (private, requires auth)
  async createProduct(req, res, next) {
    try {
      const { name, price, description, buyLink, profileId } = req.body;

      const profile = await Profile.findById(profileId);

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      if (profile.userId.toString() !== req.user.id) {
        return res.status(403).json({
          error: "Unauthorized: You can only add products to your own profile",
        });
      }

      const imageUrl = req.file ? req.file.path : "";
      const newProduct = await ShopItem.create({
        profile: profileId,
        name,
        price,
        description: description || "",
        buyLink: buyLink || "",
        imageUrl,
      });

      res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // [PATCH] /api/shop/:itemId - Update product (private, requires auth)
  async updateProduct(req, res, next) {
    try {
      const { itemId } = req.params;
      const product = await ShopItem.findById(itemId).populate("profile");
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.profile.userId.toString() !== req.user.id) {
        return res.status(403).json({
          error: "Unauthorized: You can only update your own products",
        });
      }

      const updates = { ...req.body };

      if (req.file) {
        updates.imageUrl = req.file.path;
      }

      const updatedProduct = await ShopItem.findByIdAndUpdate(itemId, updates, {
        new: true,
      });

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // [DELETE] /api/shop/:itemId - Delete product (private, requires auth)
  async deleteProduct(req, res, next) {
    try {
      const { itemId } = req.params;
      const product = await ShopItem.findById(itemId).populate("profile");

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.profile.userId.toString() !== req.user.id) {
        return res.status(403).json({
          error: "Unauthorized: You can only delete your own products",
        });
      }

      await ShopItem.findByIdAndDelete(itemId);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new ShopController();
