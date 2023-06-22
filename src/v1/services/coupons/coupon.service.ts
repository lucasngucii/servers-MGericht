import { DocumentDefinition } from 'mongoose';
import { Coupon, couponModel } from '../../models/coupons/coupon.model';
import { getErrorMessage } from '../../utils/error/errorMessage';
export const createCoupon = async (coupons: DocumentDefinition<Coupon>) => {
   try {
   } catch (error) {
      getErrorMessage(error);
   }
};
