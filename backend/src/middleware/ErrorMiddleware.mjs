// Global error handling middleware (handles Multer file upload limits, format errors, and unexpected server errors)
export const errorHandler = (err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size too large. Maximum allowed size is 5MB for avatar/shop and 10MB for background.' });
    }
    if (err.message && err.message.includes('Invalid file format')) {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ error: err.message || 'Internal Server Error' });
};
