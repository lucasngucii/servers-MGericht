import mongoose from "mongoose";
import { Order, OrderSchema } from "../orders/order.model";
import { User } from "../users/user.model";
export interface Payment extends mongoose.Document {
  user_id: User["_id"];
  order_id: Order["_id"];
  amount: number;
  currency: string;
  status: string;
  method: Order["payment_method"];
  create_at: Date;
  update_at: Date;
}
export const PaymentSchema: mongoose.Schema<Payment> = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, enum: ["USD", "EUR", "VND"] },
  status: { type: String, required: true, enum: ["pending", "success", "failed"] },
  method: { type: String, required: true },  // no logic fix late
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});
export const PaymentModel = mongoose.model<Payment>("Payment", PaymentSchema);
