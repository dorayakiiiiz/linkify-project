import mongoose from "mongoose"
const { Schema } = mongoose;

const ProfileSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true, 
    },
    username: { 
        type: String,
        unique: true, 
        required: true 
    },
    avatarUrl: { 
        type: String, 
    },
    bio: { 
        type: String, 
    },
    donation: {
        isEnabled: { type: Boolean, default: false },
        url: { type: String, default: '' },
        text: { type: String, default: 'Support Me' } // Text hiển thị trên nút
    },
    footerEnable: {
        type: Boolean, 
        default: true 
    },

    // khóa/hiển thị profile ra public
    isActive: {
        type: Boolean,
        default: true
    },
    
    design: {
        themeId: { type: String, default: 'custom' },

        background: {
            type: { type: String, enum: ['fill', 'gradient', 'blur', 'image'], default: 'fill' }, 
            value: { type: String, default: '#ccc' }, // màu nền hoặc URL ảnh
            imageUrl: { type: String }, // Chỉ lưu màu
            toColor: { type: String, default: '#ffffff' }, // màu đích cho gradient và blue
            direction: { type: String, default: 'to bottom' } 
        },

        header: {
            color: { type: String, default: '#000000' }, 
            font: { type: String, default: 'Inter' },
            sizeUsername: { type: String, enum: ['small', 'large'], default: 'small' },
        },

        buttons: {
            shape: { type: String, enum: ['square', 'medium', 'round'], default: 'medium' },
            style: { type: String, enum: ['solid', 'glass', 'outline'], default: 'solid' },
            color: { type: String, default: '#000000' }, 
            textColor: { type: String, default: '#ffffff' }, 
            shadowColor: { type: String, default: '#000000' } ,
            shadowStyle: { type: String, enum: ['none', 'subtle', 'strong', 'hard'], default: 'subtle' }
        },

        text: { 
            color: { type: String, default: '#000000' }, 
            font: { type: String, default: 'Inter' },
            size: { type: String, enum: ['small', 'large'], default: 'small' } 
        },

        donationButton: {
            useGlobal: { type: Boolean, default: true }, // if true -> use design.buttons
            shape: { type: String, enum: ['square','medium','round'], default: 'medium' },
            style: { type: String, enum: ['solid','glass','outline'], default: 'solid' },
            color: { type: String, default: '#ff4081' },
            textColor: { type: String, default: '#ffffff' },
            icon: { type: String, default: 'fa-solid fa-heart' },
            size: { type: String, enum: ['small','medium','large'], default: 'medium' }
        },

        footer: {
            backgroundColor: { type: String, default: '#ffffff' },
            textColor: { type: String, default: '#6b7280' },
        }

    }
}, { timestamps: true });



export default mongoose.model('Profile', ProfileSchema);