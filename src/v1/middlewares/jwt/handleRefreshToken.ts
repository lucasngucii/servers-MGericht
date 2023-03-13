import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { generateToken } from "./jwtToken";
import * as userServices from "../../services/users/User.service";

export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const secrectKey = process.env.JWT_SECRET || "";
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
      throw new Error("No Refresh Token in Cookies");
    }
    const refreshToken = cookie.refreshToken;
    const user = await userServices.getUserByRefreshToken(refreshToken);
    if (!user) {
      throw new Error("Invalid Refresh Token");
    }
    jwt.verify(refreshToken, secrectKey, (err: any, decoded: any) => {
      if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
      }
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    });
  } catch (error) {}
};
