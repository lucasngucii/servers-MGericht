import { Request, Response, NextFunction } from "express";
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_BAD_REQUEST } from "../../constants/http-status/http_status";
import { getErrorMessage } from "../../utils/error/errorMessage";
import { getUserById } from "../../services/users/User.service";
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const user = await getUserById(id);
    if (user?.role !== true) {
      throw new Error("You are not admin");
    }
    console.log("You are admin");
    next();
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
};
