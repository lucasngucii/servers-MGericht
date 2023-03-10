import mongoose from "mongoose";
import { user } from "../users/user.model";
import { Product } from '../products/product.model';
export interface Cart extends mongoose.Document {
    user_id: user['_id'];
    items: Product[];
}
export const CartSchema: mongoose.Schema<Cart> = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "carts",
})
export const CartModel: mongoose.Model<Cart> = mongoose.model<Cart>("Cart", CartSchema);