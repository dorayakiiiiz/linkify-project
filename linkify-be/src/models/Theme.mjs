import mongoose from "mongoose"
const { Schema } = mongoose;

const ThemeSchema = new Schema({
    name: { 
        type: String,
    },
    styleObject: { 
        type: Schema.Types.ObjectId
    },
    isPublic: { 
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Theme', ThemeSchema);