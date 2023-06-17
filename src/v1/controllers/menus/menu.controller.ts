import { Request, Response, NextFunction } from 'express';
import {
   HTTP_INTERNAL_SERVER_ERROR,
   HTTP_SUCCESS,
   HTTP_FORBIDDEN,
} from '../../constants/http-status/http_status';
import { getErrorMessage } from '../../utils/error/errorMessage';
import { validateID } from '../../utils/validation/validateID';
import { generateToken } from '../../middlewares/jwt/jwtToken';
import * as menuService from '../../services/menus/menu.service';

export const createMenu = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const menu = await menuService.createMenu(req.body);
      res.status(HTTP_SUCCESS).json(menu);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const updateMenuProductInfo = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const menu = await menuService.updateMenuProductInfo(id);
      res.status(HTTP_SUCCESS).json (menu);
   } catch (error) {
      console.error(error); 
      next(error);
   }
};

export const getAllMenus = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const menus = await menuService.getAllMenus();
      res.status(HTTP_SUCCESS).json(menus);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const getMenuById = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const menu = await menuService.getMenuById(id);
      res.status(HTTP_SUCCESS).json(menu);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const getMenuByProductId = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const menu = await menuService.getMenuByProductId(id);
      res.status(HTTP_SUCCESS).json(menu);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const updateMenu = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const menu = await menuService.updateMenu(id, req.body);
      res.status(HTTP_SUCCESS).json(menu);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const deleteMenu = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const menu = await menuService.deleteMenu(id);
      res.status(HTTP_SUCCESS).json(menu);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const deleteAllMenus = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const menu = await menuService.deleteAllMenus();
      res.status(HTTP_SUCCESS).json(menu);
   } catch (error) {
      console.error(error);
      next(error);
   }
};

export const addProductToMenu = async (req: Request, res: Response, next: NextFunction) => {
   const { id } = req.params;
   validateID(id);
   try {
      const menu = await menuService.addProductToMenu(id, req.body);
      res.status(HTTP_SUCCESS).json(menu);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
export const updateProductInMenu = async (req: Request, res: Response, next: NextFunction) => {
   const { id, productId } = req.params;
   validateID(id);
   validateID(productId);
   try {
      const menu = await menuService.updateProductInMenu(id, productId, req.body);
      res.status(HTTP_SUCCESS).json(menu);
   } catch (error) {
      console.error(error);
      next(error);
   }
};
