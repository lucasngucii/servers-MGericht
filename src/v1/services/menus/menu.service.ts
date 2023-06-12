import { DocumentDefinition, Types } from 'mongoose';

import { Menu, menuModel, MenuItem } from '../../models/menus/menu.model';

export const createMenu = async (menu: DocumentDefinition<Menu>) => {
   try {
      const createMenu = await menuModel.create(menu);
      await createMenu.save();
      return createMenu;
   } catch (error) {
      throw error;
   }
};

export const getAllMenus = async () => {
   try {
      const menus = await menuModel.find();
      if (!menus) throw new Error('Menu not found');
      return menus;
   } catch (error) {
      throw error;
   }
};

export const getMenuById = async (id: string) => {
   try {
      const menu = await menuModel.findById(id);
      return menu;
   } catch (error) {
      throw error;
   }
};

export const getMenuByProductId = async (id: string) => {
   try {
      const menu = await menuModel.find({ 'productList.productId': id });
      return menu;
   } catch (error) {
      throw error;
   }
};

export const updateMenu = async (id: string, menu: DocumentDefinition<Menu>) => {
   try {
      const updatedMenu = await menuModel.findByIdAndUpdate(id, menu);
      return updatedMenu;
   } catch (error) {
      throw error;
   }
};

export const deleteMenu = async (id: string) => {
   try {
      const deletedMenu = await menuModel.findByIdAndDelete(id);
      return deletedMenu;
   } catch (error) {
      throw error;
   }
};

export const deleteAllMenus = async () => {
   try {
      const deletedMenus = await menuModel.deleteMany();
      return deletedMenus;
   } catch (error) {
      throw error;
   }
};

export const addProductToMenu = async (menuId: string, productId: string) => {
   try {
      const menu = await menuModel.findById(menuId);
      if (!menu) throw new Error('Menu not found');
      menu.productList.push({ productId: productId as unknown as Types.ObjectId });
      await menu.save();
      return menu;
   } catch (error) {
      throw error;
   }
};

export const updateProductInMenu = async (menuId: string, productId: string,product: DocumentDefinition<MenuItem>) => {
   try {
      const menu = await menuModel.findById(menuId);
      if (!menu) throw new Error('Menu not found');
      const productIndex = menu.productList.findIndex((item) => {
         if (item.productId.toString() === product.productId.toString()) {
            menu.productList.push({
               productId: product.productId as unknown as Types.ObjectId,
            });
         }
      });
      await menu.save();
      return menu;
   } catch (error) {
      throw error;
   }
};
