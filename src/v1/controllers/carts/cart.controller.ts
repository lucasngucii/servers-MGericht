import { Request, Response, NextFunction } from 'express';
import { HTTP_SUCCESS } from '../../constants/http-status/http_status';
import { validateID } from '../../utils/validation/validateID';
import * as cartService from '../../services/carts/cart.service';

export const createCart = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);
   try {
      const cart = await cartService.createCart(id, req.body);
      res.status(HTTP_SUCCESS).json(cart);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const getCartItems = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);
   try {
      const cartItems = await cartService.getCartItems(id);
      res.status(HTTP_SUCCESS).json(cartItems);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
// test
export const getCountInCart = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);
   try {
      const countCart = await cartService.getCountInCart(id);
      res.status(HTTP_SUCCESS).json(countCart);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const getTotalInCart = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);
   try {
      const countCart = await cartService.getTotalInCart(id);
      res.status(HTTP_SUCCESS).json(countCart);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);
   try {
      const cart = await cartService.getWishlist(id);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);
   const { productId } = req.params;
   try {
      const cart = await cartService.getProductInCart(id, productId);
      res.status(HTTP_SUCCESS).json(cart);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);
   const { productId, quantity, price } = req.body;
   try {
      const cart = await cartService.addProductToCart(id, productId, quantity, price);
      res.status(HTTP_SUCCESS).json(cart);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const updateProductInCart = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);
   console.log(id);
   try {
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const checkOut = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);
   try {
      const checkout = await cartService.checkOut(id);
      res.status(HTTP_SUCCESS).json(checkout);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const addCouponToCart = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);
   const { code } = req.body;
   try {
      const addCoupon = await cartService.addCouponToCart(id, code);
      res.status(HTTP_SUCCESS).json(addCoupon);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
