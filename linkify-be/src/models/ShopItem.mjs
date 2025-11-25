import mongoose from "mongoose";
const { Schema } = mongoose;

// Schema for shop products
const ShopItemSchema = new Schema(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    buyLink: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ShopItem", ShopItemSchema);
