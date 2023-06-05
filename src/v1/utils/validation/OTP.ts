import { OtpModel } from '../../models/users/otp.model';

const bcrypt = require('bcryptjs');

export const hasdOTP = async (email: string, otp: string) => {
   const salt = parseInt(process.env.BCRYPT_SALT as string);
   try {
      const optHasd = await bcrypt.hash(otp, salt);
      const OPT = await OtpModel.create({ email, otp: optHasd });
      return OPT ? 1 : 0;
   } catch (error) {
      throw error;
   }
};
export const validOTP = async (otp: string, hasdOTP: string) => {
   try {
      const isValid = await bcrypt.compare(otp, hasdOTP);
      return isValid;
   } catch (error) {
      throw error;
   }
};
