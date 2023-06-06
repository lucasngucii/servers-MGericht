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
    const { id } = req.params
    validateID(id);
   try {
      const order = await orderService.createOrder(id,req.body);
      res.status(HTTP_SUCCESS).json(order);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
