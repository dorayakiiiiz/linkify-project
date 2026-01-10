import mongoose from "mongoose"
const { Schema } = mongoose;

const LinkSchema = new Schema({
    profileId: { 
        type: Schema.Types.ObjectId, 
        ref: "Profile",
    },
    title: { 
        type: String
    },
    url: { 
        type: String
    },
    order: {
        type: Number
    },
    isEnable: {
        type: Boolean,
        default: true,
    },
    scheduledEnable: {
        type: Date,
        default: null,
    },
    scheduledDisable: {
        type: Date,
        default: null,
    },


    clickCount: {
        type: Number,
        default: 0,
    },

    isFlagged: {
        type: Boolean,
        default: false,
    },
    violationReason: {
        type: String,
        default: null,
    },
    violationConfidence: {
        type: Number,
        default: 0
    },
    adminDecision: {
        type: String,
        enum: [null, 'safe', 'banned'],
        default: null
    },

    deletedBy: {
            type: String,
            enum: [null, 'creator', 'admin'],
            default: null
    },
    deletedAt: {
        type: Date,
        default: null
    }
    
}, { timestamps: true })



export default mongoose.model('Link', LinkSchema);