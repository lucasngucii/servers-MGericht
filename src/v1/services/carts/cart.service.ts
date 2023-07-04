import { DocumentDefinition, Types } from 'mongoose';

import { cart, cartModel } from '../../models/carts/cart.model';
import { userModel } from '../../models/users/user.model';
import { getErrorMessage } from '../../utils/error/errorMessage';
import { validateID } from '../../utils/validation/validateID';
import { couponModel } from '../../models/coupons/coupon.model';

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
         await cart.save();
         return cart;
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
export const addCouponToCart = async (id: string, code: string) => {
   try {
      const foundUser = await userModel.findById(id).populate('cart');
      if (!foundUser) {
         throw new Error('cart in userModel not found');
      }
      const cart = await cartModel.findById(foundUser.cart);
      if (!cart) {
         throw new Error('cart not found');
      }
      // check coupon in database
      const coupon = await couponModel.findOne({ code: code }).lean();
      if (!coupon) {
         throw new Error('coupon not found');
      }
      // check if the coupon has expired
      if (coupon.expiry < new Date()) {
         throw new Error('coupon has expired');
      }
      // check if the coupon has been used
      if (coupon.validateCouponStatus === true ) {
         throw new Error('coupon has been used');
      }
      // add coupon
      cart.discount?.push({ code: coupon.code });
      await cart.save();
      // update the coupon
      coupon.validateCouponStatus = true;
      //await coupon.save();
      return cart;
   } catch (error) {
      getErrorMessage(error);
   }
};
export const checkOut = async (id: string) => {};
