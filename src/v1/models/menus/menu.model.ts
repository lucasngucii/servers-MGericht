import mongoose from "mongoose";
import { Product, ProductSchema } from "../products/product.model";
import { Category, CategorySchema } from "../categories/category.model";

export interface Menu extends mongoose.Document {
  name: string;
  description: string;
  active: boolean;
  products: Product[];
  category: Category[];
  create_at: Date;
}

export const MenuSchema: mongoose.Schema<Menu> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
    products: { type: [ProductSchema], required: true },
    category: { type: [CategorySchema], required: true },
    create_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "Menu",
  }
);

export const MenuModel: mongoose.Model<Menu> = mongoose.model<Menu>("Menu", MenuSchema);
