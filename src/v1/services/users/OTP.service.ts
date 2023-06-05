import { OtpModel } from '../../models/users/otp.model';

const bcrypt = require('bcryptjs');

export const OTP = async (email: string, otp: string) => {
   const salt = parseInt(process.env.BCRYPT_SALT as string);
   try {
      const optHasd = await bcrypt.hash(otp, salt);
      const OPT = await OtpModel.create({ email, otp: optHasd });
      return OPT ? 1 : 0;
   } catch (error) {
      throw error;
   }
};
export const verifyOTP = async (email: string, otp: string) => { 
   try {
      
   } catch (error) {
      throw error;
   }
}