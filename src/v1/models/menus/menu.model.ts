import mongoose from "mongoose";
import { Product } from "../products/product.model";

export interface menu extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  item: Product[];
  image: string;
}
export const MenuSchema: mongoose.Schema<menu> = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number },
  description: { type: String, required: true },
  item: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
  image: { type: String },
});

export const MenuModel: mongoose.Model<menu> = mongoose.model("Menu", MenuSchema);
