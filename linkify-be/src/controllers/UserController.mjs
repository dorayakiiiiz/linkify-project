import User from "../models/User.mjs";

class UserController {
    // 
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
            res.status(500).json({ message: "Server error" });
        }
    }
}

export default new UserController();