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
      if (foundUser.role !== 'Admin') {
         throw new Error('You are not authorized to create a coupon');
      }
      // create coupon
      const coupon = await couponModel.create({ ...coupons, userId: id });
      await coupon.save();
      return coupon;
   } catch (error) {
      getErrorMessage(error);
   }
};
export const getCoupons = async () => {
   try {
      const coupon = await couponModel.find().select('name expiry').sort({ createdAt: 1 }).lean();
      return coupon;
   } catch (error) {
      getErrorMessage(error);
   }
};
export const getCouponById = async (id: string) => {
   try {
      const coupon = await couponModel
         .findById(id)
         .select('code expiry')
         .sort({ createdAt: 1 })
         .lean();
      return coupon;
   } catch (error) {
      getErrorMessage(error);
   }
};
export const validateCoupon = async (couponId: string) => {
   try {
      const coupon = await couponModel.findById(couponId).select('validateCouponStatus').lean();
      if (!coupon) {
         throw new Error('Invalid coupon');
      }
      // check validateCouponStatus
      if (coupon.validateCouponStatus != true) {
         throw new Error('Coupon has been used');
      }
      return coupon;
   } catch (error) {
      getErrorMessage(error);
   }
};
export const updateCoupon = async (
   userId: string,
   couponId: string,
   coupon: DocumentDefinition<Coupon>
) => {
   try {
      const coupons = await couponModel.findOneAndUpdate(
         { _id: couponId },
         { ...coupon, userId: userId },
         { new: true }
      );
      return coupons;
   } catch (error) {
      getErrorMessage(error);
   }
};
export const deleteCoupon = async (couponId: string) => {
   try {
      const coupon = await couponModel.findByIdAndDelete(couponId);
      return coupon;
   } catch (error) {
      getErrorMessage(error);
   }
};

export const checkCoupon = async (couponId: string) => {
   try {
      const foundCoupon = await getCouponById(couponId);
      console.log(foundCoupon)
      if (!foundCoupon) {
         throw new Error('Coupon not found');
      }
      // check validateCouponStatus
      if (foundCoupon.validateCouponStatus != false) {
         throw new Error('Coupon has been used because it not valid');
      }
      // check count using of the coupon
      if (foundCoupon.countUsings >= foundCoupon.countOrderMax ) {
         throw new Error('Coupon has been used because it has');
      }
      return foundCoupon;
   } catch (error) {
      getErrorMessage(error);
   }
}
