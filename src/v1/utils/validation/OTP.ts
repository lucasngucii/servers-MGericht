import { OtpModel } from '../../models/users/otp.model';
const OtpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');

export const hasdOTP = async (email: string, otp: string) => {
   const salt = parseInt(process.env.BCRYPT_SALT as string);
   try {
      const optHasd = await bcrypt.hash(otp, salt);
      const OPT = await OtpModel.create({ email, otp: optHasd });
      return OPT;
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

export const OTPGenerator = () => {
   const Otp = OtpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
   });
   return Otp;
};
