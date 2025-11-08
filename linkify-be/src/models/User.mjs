import mongoose from "mongoose"
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    displayName: {
        type: String
    },
    password: { 
        type: String, 
        required: true 
    },
    googleId: { 
        type: String, 
    },
    facebookId: { 
        type: String, 
    },
    role: {
        type: String,
        enum: ['creator', 'admin'],
        default: 'creator',
        required: true
    },
    isLocked: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema);