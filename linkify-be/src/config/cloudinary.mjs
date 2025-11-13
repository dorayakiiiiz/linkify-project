import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// config up ảnh lên cloudinary

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'linkify/avatars',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => {
            const userId = req.user.id; 
            return `avatar_${userId}_${Date.now()}`;
        }
    }
});

const upload = multer({ storage });

export default upload;