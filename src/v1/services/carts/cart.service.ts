import { DocumentDefinition, Types } from 'mongoose';

import { cart, cartModel } from '../../models/carts/cart.model';
import { userModel } from '../../models/users/user.model';

export const createCart = async (id: string, cart: DocumentDefinition<cart>) => {
   try {
      // check user in database
      const foundUser = await userModel.findById(id);
      if (!foundUser) {
         throw new Error('User in userModel not found');
      }
        // create cart
      const createCart = await cartModel.create(cart);
      await createCart.save();
      return createCart;
   } catch (error) {
      throw error;
   }
};
export const addProductToCart = async (cart: DocumentDefinition<cart>) => {
   try {
      const createCart = await cartModel.create(cart);
      await createCart.save();
      return createCart;
   } catch (error) {
      throw error;
   }
};
