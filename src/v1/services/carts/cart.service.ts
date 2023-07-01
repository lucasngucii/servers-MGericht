import { DocumentDefinition, Types } from 'mongoose';

import { cart, cartModel } from '../../models/carts/cart.model';
import { userModel } from '../../models/users/user.model';
import { getErrorMessage } from '../../utils/error/errorMessage';
import { validateID } from '../../utils/validation/validateID';

export const createCart = async (id: string, cart: DocumentDefinition<cart>) => {
   try {
      // check user in database
      const foundUser = await userModel.findById(id);
      if (!foundUser) {
         throw new Error('User in userModel not found');
      }
      // create cart
      const createCart = await cartModel.create({ ...cart, user: id });
      await createCart.save();
      // update user
      foundUser.cart = createCart._id;
      await foundUser.save();
      return createCart;
   } catch (error) {
      getErrorMessage(error);
   }
};

export const getCartItems = async (id: string) => {
   try {
      const foundUser = await userModel.findById(id).populate('cart');
      if (!foundUser) {
         throw new Error('cart in userModel not found');
      }
      const cart = await cartModel.findById(foundUser.cart);
      if (!cart) {
         throw new Error('cart not found');
      }
      return cart.productList;
   } catch (error) {
      getErrorMessage(error);
   }
};

export const getCountInCart = async (id: string) => {
   try {
      const foundUser = await userModel.findById(id).populate('cart');
      if (!foundUser) {
         throw new Error('cart in userModel not found');
      }
      const cart = await cartModel.findById(foundUser.cart);
      if (!cart) {
         throw new Error('cart not found');
      }
      // count item in cart
      const count = cart.productList.reduce((total, item) => total + item.quantity, 0);
      return count;
   } catch (error) {
      getErrorMessage(error);
   }
};

export const getTotalInCart = async (id: string) => {
   try {
      const foundUser = await userModel.findById(id).populate('cart');
      if (!foundUser) {
         throw new Error('cart in userModel not found');
      }
      const cart = await cartModel.findById(foundUser.cart);
      if (!cart) {
         throw new Error('cart not found');
      }
      // get total in cart
      const total = await cartModel.aggregate([
         { $match: { _id: cart._id } },
         {
            $project: {
               total: {
                  $reduce: {
                     input: '$productList',
                     initialValue: 0,
                     in: {
                        $add: ['$$value', { $multiply: ['$$this.price', '$$this.quantity'] }],
                     },
                  },
               },
            },
         },
      ]);
      return total;
   } catch (error) {
      getErrorMessage(error);
   }
};
export const getWishlist = async (id: string) => {
   try {
      const foundUser = await userModel.findById(id).populate('cart');
      if (!foundUser) {
         throw new Error('cart in userModel not found');
      }
      const cart = await cartModel.findById(foundUser.cart);
      if (!cart) {
         throw new Error('cart not found');
      }
      return cart.productList;
   } catch (error) {
      getErrorMessage(error);
   }
};
export const getProductInCart = async (id: string, productId: string) => {
   try {
      const foundUser = await userModel.findById(id).populate('cart');
      if (!foundUser) {
         throw new Error('cart in userModel not found');
      }
      const cart = await cartModel.findById(foundUser.cart);
      if (!cart) {
         throw new Error('cart not found');
      }
      const product = cart.productList.find((item) => item.productId.toString() === productId);
      if (!product) {
         throw new Error('product not found');
      }
      return product;
   } catch (error) {
      getErrorMessage(error);
   }
};

export const addProductToCart = async (
   id: string,
   productId: string,
   quantity: number,
   price: number
) => {
   try {
      const foundUser = await userModel.findById(id).populate('cart');
      if (!foundUser) {
         throw new Error('cart in userModel not found');
      }
      const cart = await cartModel.findById(foundUser.cart);
      if (!cart) {
         throw new Error('cart not found');
      }
      // check product in cart
      const product = cart.productList.find((item) => item.productId.toString() === productId);
      if (product) {
         product.quantity += quantity;
      }
      const newProduct = { productId: productId, quantity: quantity, price: price };
      // add product to cart
      cart.productList.push({ ...newProduct });
      await cart.save();
      return cart;
   } catch (error) {
      getErrorMessage(error);
   }
};
