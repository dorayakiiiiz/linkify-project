import mongoose from "mongoose"
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { 
        type: String, 
        // Chỉ bắt buộc với google và đăng nhập pass
        required: function() { 
            return this.loginMethod === 'local' || this.loginMethod === 'google';
        }, 
        unique: true 
    },
    displayName: {
        type: String,
        required: true,
    },
    password: { 
        type: String, 
        // Chỉ bắt buộc khi đăng nhập bằng mật khẩu
        required: function() {
            return this.loginMethod === 'local';
        }
                
    },
    googleId: { 
        type: String, 
        unique: true,
    },
    facebookId: { 
        type: String, 
        unique: true,
    },
    role: {
        type: String,
        enum: ['creator', 'admin'],
        default: 'creator',
        required: true
    },
    loginMethod: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local',
        required: true
    },

    isLocked: {
        type: Boolean,
        default: false,
        required: true
    },
    violationCount: {
        type: Number,
        default: 0
    },

}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema);