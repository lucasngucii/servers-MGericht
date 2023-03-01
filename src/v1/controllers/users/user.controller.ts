import { Request, Response } from "express";
import { HTTP_INTERNAL_SERVER_ERROR } from '../../constants/http-status/http_status';
import { getErrorMessage } from '../../utils/error/errorMessage';
import * as userServices from '../../services/users/User.service';
export const login = async  (req: Request, res: Response) => {
  try {
      const user = await userServices.login(req.body);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({error: getErrorMessage(error)})
  }
};
