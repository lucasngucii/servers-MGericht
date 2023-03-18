import mongoose from "mongoose";
import { Request, Response } from "express";
import { HTTP_INTERNAL_SERVER_ERROR, HTTP_SUCCESS } from "../../constants/http-status/http_status";
import { getErrorMessage } from "../../utils/error/errorMessage";
import * as menuService from "../../services/menus/menu.service";
export const createMenu = async (req: Request, res: Response) => {
  try {
    const menu = await menuService.createMenu(req.body);
    res.status(HTTP_SUCCESS).json({ menu: menu });
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
  }
};
export const getAllMenus = async (req: Request, res: Response) => { 
    try {
        const menus = await menuService.getAllMenus();
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: getErrorMessage(error) });
    }
}

