
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import User from "../models/User.mjs";
import Profile from '../models/Profile.mjs';


const saltRounds = 10;

const generateAuthScript = (type, data) => {
    const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';

    return `
        <script>
            const authData = { 
                type: '${type}', 
                payload: ${JSON.stringify(data)} 
            };
            window.opener.postMessage(authData, '${clientURL}'); 
            window.close();
        </script>
    `;
};

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
                token
            });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // [GET] auth/google/redirect (hoặc /auth/google/callback)
    async google(req, res, next) {
        try { 
            const userInfo = req.user; 
            console.log(userInfo)
            
            if (!userInfo) {
                console.log('Lỗi không có userInfo')
                // Nếu có lỗi, chuyển hướng về trang đăng nhập của FE
                return res.send(generateAuthScript('login_failed', { message: 'User info not found' }));
            }

            // 2. Tạo JWT (dùng ID hoặc _id của Mongoose)
            const token = jwt.sign(
                { id: userInfo._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            // 3. Đặt JWT vào HTTP-only Cookie

            // res.cookie('jwt', token, {
            //     httpOnly: true, // Rất quan trọng: không thể truy cập từ JavaScript client-side
            //     secure: process.env.NODE_ENV === 'production', // Dùng HTTPS trong production
            //     maxAge: 7 * 24 * 60 * 60 * 1000 // Hết hạn sau 7 ngày
            // });

            console.log('[THÀNH CÔNG!!!]')
            return res.send(generateAuthScript('login_success', { token })); 
            
        } catch (err) {
            console.log("Google Auth Callback Error:", err);
            // Chuyển hướng về trang báo lỗi của Front-end
            return res.send(generateAuthScript('login_failed', { message: 'Authentication failed' }));
        }
    }

    // [GET] auth/fb/redirect 
    async facebook(req, res, next) {
        try { 
            const userInfo = req.user; 
            console.log(userInfo)
            
            if (!userInfo) {
                console.log('Lỗi không có userInfo')
                // Nếu có lỗi, chuyển hướng về trang đăng nhập của FE
                return res.send(generateAuthScript('login_failed', { message: 'User info not found' }));
            }

            // 2. Tạo JWT (dùng ID hoặc _id của Mongoose)
            const token = jwt.sign(
                { id: userInfo._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            // 3. Đặt JWT vào HTTP-only Cookie

            // res.cookie('jwt', token, {
            //     httpOnly: true, // Rất quan trọng: không thể truy cập từ JavaScript client-side
            //     secure: process.env.NODE_ENV === 'production', // Dùng HTTPS trong production
            //     maxAge: 7 * 24 * 60 * 60 * 1000 // Hết hạn sau 7 ngày
            // });

            console.log('[THÀNH CÔNG!!!]')
            return send(generateAuthScript('login_success', { token })); 
            
        } catch (err) {
            console.log("Facebook Auth Callback Error:", err);
            // Chuyển hướng về trang báo lỗi của Front-end
            return res.send(generateAuthScript('login_failed', { message: 'Authentication failed' }));
        }
    }

}

export default new AuthController();