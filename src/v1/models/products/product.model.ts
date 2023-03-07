import mongoose from "mongoose";

export interface Product extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  image: string;
    category: string;
    tags: string[];
}
export const ProductSchema: mongoose.Schema<Product> = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "products",
});

export const productModel: mongoose.Model<Product> = mongoose.model("Product", ProductSchema);