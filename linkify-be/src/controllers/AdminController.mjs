import User from "../models/User.mjs";

class AdminController {
    // [GET] /api/admin/users
    async getAllUser(req, res, next) {
        try {
            const { page = 1, limit = 10, search = '', status } = req.query;

            const query = {
                role: 'creator'
            };

            if (search) {
                query.$or = [
                    // i: ignore case
                    { displayName: { $regex: search, $options: 'i' }},
                    { email: { $regex: search, $options: 'i' }},
                ]
            }

            if (status && status !== 'all') {
                query.isLocked = status === 'locked';
            }

            // parse từ string
            const skip = (parseInt(page) - 1) * parseInt(limit);

            const users = await User.find(query)
                .select('-password')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit));

            const totalUsers = await User.countDocuments(query);
            
            return res.status(200).json({
                data: users,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: totalUsers,
                    totalPages: Math.ceil(totalUsers / parseInt(limit))
                }
            });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [PATCH] /api/admin/users/:id/lock
    async toggleLockUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            if (user.role === 'admin') {
                 return res.status(403).json({ message: 'Cannot lock an admin account.' });
            }

            user.isLocked = !user.isLocked;
            await user.save();

            return res.status(200).json({ message: 'User locked successfully!'})


        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
}

export default new AdminController();

