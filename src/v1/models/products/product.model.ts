import mongoose from "mongoose";
import { user } from "../users/user.model";
import { tag } from "../tags/tag.model";

export interface rating extends mongoose.Document {
  userId: user["_id"];
  rate: number;
  comment: string;
}
export const ratingSchema: mongoose.Schema<rating> = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  rate: { type: Number, default: 0 },
  comment: { type: String, default: "" },
});
export interface Product extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  tags: tag[];
  ratings: rating[];
}
export const ProductSchema: mongoose.Schema<Product> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag", required: true }],
    ratings: [{ type: ratingSchema, default: { rate: 0, comment: "" } }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "products",
  }
);

export const productModel: mongoose.Model<Product> = mongoose.model("Product", ProductSchema);
