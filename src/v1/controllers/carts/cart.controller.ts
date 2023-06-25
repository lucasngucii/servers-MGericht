import { Request, Response, NextFunction } from 'express';
import { HTTP_SUCCESS } from '../../constants/http-status/http_status';
import { validateID } from '../../utils/validation/validateID';
import * as cartService from '../../services/carts/cart.service';

export const createCart = (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const cart = cartService.createCart(id, req.body);
      res.status(HTTP_SUCCESS).json(cart);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const cart = await cartService.addProductToCart(req.body);
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
}