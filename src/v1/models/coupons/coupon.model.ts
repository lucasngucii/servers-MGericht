import mongoose, { Schema, Model, ObjectId } from 'mongoose';

export interface Coupon {
   userId: ObjectId;
   name: string;
   expiry: Date;
   discount: number;
   description?: string;
}

export const couponSchema: Schema<Coupon> = new mongoose.Schema(
   {
      userId: { type: mongoose.Types.ObjectId, ref: 'User' },
      name: {
         type: String,
         trim: true,
         unique: true,
         uppercase: true,
      },
      expiry: { type: Date, required: true },
      discount: { type: Number, required: true },
      description: { type: String, trim: true },
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      collection: 'coupons',
   }
);
export const couponModel: Model<Coupon> = mongoose.model('Coupon', couponSchema);
