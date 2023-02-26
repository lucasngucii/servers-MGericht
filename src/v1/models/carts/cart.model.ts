import mongoose from "mongoose";
import { Product, ProductSchema } from "../products/product.model";
import { User } from "../users/user.model";

export interface Cart extends mongoose.Document {
  user: User["_id"];
  items: Product[];
  create_at: Date;
  update_at: Date;
}

export const CartSchema: mongoose.Schema<Cart> = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    items: { type: [ProductSchema], required: true, default: [] },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: "Cart",
  }
);

export const CartModel: mongoose.Model<Cart> = mongoose.model<Cart>("Cart", CartSchema);
