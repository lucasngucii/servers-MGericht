import { Request, Response, NextFunction } from "express";
import { HTTP_INTERNAL_SERVER_ERROR } from "../../constants/http-status/http_status";
import { getErrorMessage } from "../../utils/error/errorMessage";
import * as cartService from "../../services/carts/cart.service";
export const createCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { cart } = req.body;
    const newCart = await cartService.createCart(id, cart);
    res.status(200).json({ newCart });
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: getErrorMessage(error) });
  }
};
