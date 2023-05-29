const nodemailer = require('nodemailer');

const sendEmail = async (email: string, subject: string, message: string) => {
   try {
      const transporter = nodemailer.createTransport({
         host: process.env.HOST,
         service: process.env.SERVICE,
         port: process.env.PORT,
         secure: true,
         auth: {
            user: process.env.USER,
            password: process.env.PASSWORD,
         },
      });
      await transporter.sendEmail({
         from: process.env.USER,
         to: email,
         subject: subject,
         text: message,
      });
      return true;
   } catch (error) {
      throw error;
   }
};

module.exports = sendEmail;
