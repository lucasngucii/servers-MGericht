import mongoose from 'mongoose';
import { OrderStatus } from '../../constants/order-status/order_status';
import { PaymentOptions } from '../../constants/order-status/payment_options';

export interface Order extends mongoose.Document {
   userId: string;
   productId: string[];
   total: number;
   paymentMethod: PaymentOptions;
   deliveryAddress: string;
   orderDate: Date;
   status: OrderStatus;
}
export const OrderSchema = new mongoose.Schema(
   {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      total: { type: Number, required: true },
      deliveryAddress: { type: String, required: true },
      paymentMethod: {
         type: String,
         required: true,
         enum: Object.values(PaymentOptions),
         default: PaymentOptions.CASH,
      },
      orderDate: { type: Date, required: true, default: Date.now() },
      status: {
         type: String,
         enum: Object.values(OrderStatus),
         default: OrderStatus.NEW,
         required: true,
      },
   },
   {
      timestamps: true,
      collection: 'Order',
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

export const OrderModel = mongoose.model<Order>('Order', OrderSchema);
