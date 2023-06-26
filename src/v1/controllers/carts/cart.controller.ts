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
// test
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
// test
export const getCountInCart = async (req: Request, res: Response, next: NextFunction) => {
   const {id} = req.params
   validateID(id);
   try {
      const countCart = await cartService.getCountInCart(id);
      res.status(HTTP_SUCCESS).json(countCart);
   } catch (error) {
      console.error(error);
      next(error);
   }
}
// test
export const getItemInCart = async (req: Request, res: Response, next: NextFunction) => {
   const {id}= req.params
   validateID(id);
   try {
      const cart = await cartService.getItemInCart(id);
   } catch (error) {
      console.error(error);
      next(error);
   }
}
