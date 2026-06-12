import mongoose, { Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  order: number;
  createdAt: Date;
}

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
