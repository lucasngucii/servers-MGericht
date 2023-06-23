import { Request, Response, NextFunction } from 'express';
import { HTTP_SUCCESS } from '../../constants/http-status/http_status';
import { validateID } from '../../utils/validation/validateID';
import * as couponService from '../../services/coupons/coupon.service';

export const createCoupon = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   validateID(id);

   try {
      const coupon = await couponService.createCoupon(id, req.body);
      console.log(coupon);
      res.status(HTTP_SUCCESS).json(coupon);
   } catch (error) {
      console.log(error);
      next(error);
   }
};

export const getCoupons = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const coupons = await couponService.getCoupons();
      res.status(HTTP_SUCCESS).json(coupons);
   } catch (error) {
      console.log(error);
      next(error);
   }
};
export const getCouponById = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const coupons = await couponService.getCouponById(id);
      res.status(HTTP_SUCCESS).json(coupons);
   } catch (error) {
      console.log(error);
      next(error);
   }
};
export const validateCoupon = async (req: Request, res: Response, next: NextFunction) => {
   const { couponId } = req.params;
   validateID(couponId);
   try {
      const coupon = await couponService.validateCoupon(couponId);
      res.status(HTTP_SUCCESS).json(coupon);
   } catch (error) {
      console.log(error);
      next(error);
   }
};
export const updateCoupon = async (req: Request, res: Response, next: NextFunction) => {
   const { userId } = req.user;
   validateID(userId);

   const { couponId } = req.params;
   validateID(couponId);
   try {
      const coupon = await couponService.updateCoupon(userId, couponId, req.body);
      next(coupon);
      res.status(HTTP_SUCCESS).json(coupon);
   } catch (error) {
      console.log(error);
      next(error);
   }
};
export const deleteCoupon = async (req: Request, res: Response, next: NextFunction) => {
   const { couponId } = req.params;
   validateID(couponId);
   try {
      const coupon = await couponService.deleteCoupon(couponId);
   } catch (error) {
      console.log(error);
      next(error);
   }
};
