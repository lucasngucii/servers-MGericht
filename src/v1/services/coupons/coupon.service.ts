import { DocumentDefinition } from 'mongoose';
import { Coupon, couponModel } from '../../models/coupons/coupon.model';
import { getErrorMessage } from '../../utils/error/errorMessage';
import { userModel } from '../../models/users/user.model';
export const createCoupon = async (id: string, coupons: DocumentDefinition<Coupon>) => {
   try {
      // check user
      const foundUser = await userModel.findById(id);
      if (!foundUser) {
         throw new Error('User not found');
      }
      // check role create coupon
      if (foundUser?.role !== 'Admin') {
         throw new Error('You are not authorized to create a coupon');
      }
      // create coupon
      const coupon = await couponModel.create({ userId: id, ...coupons });
   } catch (error) {
      getErrorMessage(error);
   }
};
