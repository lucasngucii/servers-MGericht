import { Request, Response } from "express";
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_SUCCESS, HTTP_UNAUTHORIZED } from '../../constants/http-status/http_status';
import { getErrorMessage } from '../../utils/error/errorMessage';
import * as userServices from '../../services/users/User.service';
export const login = async  (req: Request, res: Response) => {
  try {
    const user = await userServices.login(req.body);
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({error: getErrorMessage(error)})
  }
};
export const register = async (req: Request, res: Response) => { 
  try {
    const user = await userServices.register(req.body);
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({error: getErrorMessage(error)})
  }
}
export const getUsers = async (req: Request, res: Response) => { 
  try {
    const user = await userServices.getUsers();
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) })
  }
}
export const getUserById = async (req: Request, res: Response) => { 
  try {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    res.status(HTTP_SUCCESS).json(user);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) })
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userServices.deleteUser(id);
    res.status(HTTP_SUCCESS).json(user);
    console.log(id);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) })
  }
}
