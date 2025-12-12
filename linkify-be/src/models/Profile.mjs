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

    // khóa/hiển thị profile ra public
    isActive: {
        type: Boolean,
        default: true
    },
    
    design: {
        themeId: { type: String, default: 'custom' },

        background: {
            type: { type: String, enum: ['flat', 'gradient', 'image'], default: 'flat' }, // flat là màu đơn
            value: { type: String, default: '#ffffff' }, // Màu hoặc URL ảnh
            direction: { type: String, default: 'to bottom' } // Cho gradient
        },

        header: {
            color: { type: String, default: '#000000' }, // Màu chữ username/bio
            font: { type: String, default: 'Inter' },
            sizeUsername: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
            sizeBio: { type: String, enum: ['small', 'medium', 'large'], default: 'small' },
            // 2 cái size này ko biết nên tách riêng hay gộp chung á
        },

        buttons: {
            shape: { type: String, enum: ['sharp', 'rounded', 'pill'], default: 'rounded' },
            style: { type: String, enum: ['fill', 'outline', 'hard-shadow', 'soft-shadow'], default: 'fill' },
            color: { type: String, default: '#000000' }, // Màu nền nút
            textColor: { type: String, default: '#ffffff' }, // Màu chữ nút
            shadowColor: { type: String, default: '#000000' } // Màu viền/bóng
        },

        text: {
            color: { type: String, default: '#000000' }, // Màu chữ toàn cục (trừ header/button)
            font: { type: String, default: 'Inter' },
            size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' } // size chung cho cả button
        }

    }
}, { timestamps: true });

export default mongoose.model('Profile', ProfileSchema);