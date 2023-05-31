import { Request, Response, NextFunction } from "express";
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_BAD_REQUEST } from "../../constants/http-status/http_status";
import { getErrorMessage } from "../../utils/error/errorMessage";
import { getUserByRefreshToken } from "../../services/users/User.service";

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => { 
    const { refreshToken } = req.cookies;
    try {
        const user = await getUserByRefreshToken(refreshToken);
        if (!user) {
            throw new Error("You are not login");
        }
        next();
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
    }
}