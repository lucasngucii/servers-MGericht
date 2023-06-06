import mongoose from 'mongoose';

export enum OrderStatus {
   PENDING = 'PENDING',
   CONFIRMED = 'CONFIRMED',
   CANCELLED = 'CANCELLED',
   DELIVERED = 'DELIVERED',
   RETURNED = 'RETURNED',
}

export interface Order extends mongoose.Document {
   userId: string;
   productId: string[];
   total: number;
   paymentMethod: string;
   deliveryAddress: string;
   orderDate: Date;
   status: OrderStatus;
}
export const OrderSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
   total: { type: Number, required: true },
   paymentMethod: { type: String, required: true },
   deliveryAddress: { type: String, required: true },
   orderDate: { type: Date, required: true },
   status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
      required: true,
   },
});

export const OrderModel = mongoose.model<Order>('Order', OrderSchema);
