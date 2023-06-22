import { Request, Response, NextFunction } from 'express';
import { HTTP_SUCCESS } from '../../constants/http-status/http_status';
import { validateID } from '../../utils/validation/validateID';
import * as couponService from '../../services/coupons/coupon.service';

export const createCoupon = (req: Request, res: Response, next: NextFunction) => {
   try {
      const coupon = couponService.createCoupon(req.body);
      res.status(HTTP_SUCCESS).json(coupon);
   } catch (error) {
      console.log(error);
      next(error);
   }
};
