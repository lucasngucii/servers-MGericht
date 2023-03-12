import { Request, Response, NextFunction } from "express";
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_BAD_REQUEST } from "../../constants/http-status/http_status";
import { getErrorMessage } from "../../utils/error/errorMessage";
import { getUserById } from "../../services/users/User.service";
import { validateID } from "../../utils/validation/validateID";
import jwt from "jsonwebtoken";
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    validateID(id);
    const foundUser = await getUserById(id);
    !foundUser && new Error("User not found");
    foundUser?.role !== true && new Error("You are not admin");
    next();
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
};

