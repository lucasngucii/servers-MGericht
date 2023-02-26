import mongoose from "mongoose";
import { User } from '../users/user.model';
import { Product } from '../products/product.model';
import { Payment } from '../payments/payment.model';
import { Order } from '../orders/order.model';
export interface Checkout extends mongoose.Document { 
    user_id: User['_id'];
    items: Product[];
    shipping_address: string;
    billing_address: string;
    payment_method: Payment['method'];
    payment_status: Payment['status'];
    /* order_status: Order['status']; */
    
}