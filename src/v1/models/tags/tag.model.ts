import mongoose from "mongoose";
import { Product } from "../products/product.model";
export interface tag extends mongoose.Document { 
    name: string
    decripstion?: string
    product_id : Product["_id"];
    // category_id : Category["_id"];

}
export const tagSchema: mongoose.Schema<tag> = new mongoose.Schema({
    name: { type: String, required: true, unique: true, lowercase: true, trim: true },
    decripstion: { type: String, required: true, trim: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "tags",
})
export const tagModel: mongoose.Model<tag> = mongoose.model("tag", tagSchema);