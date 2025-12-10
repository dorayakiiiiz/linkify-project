import mongoose from "mongoose";
const { Schema } = mongoose;

const AnalyticSchema = new Schema({
    profileId: { 
        type: Schema.Types.ObjectId, 
        ref: "Profile",
        required: true 
    },
    type: {
        type: String,
        enum: ['view', 'link_click', 'shop_click'], // Loại sự kiện
        required: true
    },
    targetId: {
        type: Schema.Types.ObjectId, // ID của Link hoặc Product (nếu là click)
        refPath: 'targetModel'
    },
    targetModel: {
        type: String,
        enum: ['Link', 'Product']
    },
    device: {
        type: String,
        enum: ['mobile', 'desktop', 'tablet', 'unknown'],
        default: 'unknown'
    },
    referrer: {
        type: String, // Nguồn truy cập (Instagram, Facebook...)
        default: 'direct'
    }
}, { timestamps: true });

// Index để query nhanh theo profile và thời gian
AnalyticSchema.index({ profileId: 1, createdAt: -1 });
AnalyticSchema.index({ profileId: 1, type: 1 });

export default mongoose.model('Analytic', AnalyticSchema);