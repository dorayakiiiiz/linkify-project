
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

    // [GET] auth/google/redirect (hoặc /auth/google/callback)
    async google(req, res, next) {
        try { 
            const userInfo = req.user; 
            console.log(userInfo)
            
            if (!userInfo) {
                console.log('Lỗi không có userInfo')
                // Nếu có lỗi, chuyển hướng về trang đăng nhập của FE
                return res.redirect('http://localhost:5173/auth/login'); 
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
            return res.send(`
                <script>
                    // Tạo đối tượng dữ liệu chứa Token
                    const authData = { 
                        type: 'login_success', 
                        token: '${token}' 
                    };
                    // Gửi đối tượng này về cửa sổ chính
                    const FE_origin = 'http://localhost:5173/auth/login'    
                    window.opener.postMessage(authData, FE_origin);
                    // Đóng cửa sổ Pop-up
                    window.close();
                </script>
            `); 
            
        } catch (err) {
            console.log("Google Auth Callback Error:", err);
            // Chuyển hướng về trang báo lỗi của Front-end
            return res.send(`
                <script>
                    // Tạo đối tượng dữ liệu chứa Token
                    const authData = { 
                        type: 'login_failed', 
                        token: '${token}' 
                    };
                    // Gửi đối tượng này về cửa sổ chính
                    window.opener.postMessage(authData, '*');
                    // Đóng cửa sổ Pop-up
                    window.close();
                </script>
                `)
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
                return res.redirect('http://localhost:5173/auth/login'); 
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
            return res.send(`
                <script>
                    // Tạo đối tượng dữ liệu chứa Token
                    const authData = { 
                        type: 'login_success', 
                        token: '${token}' 
                    };
                    // Gửi đối tượng này về cửa sổ chính
                    const FE_origin = 'http://localhost:5173/auth/login'    
                    window.opener.postMessage(authData, FE_origin);
                    // Đóng cửa sổ Pop-up
                    window.close();
                </script>
            `); 
            
        } catch (err) {
            console.log("Facebook Auth Callback Error:", err);
            // Chuyển hướng về trang báo lỗi của Front-end
            return res.send(`
                <script>
                    // Tạo đối tượng dữ liệu chứa Token
                    const authData = { 
                        type: 'login_failed', 
                        token: '${token}' 
                    };
                    // Gửi đối tượng này về cửa sổ chính
                    window.opener.postMessage(authData, '*');
                    // Đóng cửa sổ Pop-up
                    window.close();
                </script>
                `)
        }
    }

}

export default new AuthController();