import mongoose from "mongoose";
import { Product } from "../products/product.model";

export interface Tags extends mongoose.Document { 
    name: string;
    products: Product[];
    create_at: Date;
}
export const TagsSchema: mongoose.Schema<Tags> = new mongoose.Schema(
    {
        name: { type: String, required: true },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        create_at: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        collection: "Tags",
    }
)
export const TagsModel = mongoose.model<Tags>("Tags", TagsSchema);