import mongoose from "mongoose"
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    email: { 
        type: String
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['new', 'read', 'resolved'],
        default: 'new'
    },
    createdAt: {
        type: Date
    }
})

export default mongoose.model('Feedback', FeedbackSchema);