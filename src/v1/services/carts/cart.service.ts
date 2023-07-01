import { DocumentDefinition, Types } from 'mongoose';

import { cart, cartModel } from '../../models/carts/cart.model'; 
import { userModel } from '../../models/users/user.model';
import { getErrorMessage } from '../../utils/error/errorMessage';

export const createCart = async (id: string, cart: DocumentDefinition<cart>) => {
   try {
      // check user in database
      const foundUser = await userModel.findById(id);
      if (!foundUser) {
         throw new Error('User in userModel not found');
      }
      // create cart
      const createCart = await cartModel.create({...cart, user: id});
      await createCart.save();
      return createCart;
   } catch (error) {
      getErrorMessage(error);
   }
};

export const getCartItems = async (id: string) => {
   try {
      const cart = await cartModel.findById(id);
      if (!cart) {
         throw new Error('Cart not found');
      }
      return cart.productList;
   } catch (error) {
      getErrorMessage(error);
   }
};

export const getCountInCart = async (id: string) => {
   try {
      const cart = await cartModel.findById(id);
      if (!cart) {
         throw new Error('Cart not found');
      }
      return cart.productList.length;
   } catch (error) {
      getErrorMessage(error);
   }
};
