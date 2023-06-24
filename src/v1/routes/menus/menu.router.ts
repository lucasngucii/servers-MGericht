import { Router } from 'express';
const routes = Router();
import * as menuController from '../../controllers/menus/menu.controller';
import { authMiddleware } from '../../middlewares/auth/authMiddleware';

// GET /: Lấy tất cả các menu.
routes.get('/', authMiddleware, menuController.getAllMenus);

// GET /:id: Lấy menu bằng ID.
routes.get('/:id', authMiddleware, menuController.getMenuById);

// GET /product/:id: Lấy menu bằng ID sản phẩm.
routes.get('/product/:id', authMiddleware, menuController.getMenuByProductId);

// POST / create: Tạo một menu mới.
routes.post('/create', authMiddleware, menuController.createMenu);

// PUT /:id: Cập nhật thông tin menu.
routes.put('/:id', authMiddleware, menuController.updateMenu);

// PUT /:id/updateproduct: Cập nhật thông tin sản phẩm trong menu.
routes.put('/:id/updateproduct', authMiddleware, menuController.updateMenuProductInfo);

// PUT /:id/product: Thêm sản phẩm vào menu.
routes.put('/:id/product', authMiddleware, menuController.addProductToMenu);

// PUT /:id/product/:productId: Cập nhật thông tin sản phẩm trong menu.
routes.put('/:id/product/:productId', authMiddleware, menuController.updateProductInMenu);

// DELETE /:id: Xóa menu.
routes.delete('/:id', authMiddleware, menuController.deleteMenu);

// DELETE /delete/all: Xóa tất cả các menu.
routes.delete('/delete/all', authMiddleware, menuController.deleteAllMenus);

module.exports = routes;
