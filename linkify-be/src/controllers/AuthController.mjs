
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import User from "../models/User.mjs";


const saltRounds = 10;

class AuthController {
    // [POST] /auth/register
    async register(req, res, next) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            if (user) 
                return res.status(400).json({ message: 'Username existed.'});

            const hassPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await User.create({
                username,
                password: hassPassword
            });

            res.json({ messgae: 'Register successfully!', userId: newUser._id });
            
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [POST] /auth/login
    async login(req, res, next) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username: username });
            if (!user)
                return res.status(404).json({ message: 'Username does not exist.'});

            const match = await bcrypt.compare(password, user.password);
            if (!match) 
                return res.status(400).json({ message: 'Incorrect password.' });

            const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.json({
                message: 'Login successfully!',
                token, 
                user: { id: user._id, name: user.name }
            });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}

export default new AuthController();