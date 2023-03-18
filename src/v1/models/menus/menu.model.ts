import mongoose from "mongoose";
import { Product } from "../products/product.model";

export interface Menu extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  item: Product[];
  image: string;
}
export const MenuSchema: mongoose.Schema<Menu> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
  description: { type: String, required: true },
  item: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  image: { type: String },
});

export const MenuModel: mongoose.Model<Menu> = mongoose.model("Menu", MenuSchema);
