import { Request, Response, NextFunction } from "express";
import { HTTP_BAD_REQUEST, HTTP_SUCCESS, HTTP_INTERNAL_SERVER_ERROR } from '../../constants/http-status/http_status';
import { getErrorMessage } from "../../utils/error/errorMessage";
import * as UserService from "../../services/users/User.service";

export const login = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(HTTP_BAD_REQUEST).json({ error: getErrorMessage(error) });
  }
};
export const register = async (req: Request, res: Response) => {
  try {
    //import information of the user service
    const user = await UserService.register(req.body);
    res.status(HTTP_SUCCESS).json({ message: "User register successfully", user });
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: getErrorMessage(error) });
  }
};