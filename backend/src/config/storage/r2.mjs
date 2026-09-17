import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({
    region: process.env.S3_REGION || process.env.R2_REGION || "auto",
    endpoint: process.env.S3_ENDPOINT || process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || process.env.R2_BUCKET_NAME || process.env.AWS_BUCKET_NAME || "linkify";

// Multer upload middleware connecting to Cloudflare R2 / AWS S3 with customizable folder, prefix, formats, and max file size limit
export const createR2Uploader = (folder, prefix, allowedFormats = ["jpg", "png", "jpeg"], maxSizeMB = 5) => {
    const storage = multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const ext = file.originalname.split(".").pop() || "jpg";
            const filename = `${prefix}_${req.user?.id || "guest"}_${Date.now()}.${ext}`;
            cb(null, `linkify/${folder}/${filename}`);
        },
    });

    return multer({
        storage,
        limits: {
            fileSize: maxSizeMB * 1024 * 1024, // File size limit in bytes
        },
        fileFilter: (req, file, cb) => {
            const ext = file.originalname.split(".").pop()?.toLowerCase();
            if (ext && allowedFormats.includes(ext)) {
                cb(null, true);
            } else {
                cb(new Error(`Invalid file format. Allowed: ${allowedFormats.join(", ")}`));
            }
        },
    });
};

// Helper function to delete files from Cloudflare R2 / AWS S3 via URL or Key
export const deleteR2Image = async (imageUrl) => {
    if (!imageUrl || typeof imageUrl !== "string") return;

    try {
        let key = imageUrl;

        // Extract key if full URL is passed
        if (imageUrl.includes("http://") || imageUrl.includes("https://")) {
            const urlObj = new URL(imageUrl);
            key = urlObj.pathname.startsWith("/") ? urlObj.pathname.substring(1) : urlObj.pathname;
        }

        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });

        await s3.send(command);
    } catch (err) {
        console.error("Failed to delete file from Cloudflare R2 / AWS S3:", err.message);
    }
};

// Upload middleware by module with file size limits (5MB for avatar/shop, 10MB for background)
export const avatarUpload = createR2Uploader("avatars", "avatar", ["jpg", "png", "jpeg"], 5);
export const backgroundUpload = createR2Uploader("backgrounds", "bg", ["jpg", "png", "jpeg", "gif"], 10);
export const shopUpload = createR2Uploader("shop-products", "product", ["jpg", "png", "jpeg"], 5);

// Aliases for seamless switching between storage implementations
export const createUploader = createR2Uploader;
export const deleteCloudinaryImage = deleteR2Image;
