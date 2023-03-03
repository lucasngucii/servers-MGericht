import { Request, Response } from "express";
import {
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_SUCCESS,
  HTTP_UNAUTHORIZED,
} from "../../constants/http-status/http_status";
import { getErrorMessage } from "../../utils/error/errorMessage";
import * as userServices from "../../services/users/User.service";
export const login = async (req: Request, res: Response) => {
  try {
    const user = await userServices.login(req.body);
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
};
export const register = async (req: Request, res: Response) => {
  try {
    const user = await userServices.register(req.body);
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
};
export const changePassword = async (req: Request, res: Response) => { 
  try {
    const { id } = req.params;
    const user = await userServices.changePassword(id,req.body);
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
}
export const logout = async (req: Request, res: Response) => { 
  try {
    const user = await userServices.logout(req.body);
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
}

// Admin Controller
export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await userServices.getUsers();
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
};    
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userServices.deleteUser(id);
    res.status(HTTP_SUCCESS).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userServices.updateUser(id, req.body);
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
 };
