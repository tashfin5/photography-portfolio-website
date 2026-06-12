import mongoose, { Document, Model } from "mongoose";
import "./Category"; // Ensure Category schema is registered

export interface IPhoto extends Document {
  title: string;
  imageUrl: string;
  publicId: string; // Cloudinary public ID for deletion
  category: mongoose.Types.ObjectId;
  order: number;
  isFeatured: boolean;
  createdAt: Date;
}

const PhotoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent mongoose from using the cached model which lacks the new isFeatured field during hot-reload
if (mongoose.models.Photo) {
  delete mongoose.models.Photo;
}
export const Photo: Model<IPhoto> = mongoose.model<IPhoto>("Photo", PhotoSchema);
