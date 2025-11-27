import passport from 'passport'
import {Strategy as FacebookStrategy} from 'passport-facebook'
import User from '../models/User.mjs'

export default passport.use(
    new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: process.env.FB_CALLBACK_URI,
        profileFields: ['id', 'emails', 'name']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // KIỂM TRA ĐẦU VÀO: Lấy email an toàn hoặc gán null
            const userEmail = (profile.emails && profile.emails.length > 0) 
                ? profile.emails[0].value 
                : null; 
                
            if (!userEmail) {
                // Nếu không có email, Facebook đã từ chối quyền hoặc lỗi config.
                // Báo lỗi cho người dùng để họ biết phải cấp quyền.
                return done(new Error("Email là bắt buộc và không được cấp quyền bởi Facebook."), null);
            }
            const facebookId = profile.id;

            // TÌM người dùng hiện có bằng facebook ID HOẶC Email
            let user = await User.findOne({ 
                $or: [{ facebookId: facebookId }, { email: userEmail }] 
            });

            if (user) {
                //[ĐĂNG NHẬP]
                // Nếu trước đó người dùng đăng nhập local, thực hiện liên kết với facebook để có thể
                //thực hiện đăng nhập cả trên facebook và local (password)
                if (!user.facebookId) {
                    console.log(`Người dùng đã tồn tại: Liên kết tài khoản facebook cho email ${userEmail}`);
                    user.facebookId = facebookId
                    await user.save();
                }
                return done(null, user)
            }
            //Nếu người dùng mới thì lưu vào DB [ĐĂNG KÝ]
            else {
                console.log(`Người dùng mới: Tạo bản ghi cho email ${userEmail}`)
                const newUser = new User ({
                    // Không cần pass
                    email: userEmail,
                    displayName: profile.displayName,
                    facebookId: facebookId,
                    loginMethod: 'facebook',
                    role: 'creator', 
                    isLocked: false,
                })
                await newUser.save()
                return done(null, newUser)
            }
        }
        catch(err) {
            console.log("Lỗi trong Facebook Strategy:", err);
            return done(err, null);
        }
    })
)
