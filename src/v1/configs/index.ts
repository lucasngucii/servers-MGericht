import { HOST, PASSWORD, PORT, USERNAME } from '../constants/mail/mail.config';

export default {
   mail: {
      host: HOST?.toString(),
      port: parseInt(PORT as string),
      secure: false,
      auth: {
         user: USERNAME?.toString(),
         pass: PASSWORD?.toString(),
      },
      verificationEmailSubject: 'Verify Your Email',
      verificationEmailTemplate: (verificationToken: string) => `
        <h1>Verify Your Email</h1>
        <p>Click the link below to verify your email:</p>
        <a href="http://localhost:3030/verify-email/${verificationToken}">Verify Email</a>
      `,
   },
   jwt_secret: process.env.JWT_SECRET,
};
