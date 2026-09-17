import User from "../models/User.mjs";
import Profile from "../models/Profile.mjs";
import Link from "../models/Link.mjs";
import Product from "../models/Product.mjs";
// import { deleteCloudinaryImage } from "../config/storage/cloudinary.mjs";
import { deleteR2Image } from "../config/storage/r2.mjs";

import bcrypt from 'bcrypt';

const saltRounds = 10;

class UserController {
    // [GET] /api/user/account
    async getAccount(req, res, next) {
        try {
            // req.user chứa id và role lưu trong auth controller lúc login và gửi jwt về
            const user = await User.findById(req.user.id);
            if (!user) 
                return res.status(404).json({ message: "User not found"});

            res.status(200).json({
                message: "Get account successfully",
                user: {
                    id: user._id,
                    email: user.email,
                    displayName: user.displayName,
                    role: user.role,
                    isLocked: user.isLocked,
                }
            })

        } catch(err) {
            res.status(500).json({ message: err.message });
        }
    }

    // [PATCH] /api/user/password
    async changePassword(req, res, next) {
        try {

            const { currentPassword, newPassword } = req.body;
            const userId = req.user.id;

            const user = await User.findById(userId);

            if (user.loginMethod !== 'local') {
                return res.status(400).json({ message: 'You are logged in via social media. Cannot change password.' });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect.' });
            }

            const hashPassword = await bcrypt.hash(newPassword, saltRounds);
            user.password = hashPassword;
            await user.save();

            res.status(200).json({ message: 'Password changed successfully.' });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // [PATCH] /api/user/info
    async updateAccountInfo(req, res, next) {
        try {
            const { displayName } = req.body;
            const userId = req.user.id;

            const user = await User.findByIdAndUpdate(userId, { displayName }, { new: true });

            const userResponse = {
                id: user._id,
                email: user.email,
                displayName: user.displayName,
                role: user.role,
                isLocked: user.isLocked,
            };

            res.status(200).json({ message: 'Account info updated successfully.', userResponse });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // [DELETE] /api/user/account
    async deleteAccount(req, res, next) {
        try {
            const userId = req.user.id;

            const profiles = await Profile.find({ userId });

            const profileIds = profiles.map(profile => profile._id);

            if (profileIds.length > 0) {
                // Xóa tất cả ảnh sản phẩm của các profile khỏi Cloudinary
                const products = await Product.find({ profileId: { $in: profileIds } });
                for (const prod of products) {
                    if (prod.imageUrl) {
                        // await deleteCloudinaryImage(prod.imageUrl);
                        await deleteR2Image(prod.imageUrl);
                    }
                }

                await Promise.all([
                    Link.deleteMany({ profileId: { $in: profileIds } }),
                    Product.deleteMany({ profileId: { $in: profileIds } })
                ]);
            }

            // Xóa tất cả avatar và background image của các profile khỏi Cloudinary
            for (const prof of profiles) {
                if (prof.avatarUrl) {
                    // await deleteCloudinaryImage(prof.avatarUrl);
                    await deleteR2Image(prof.avatarUrl);
                }
                if (prof.design?.background?.imageUrl) {
                    // await deleteCloudinaryImage(prof.design.background.imageUrl);
                    await deleteR2Image(prof.design.background.imageUrl);
                }
            }

            await Profile.deleteMany({ userId });
            
            await User.findByIdAndDelete(userId);

            res.json({ message: 'Account deleted successfully.' });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}

export default new UserController();