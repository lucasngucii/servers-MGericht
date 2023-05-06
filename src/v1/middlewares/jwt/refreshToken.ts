import jwt from 'jsonwebtoken';

export const generateRefreshToken = (id: string) => {
   const secrectKey: jwt.Secret = process.env.JWT_SECRET || '';
   return jwt.sign({ id }, secrectKey, { expiresIn: '1d' });
};
