import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import User from '../models/User.mjs'

// file: facebook-strategy.mjs
export default passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: process.env.FB_CALLBACK_URI,
      profileFields: ['id', 'displayName', 'name'] 
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const facebookId = profile.id

            // Lấy tên hiển thị (đảm bảo luôn có)
            const displayName =
                profile.displayName ||
                profile._json?.name ||
                `${profile._json?.first_name || ''} ${profile._json?.last_name || ''}`.trim()

            console.log('DisplayName:', displayName)

            // 1. Tìm user theo facebookId
            let user = await User.findOne({ facebookId })

            if (user) {
                console.log(`Người dùng Facebook đã tồn tại: ${displayName}`)
                return done(null, user)
            }

            // 2. Nếu user mới, tạo user mới, tạo 1 email mẫu
            const defaultEmail = `fb-${facebookId}@linkify.com`

            console.log(`Tạo người dùng mới với Facebook ID ${facebookId}`)

            const newUser = new User({
                email: defaultEmail,
                displayName,
                facebookId,
                loginMethod: 'facebook',
                role: 'creator',
                isLocked: false
            })
            await newUser.save()
            return done(null, newUser)
        } 
        catch (err) {
            console.log("Lỗi trong Facebook Strategy:", err)
            return done(err, null)
        }
    }
  )
)
