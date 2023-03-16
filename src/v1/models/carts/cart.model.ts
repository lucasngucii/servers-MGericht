import mongoose from "mongoose";
import { user } from "../users/user.model";
import { Product } from "../products/product.model";
export interface cartItem extends mongoose.Document {
  product_id: Product["_id"];
  quantity: number;
  price: number;
}
export const cartItemSchema: mongoose.Schema<cartItem> = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});
export const cartItemModel: mongoose.Model<cartItem> = mongoose.model<cartItem>("cartItem", cartItemSchema);

export interface Cart extends mongoose.Document {
  user_id: user["_id"];
  items: cartItem["_id"][];

}
export const CartSchema: mongoose.Schema<Cart> = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: [{ type: cartItemSchema, required: true }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "carts",
  }
);
export const CartModel: mongoose.Model<Cart> = mongoose.model<Cart>("Cart", CartSchema);
