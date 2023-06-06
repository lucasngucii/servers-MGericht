import { DocumentDefinition, Types } from 'mongoose';

import { Order, OrderModel } from '../../models/orders/order.model';
import { OrderStatus } from '../../constants/order-status/order_status';
import { PaymentOptions } from '../../constants/order-status/payment_options';

export const createOrder = async (userId: string, order: DocumentDefinition<Order>) => {
   try {
      const createOrder = await OrderModel.create({ ...order, userId: userId });
      await createOrder.save();
      return createOrder;
   } catch (error) {
      throw error;
   }
};
export const getAllOrders = async () => {
   try {
      const orders = await OrderModel.find();
      return orders;
   } catch (error) {
      throw error;
   }
};
export const getOrderById = async (id: string) => {
   try {
      const order = await OrderModel.findById(id);
      return order;
   } catch (error) {
      throw error;
   }
};
export const getOrderByUserId = async (id: string) => {
   try {
      const order = await OrderModel.find({ userId: id });
      return order;
   } catch (error) {
      throw error;
   }
};
export const getOrderByProductId = async (id: string) => {
   try {
      const order = await OrderModel.find({ productId: id });
      return order;
   } catch (error) {
      throw error;
   }
};

export const updateProductsInOrder = async (id: string, product: string[]) => {
   try {
      const updateAllProductInOrder = await OrderModel.findByIdAndUpdate(
         id,
         {
            productId: [product],
         },

         { new: true }
      );
      return updateAllProductInOrder;
   } catch (error) {
      throw error;
   }
};
export const updateAddress = async (id: string, address: string) => {
   try {
      const updateAllAddress = await OrderModel.findByIdAndUpdate(
         id,
         { deliveryAddress: address },
         { new: true }
      );
      return updateAllAddress;
   } catch (error) {
      throw error;
   }
};

export const updatePaymentOptions = async (id: string, paymentMethod: PaymentOptions) => {
   try {
      const updatePayment = await OrderModel.findByIdAndUpdate(
         id,
         { paymentMethod: paymentMethod },
         { new: true }
      );
      return updatePayment;
   } catch (error) {
      throw error;
   }
};

export const updateStatusOrder = async (id: string, status: OrderStatus) => {
   try {
      const updateStatus = await OrderModel.findByIdAndUpdate(
         id,
         { status: status },
         { new: true }
      );
      return updateStatus;
   } catch (error) {
      throw error;
   }
};
export const deleteOrder = async (id: string) => {
   try {
      const deleteOrder = await OrderModel.findByIdAndDelete(id);
      return deleteOrder;
   } catch (error) {
      throw error;
   }
};
export const deleteAllOrder = async () => {
   try {
      const deleteAllOrder = await OrderModel.deleteMany();
      return deleteAllOrder ? 1 : 0;
   } catch (error) {
      throw error;
   }
};
