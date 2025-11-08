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
    }
    
})

export default mongoose.model('Link', LinkSchema);