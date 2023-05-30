import { Request, Response, NextFunction } from 'express';
import {
   HTTP_INTERNAL_SERVER_ERROR,
   HTTP_SUCCESS,
   HTTP_FORBIDDEN,
} from '../../constants/http-status/http_status';
import { getErrorMessage } from '../../utils/error/errorMessage';
import * as userServices from '../../services/users/User.service';
import { validateID } from '../../utils/validation/validateID';
import { generateToken } from '../../middlewares/jwt/jwtToken';

// Login user client
export const login = async (req: Request, res: Response) => {
   try {
      const user = await userServices.login(req.body);
      res.cookie('refreshToken', user.refreshToken, {
         httpOnly: true,
         maxAge: 72 * 60 * 60 * 1000,
      });
      res.status(HTTP_SUCCESS).json({ user: user, Token: generateToken(user.user._id) });
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};

// register user client
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
      validateID(id);
      const { currentPassword, newPassword } = req.body;
      const user = await userServices.changePassword(id, currentPassword, newPassword);
      res.status(HTTP_SUCCESS).json(user);
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};

export const logout = async (req: Request, res: Response) => {
   try {
      const user = await userServices.logout(req.cookies.refreshToken);

      if (!user) {
         res.clearCookie('refreshToken', { httpOnly: true, secure: true });
         return res.status(HTTP_FORBIDDEN).json({ error: 'User not found' });
      }
      res.clearCookie('refreshToken', { httpOnly: true, secure: true });
      res.status(HTTP_SUCCESS).json({ message: 'Logout successfully' });
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};

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
      validateID(id);
      const user = await userServices.getUserById(id);
      res.status(HTTP_SUCCESS).json(user);
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};

export const deleteUser = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      validateID(id);
      await userServices.deleteUser(id);
      res.status(HTTP_SUCCESS).json({ message: 'User deleted successfully' });
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};

export const updateUser = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      validateID(id);
      const user = await userServices.updateUser(id, req.body);
      res.status(HTTP_SUCCESS).json(user);
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};

export const  handleRefreshToken = async (req: Request, res: Response) => {
   try {
      const cookie = req.cookies;
      console.log(cookie);
      if (!cookie?.refreshToken) throw new Error('Token not found');
      const refreshToken = cookie.refreshToken;
      const user = await userServices.getUserByRefreshToken(refreshToken);
      console.log(user);
      if (!user) throw new Error('User not found');
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};
export const resetPassword = async (req: Request, res: Response) => {
   const { email, newPassword } = req.body;
   try {
      const user = await userServices.changePasswordForget(email, newPassword);
      res.status(HTTP_SUCCESS).json(user);
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};

export const blockUser = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      validateID(id);
      const user = await userServices.blockUser(id);
      res.status(HTTP_SUCCESS).json(user);
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};

export const unblockUser = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      validateID(id);
      const user = await userServices.unblockUser(id);
      res.status(HTTP_SUCCESS).json(user);
   } catch (error) {
      res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
   }
};


