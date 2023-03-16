import { Request, Response, NextFunction } from "express";
import { HTTP_INTERNAL_SERVER_ERROR } from "../../constants/http-status/http_status";
import { getErrorMessage } from "../../utils/error/errorMessage";
import * as cartService from "../../services/carts/cart.service";
export const userCart = async (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const userId = req.user._id;
  const { productId } = req.body;
  try {
      const cart = await cartService.addProductToCart(userId, productId);

  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({message: getErrorMessage(error)});
  }
};
