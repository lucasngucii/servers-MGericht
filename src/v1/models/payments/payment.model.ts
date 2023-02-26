import mongoose from "mongoose";
import { Product } from "../products/product.model";
import { Order } from "../orders/order.model";
import { User } from "../users/user.model";
export interface Checkout extends mongoose.Document { 
    user_id: User;
}
