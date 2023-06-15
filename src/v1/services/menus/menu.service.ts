import { DocumentDefinition, Types } from 'mongoose';

import { Menu, menuModel, MenuItem } from '../../models/menus/menu.model';
import { productModel } from '../../models/products/product.model';

export const createMenu = async (menu: DocumentDefinition<Menu>) => {
   try {
      // check menu for existing
      const foundMenu = await menuModel.findOne({ name: menu.name });
      if (foundMenu) {
         throw new Error(`Menu ${menu.name} already exists`);
      }
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

export const updateProductInMenu = async (
   menuId: string,
   productId: string,
   product: DocumentDefinition<MenuItem>
) => {
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

export const updateMenuProductInfo = async (menuId: string) => {
   try {
      const menu = await menuModel.findById(menuId).lean();
      if (!menu) throw new Error('Menu not found');

      const productIds = menu.productList.map((item) => item.productId);
      // query for product
      const products = await productModel.find({ _id: { $in: productIds } }, 'name image').lean();
      // update product information in model menu

      const updateProductList = menu.productList.map((item) => {
         const product = products.find((p) => {
            p._id.toString() === item.productId.toString();
         });
         if (product)
            return {
               ...item,
               productName: product.name,
               productImage: product.image,
            };
         return item;
      });
      // update model "menu" with info about product
      const updatedMenu = await menuModel.findByIdAndUpdate(
         menuId,
         { productList: [updateProductList] },
         { new: true }
      );
      return updatedMenu;
   } catch (error) {
      throw error;
   }
};
