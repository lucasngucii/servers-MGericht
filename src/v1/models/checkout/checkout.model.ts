import mongoose from "mongoose";
import { User } from "../users/user.model";
import { Product, ProductSchema } from "../products/product.model";
import { Payment } from "../payments/payment.model";
import { Order } from "../orders/order.model";
export interface Checkout extends mongoose.Document {
  user_id: User["_id"];
  items: Product[];
  shipping_address: string;
  billing_address: string;
  payment_method: Order["payment_method"];
  payment_status: Payment["status"];
  order_status: Order["status"];
  order_total: number;
  create_at: Date;
}
export const CheckoutSchema: mongoose.Schema<Checkout> = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  shipping_address: { type: String, required: true },
  billing_address: { type: String, required: true },
  payment_status: { type: mongoose.Schema.Types.String, ref: "Payment", required: true },
  payment_method: { type: mongoose.Schema.Types.String, ref: "Order", required: true },
  order_total: { type: Number, required: true },
  create_at: { type: Date, default: Date.now },
});

export const CheckoutModel = mongoose.model<Checkout>("Checkout", CheckoutSchema);
