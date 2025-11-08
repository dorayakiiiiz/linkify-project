import mongoose from "mongoose"
const { Schema } = mongoose;

// lưu các sự kiện như click... của 1 profile
const AnalyticSchema = new Schema({
    profileId: { 
        type: Schema.Types.ObjectId,
    },
    linkId: { 
        type: Schema.Types.ObjectId,
        ref: "Link",
        default: null
    },
    type: { 
        type: String,
        enum: ['profileView', 'linkClick']
    },
    ipHash: {
        type: String
    },
    userAgent: {
        type: String
    }
}, {
    timestamps: true
})

export default mongoose.model('Analytic', AnalyticSchema);