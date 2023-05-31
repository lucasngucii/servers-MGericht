import { Request, Response, NextFunction } from 'express';
import {
   HTTP_INTERNAL_SERVER_ERROR,
   HTTP_BAD_REQUEST,
} from '../../constants/http-status/http_status';
import { getErrorMessage } from '../../utils/error/errorMessage';
import { getUserById } from '../../services/users/User.service';
export const checkBlockUser = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.user;
   try {
      const user = await getUserById(id);
      if (user?.isBlocked === true) {
         throw new Error('Your account is blocked');
      }
      next();
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};
