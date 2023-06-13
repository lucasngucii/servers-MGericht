import { Router } from 'express';
const routes = Router();
import * as menuController from '../../controllers/menus/menu.controller';
import { authMiddleware } from '../../middlewares/auth/authMiddleware';

routes.get('/', authMiddleware, menuController.getAllMenus); // done
routes.get('/:id', authMiddleware, menuController.getMenuById); // done
routes.get('/product/:id', authMiddleware, menuController.getMenuByProductId); //done

//post
routes.post('/ create', authMiddleware, menuController.createMenu);
//put
routes.put('/:id', authMiddleware, menuController.updateMenu);
routes.put('/:id/updateproduct', authMiddleware, menuController.updateMenuProductInfo);
routes.put('/:id/product', authMiddleware, menuController.addProductToMenu);
routes.put('/:id/product/:productId', authMiddleware, menuController.updateProductInMenu);
//delete
routes.delete('/:id', authMiddleware, menuController.deleteMenu);
routes.delete('/delete/all', authMiddleware, menuController.deleteAllMenus);

module.exports = routes;
