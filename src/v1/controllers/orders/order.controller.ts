import e, { Request, Response, NextFunction } from 'express';
import {
   HTTP_INTERNAL_SERVER_ERROR,
   HTTP_SUCCESS,
   HTTP_FORBIDDEN,
} from '../../constants/http-status/http_status';
import { getErrorMessage } from '../../utils/error/errorMessage';
import { validateID } from '../../utils/validation/validateID';
import { generateToken } from '../../middlewares/jwt/jwtToken';
import * as orderService from '../../services/orders/order.service';
// create order
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const order = await orderService.createOrder(id, req.body);
      res.status(HTTP_SUCCESS).json(order);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const orders = await orderService.getAllOrders();
      res.status(HTTP_SUCCESS).json(orders);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.body;
   validateID(id);
   try {
      const foundOrder = await orderService.getOrderById(id);
      res.status(HTTP_SUCCESS).json(foundOrder);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const getOrderByUserId = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const foundOrder = await orderService.getOrderByUserId(id);
      res.status(HTTP_SUCCESS).json(foundOrder);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const getOrderByProductId = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.body;
   validateID(id);
   try {
      const order = await orderService.getOrderByProductId(id);
      res.status(HTTP_SUCCESS).json(order);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const updateProductsInOrder = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   const [product] = req.body;
   try {
      const order = await orderService.updateProductsInOrder(id, product);
      res.status(HTTP_SUCCESS).json(order);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   const { address } = req.body;
   try {
      const order = await orderService.updateAddress(id, address);
      res.status(HTTP_SUCCESS).json(order);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const updatePaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   const { paymentMethod } = req.body;
   try {
      const order = await orderService.updatePaymentOptions(id, paymentMethod);
      res.status(HTTP_SUCCESS).json(order);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const updateStatusOrder = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   const { status } = req.body;
   try {
      const order = await orderService.updateStatusOrder(id, status);
      res.status(HTTP_SUCCESS).json(order);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const order = await orderService.deleteOrder(id);
      res.status(HTTP_SUCCESS).json(order);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const deleteAllOrder = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const order = await orderService.deleteAllOrder();
      res.status(HTTP_SUCCESS).json(order);
   } catch (error) {
      console.error(error);
      next(error);
   }
};


