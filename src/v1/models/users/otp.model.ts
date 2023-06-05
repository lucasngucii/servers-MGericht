import mongoose from 'mongoose';

export interface OTP extends mongoose.Document {
   email: string;
   otp: string;
   time: Date;
}

export const OtpSchema: mongoose.Schema<OTP> = new mongoose.Schema(
   {
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      otp: { type: String, required: true, trim: true },
      time: { type: Date, default: Date.now(), index: { expires: 60 } },
   },
   {
      timestamps: true,
      collection: 'OTP',
   }
);

export const OtpModel = mongoose.model<OTP>('OTP', OtpSchema);
