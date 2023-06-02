import { Request, Response, NextFunction } from 'express';
import { HTTP_INTERNAL_SERVER_ERROR } from '../../constants/http-status/http_status';
import { getErrorMessage } from '../../utils/error/errorMessage';
import { getUserById } from '../../services/users/User.service';
import { Role } from '../../models/users/user.model';
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = req.user;
      const user = await getUserById(id);
      if (user?.role !== Role.ADMIN) {
         throw new Error('You are not admin');
      }
      console.log('You are admin');
      next();
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};
