
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import User from "../models/User.mjs";
import Profile from '../models/Profile.mjs';


const saltRounds = 10;

class AuthController {
    // [POST] /auth/register
    // TODO: xử lí validate data ng dùng gửi lên
    async register(req, res, next) {
        try {

            const { email, displayName, password } = req.body;

            const user = await User.findOne({ email });
            if (user) 
                return res.status(400).json({ message: 'User existed.'});

            const hashPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await User.create({
                email,
                displayName,
                password: hashPassword
            });

            res.json({ message: 'Register successfully!', userId: newUser._id });
            
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [POST] /auth/login
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user)
                return res.status(404).json({ message: 'Email does not exist.'});

            if (user.isLocked)
                return res.status(403).json({ message: 'Your account has been locked due to violation.'})

            const match = await bcrypt.compare(password, user.password);
            if (!match) 
                return res.status(400).json({ message: 'Incorrect password.' });

            const token = jwt.sign(
                { 
                    id: user._id
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.json({
                message: 'Login successfully!',
                token, 
                // user: { 
                //     id: user._id, 
                //     email: user.email,
                //     role: user.role 
                // }
                // này chắc ko cần thiết
            });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}

export default new AuthController();