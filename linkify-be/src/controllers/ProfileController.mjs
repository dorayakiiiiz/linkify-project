
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
            //Ở đây design là object chứa thông tin design cần update
            const { username, bio, profileId, design, donation, footerEnable } = req.body;
            
            //Tìm profile theo profileId
            const currentProfile = await Profile.findById(profileId);
            if (!currentProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }

            //Cập nhật username nếu có và chưa trùng
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

            if (footerEnable !== undefined) {
                currentProfile.footerEnable = footerEnable === "true" || footerEnable === true;
            }

            //Updata design nếu có
            if (design) {
                let designObj = design;
                // Nếu gửi qua FormData (dạng string), cần parse lại thành object
                if (typeof design === 'string') {
                    try { designObj = JSON.parse(design); } catch (e) { designObj = design; }
                }
                
                // Merge design mới vào design cũ
                currentProfile.design = {
                    ...currentProfile.design,
                    ...designObj
                };
            }

            //Cập nhật donation nếu có
            if (donation) {
                let donationObj = donation;
                if (typeof donation === 'string') {
                    try { donationObj = JSON.parse(donation); } catch(e) { donationObj = donation; }
                }

                currentProfile.donation = {
                    ...currentProfile.donation,
                    ...donationObj
                };
            }

            if (req.file) {
                currentProfile.avatarUrl = req.file.path;
            }
            // QUAN TRỌNG: Báo cho Mongoose biết field 'design' đã thay đổi
            currentProfile.markModified('design'); 
            await currentProfile.save();

            res.status(200).json({ 
                message: "Profile updated successfully", 
                profile: currentProfile 
            });

        } catch (err) {
            console.error("Lỗi khi cập nhật profile:", err);
            res.status(500).json({ error: err.message });
        }
    }

    // [PATCH] /api/profile/design
    async updateDesign(req, res, next) {
        try {
            const { profileId, design } = req.body;
            
            if (!profileId) {
                return res.status(400).json({ message: "Profile ID is required" });
            }
            
            const currentProfile = await Profile.findById(profileId);
            if (!currentProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }

            let designObj = design;
            if (design && typeof design === 'string') {
                try { designObj = JSON.parse(design); } catch (e) { /* keep as-is */ }
            }


            if (designObj) {
                // Helper function để sanitize size (chuyển medium -> small)
                const sanitizeSize = (val) => {
                    if (!val) return 'small'; // Nếu null/undefined -> về small
                    return val === 'medium' ? 'small' : val;
                };

                // Merge thủ công từng phần
                // 1. Header
                if (design.header) {
                    const oldHeader = currentProfile.design.header || {};
                    
                    currentProfile.design.header = {
                        ...oldHeader,
                        ...design.header,
                        // Ép kiểu lại size
                        sizeUsername: sanitizeSize(design.header.sizeUsername || oldHeader.sizeUsername),
                        sizeBio: sanitizeSize(design.header.sizeBio || oldHeader.sizeBio),
                    };
                }

                // 2. Text
                if (design.text) {
                    const oldText = currentProfile.design.text || {};
                    currentProfile.design.text = {
                        ...oldText,
                        ...design.text,
                        size: sanitizeSize(design.text.size || oldText.size),
                    };
                }

                // 3. Buttons
                if (design.buttons) {
                    currentProfile.design.buttons = {
                        ...currentProfile.design.buttons,
                        ...design.buttons
                    };
                }

                // 4. Background
                if (design.background) {
                    currentProfile.design.background = {
                        ...currentProfile.design.background,
                        ...design.background
                    };
                }

                // 5. Donation Button (Mới thêm)
                if (design.donationButton) {
                    // Merge sâu để không mất các field con như shape, style, color
                    currentProfile.design.donationButton = {
                        ...currentProfile.design.donationButton,
                        ...design.donationButton
                    };
                }

                // 6. Footer Style (Mới thêm)
                if (design.footer) {
                    currentProfile.design.footer = {
                        ...currentProfile.design.footer,
                        ...design.footer
                    };
                }
                
                // Báo cho Mongoose biết field 'design' đã thay đổi
                currentProfile.markModified('design'); 
            }

            await currentProfile.save();

            res.status(200).json({ 
                message: "Design updated successfully", 
                profile: currentProfile 
            });

        } catch (err) {
            console.error("Error Message:", err.message);
            
            // In chi tiết lỗi Validation nếu có
            if (err.name === 'ValidationError') {
                console.error("Mongoose Validation Details:", JSON.stringify(err.errors, null, 2));
            } else {
                console.error("Full Error:", err);
            }

            res.status(500).json({ error: err.message, details: err.errors });
        }
    }

    // [POST] /api/profile/upload-background
    //Chỉ dùng để upload background image
    async uploadBackground(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No image uploaded" });
            }

            const { profileId } = req.body;
            if (!profileId) {
                return res.status(400).json({ message: "Profile ID is required" });
            }

            const imageUrl = req.file.path;

            const currentProfile = await Profile.findById(profileId);
            if (!currentProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }

            // Cập nhật background thành image
            currentProfile.design.background = {
                ...currentProfile.design.background,
                type: 'image',               
                imageUrl: imageUrl // Lưu backup để dùng lại
            };

            currentProfile.markModified('design');
            await currentProfile.save();

            res.status(200).json({ 
                message: "Background image uploaded successfully", 
                imageUrl: imageUrl,
                profile: currentProfile
            });

        } catch (err) {
            console.error("Upload background error:", err);
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