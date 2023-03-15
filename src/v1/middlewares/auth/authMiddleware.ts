import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../../utils/error/errorMessage";
import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR } from "../../constants/http-status/http_status";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as userService from "../../services/users/User.service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const secrect = process.env.JWT_SECRET || "secret-key";
    try {
      if (token) {
        const decoded = jwt.verify(token, secrect);
        //@ts-ignore
        const user = await userService.getUserById(decoded?.id);
        //@ts-ignore
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(HTTP_BAD_REQUEST).json({ message: getErrorMessage(error) });
    }
  } else {
    throw new Error(" There is no token attached to header");
  }
};
