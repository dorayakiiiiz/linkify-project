
import Profile from "../models/Profile.mjs";
import Link from "../models/Link.mjs";
import Product from "../models/Product.mjs";

class ProfileController {
    // [POST] /api/profile/onboarding
    async createProfile(req, res, next) {
        try {
            if (!req.file) 
                return res.status(400).json({ msg: 'Please update an avatar image' });

            const avatarUrl = req.file.path;

            const { username, bio } = req.body;

            const profile = await Profile.create({
                userId: req.user.id,
                username,
                avatarUrl,
                bio 
            });


            res.json({ message: 'Register successfully!', profileId: profile._id });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
    // [GET] /api/profile/me
    async getProfiles(req, res, next) {
        try {

            const userId = req.user.id;
            const profiles = await Profile.find({ userId });

            res.status(200).json({ profiles });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [GET] /api/profile/public/:username
    async getPublicProfile(req, res, next) {
        try {
            const { username } = req.params;
            const profile = await Profile.findOne({ username, isActive: true });

            if (!profile) {
                return res.status(404).json({ message: 'Profile not found or deactivated/' });
            }

            res.status(200).json({ profile });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [GET] /api/profile/check-username/:username
    async checkUsername(req, res, next) {
        try {
            const { username } = req.params;
            
            const profile = await Profile.findOne({ username: username.toLowerCase() });

            res.status(200).json({ isAvailable: !profile });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [PATCH] /api/profile
    async updateProfile(req, res, next) {
        try {
            const { username, bio, profileId } = req.body;
            
            const currentProfile = await Profile.findById(profileId);
            if (!currentProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }

            if (username && username !== currentProfile.username) {
                const existingProfile = await Profile.findOne({ username });
                if (existingProfile) {
                    return res.status(400).json({ message: "Username is already taken." });
                }
                currentProfile.username = username;
            }

            if (bio !== undefined) {
                currentProfile.bio = bio;
            }

            if (req.file) {
                currentProfile.avatarUrl = req.file.path;
            }

            await currentProfile.save();

            res.status(200).json({ 
                message: "Profile updated successfully", 
                profile: currentProfile 
            });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [PATCH] /api/profile/:profileId/deactivate
    async deactivateProfile(req, res, next) {
        try {
            const { profileId } = req.params;
            
            // cập nhật isActive thành false để khóa profile
            await Profile.findByIdAndUpdate(profileId, { isActive: false });

            res.status(200).json({ message: 'Profile deactivated successfully.' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [PATCH] /api/profile/:profileId/activate
    async reactivateProfile(req, res, next) {
        try {
            const { profileId } = req.params;
            await Profile.findByIdAndUpdate(profileId, { isActive: true });
            res.status(200).json({ message: 'Profile reactivated successfully.' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [DELETE] /api/profile/:profileId
    async deleteProfile(req, res, next) {
        try {

            const { profileId } = req.params;

            // xóa các link và product của profile trước
            await Promise.all([
                Link.deleteMany({ profileId }),
                Product.deleteMany({ profileId })
            ]);
                        
            await Profile.findByIdAndDelete(profileId);

            res.status(200).json({ message: 'Profile deleted successfully.' });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new ProfileController();