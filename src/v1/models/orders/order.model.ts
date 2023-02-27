import mongoose from "mongoose";
import { User } from "../users/user.model";
import { Product, ProductSchema } from "../products/product.model";
import { Payment } from "../payments/payment.model";
export interface Order extends mongoose.Document {
  user_id: User["_id"];
  product_list: Product[];
  total_amount: number;
  payment_method: string;
  delivery_address: string;
  order_date: Date;
  status: string[];
}
export const OrderSchema: mongoose.Schema<Order> = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product_list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
  total_amount: { type: Number, required: true },
  payment_method: { type: String, required: true, enum: ["credit_card", "cash_on_delivery", "paypal"] },
  delivery_address: { type: String, required: true },
  order_date: { type: Date, default: Date.now },
  status: { type: [String], required: true, enum: ["pending", "success", "failed"] },
});
export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
