import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../../utils/error/errorMessage";
import { HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR } from "../../constants/http-status/http_status";
import jwt from "jsonwebtoken";
export const authenticationToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHearder = req.headers["authorization"];
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = (authHearder && authHearder.split(" ")[1]) || "";
    if (!token) {
      res.status(HTTP_BAD_REQUEST).json({ error: "Invalid token" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
      req.body.user = decoded;
      next();
    } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
    }
  }
};
