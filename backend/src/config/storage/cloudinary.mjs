import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer upload middleware connecting to Cloudinary with customizable folder, prefix, formats, and file size limit
export const createUploader = (folder, prefix, allowedFormats = ["jpg", "png", "jpeg"], maxSizeMB = 5) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: `linkify/${folder}`,
            allowed_formats: allowedFormats,
            public_id: (req) => `${prefix}_${req.user?.id || "guest"}_${Date.now()}`,
        },
    });

    return multer({
        storage,
        limits: {
            fileSize: maxSizeMB * 1024 * 1024, // File size limit in bytes
        },
    });
};

// Helper function to delete image from Cloudinary via URL
export const deleteCloudinaryImage = async (imageUrl) => {
    if (!imageUrl || typeof imageUrl !== "string" || !imageUrl.includes("cloudinary")) return;

    try {
        const splitUrl = imageUrl.split("/upload/");
        if (splitUrl.length < 2) return;

        let publicIdWithExt = splitUrl[1];
        // Remove version if present (e.g. v1741500000/)
        if (publicIdWithExt.startsWith("v")) {
            publicIdWithExt = publicIdWithExt.replace(/^v\d+\//, "");
        }

        // Remove extension (.jpg, .png, .jpeg, .gif...)
        const lastDotIndex = publicIdWithExt.lastIndexOf(".");
        if (lastDotIndex !== -1) {
            publicIdWithExt = publicIdWithExt.substring(0, lastDotIndex);
        }

        await cloudinary.uploader.destroy(publicIdWithExt);
    } catch (err) {
        console.error("Failed to delete image from Cloudinary:", err.message);
    }
};

// Upload middleware by module with file size limits (5MB for avatar/shop, 10MB for background)
export const avatarUpload = createUploader("avatars", "avatar", ["jpg", "png", "jpeg"], 5);
export const backgroundUpload = createUploader("backgrounds", "bg", ["jpg", "png", "jpeg", "gif"], 10);
export const shopUpload = createUploader("shop-products", "product", ["jpg", "png", "jpeg"], 5);
