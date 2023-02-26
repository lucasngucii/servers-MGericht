import mongoose from "mongoose";
import { Category, CategorySchema } from "../categories/category.model";
import { Tags } from "../tags/tag.model";
export interface Product extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  active: boolean;
  category: Category;
  image: string;
  tags: Tags[];
}
export const ProductSchema: mongoose.Schema<Product> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, required: true },
    category: { type: CategorySchema, required: true },
    image: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "Product",
  }
);
export const ProductModel = mongoose.model<Product>("Product", ProductSchema);
