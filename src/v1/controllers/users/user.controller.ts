import { Request, Response, NextFunction } from "express";
import { HTTP_BAD_REQUEST, HTTP_SUCCESS } from "../../constants/http-status/http_status";
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
        
        console.log(req.body);
      const user = await UserService.register(req.body);
    if (!user) {
      res.status(HTTP_BAD_REQUEST).json({ error: "User not found" });
    }
    res.status(HTTP_SUCCESS).json({ user });
  } catch (error) {
    res.status(HTTP_BAD_REQUEST).json({ error: getErrorMessage(error) });
  }
};
