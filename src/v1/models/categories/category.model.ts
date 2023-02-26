import mongoose from "mongoose";

export interface Category extends mongoose.Document {
  name: string;
  description: string;
  active: boolean;
}
export const CategorySchema: mongoose.Schema<Category> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "Category",
  }
);
export const CategoryModel = mongoose.model<Category>("Category", CategorySchema);
