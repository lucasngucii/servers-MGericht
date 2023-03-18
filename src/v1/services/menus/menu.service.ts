import { DocumentDefinition } from "mongoose";
import { Menu, MenuModel } from "../../models/menus/menu.model";
export const createMenu = async (menu: DocumentDefinition<Menu>) => {
  try {
    !menu && new Error("Menu not found");
    // check if menu exist
    const menuFound = await MenuModel.findOne({ name: menu.name });
    if (menuFound) throw new Error("Menu already exist");
    // create new menu
    const newMenu = await MenuModel.create(menu);
    await newMenu.save();
    return newMenu;
  } catch (error) {
    throw error;
  }
};
export const getAllMenus = async () => {
  try {
    const menus = await MenuModel.find();
    if (!menus) throw new Error("No menu found");
    return menus;
  } catch (error) {
    throw error;
  }
};

export const getMenuById = async (id: string) => {
  try {
    // check if id is valid
    !id && new Error("Menu id not found");
    // find menu by id
    const menu = await MenuModel.findById(id);
    if (!menu) throw new Error("No menu found");
    return menu;
  } catch (error) {
    throw error;
  }
};

export const getMenuByName = async (name: string) => {
  try {
    // check if name is valid
    !name && new Error("Menu name not found");
    // find menu by name
    const menu = await MenuModel.findOne({ name: name });
    !menu && new Error("No menu found");
    return menu;
  } catch (error) {
    throw error;
  }
};
export const updateMenu = async (id: string, menu: DocumentDefinition<Menu>) => { 
    try {
        
    } catch (error) {
        throw error;
    }
}
