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
    // socialLinks: {

    // },
    // shopItems: {

    // },
    donateLink: {
        type: String
    },
    // theme: {

    // }
})

export default mongoose.model('Profile', ProfileSchema);