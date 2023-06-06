import { DocumentDefinition, Types } from 'mongoose';

import { Order, OrderModel } from '../../models/orders/order.model';

export const createOrder = async (userId: string, order: DocumentDefinition<Order>) => {
   try {
      const createOrder = await OrderModel.create({ ...order, userId: userId });
      await createOrder.save();
      return createOrder;
   } catch (error) {
      throw error;
   }
};
