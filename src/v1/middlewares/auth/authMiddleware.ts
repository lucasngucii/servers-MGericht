import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../../utils/error/errorMessage";
import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR } from "../../constants/http-status/http_status";
import jwt from "jsonwebtoken";
import * as userService from "../../services/users/User.service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split("Bearer ")[1];
      console.log(token);
      const secrect = process.env.JWT_SECRET || "secret-key";
      console.log(secrect);
    try {
        
      if (token) {
        const decoded = jwt.verify(token, secrect);
        console.log(decoded);
      }
    } catch (error) {
      res.status(HTTP_BAD_REQUEST).json({ message: getErrorMessage(error) });
    }
  } else {
    throw new Error(" There is no token attached to header");
  }
};
