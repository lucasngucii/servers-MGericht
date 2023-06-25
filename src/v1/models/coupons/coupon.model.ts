import mongoose, { Schema, Model, ObjectId } from 'mongoose';

export interface Coupon {
   userId: ObjectId;
   code: string;
   expiry: Date;
   discount: number;
   description?: string;
   validateCouponStatus?: boolean;
}

export const couponSchema: Schema<Coupon> = new mongoose.Schema(
   {
      userId: { type: mongoose.Types.ObjectId, ref: 'User' },
      code: {
         type: String,
         trim: true,
         unique: true,
         uppercase: true,
      },
      expiry: { type: Date, required: true, default: Date.now() },
      discount: { type: Number, required: true },
      description: { type: String, trim: true },
      validateCouponStatus: { type: Boolean, required: true, default: false },
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      collection: 'coupons',
   }
);
export const couponModel: Model<Coupon> = mongoose.model('Coupon', couponSchema);
