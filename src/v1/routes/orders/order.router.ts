import { Router } from 'express';
const routes = Router();
import * as orderController from '../../controllers/orders/order.controller';
import { authMiddleware } from '../../middlewares/auth/authMiddleware';

// GET /: Lấy tất cả các đơn hàng.
routes.get('/', authMiddleware, orderController.getAllOrders);

// GET /:id: Lấy đơn hàng bằng ID.
routes.get('/:id', authMiddleware, orderController.getOrderById);

// GET /user/:id: Lấy đơn hàng bằng ID người dùng.
routes.get('/user/:id', authMiddleware, orderController.getOrderByUserId);

// GET /product/:id: Lấy đơn hàng bằng ID sản phẩm.
routes.get('/product/:id', authMiddleware, orderController.getOrderByProductId);

// POST /:id/create: Tạo một đơn hàng mới.
routes.post('/:id/create', authMiddleware, orderController.createOrder);

// PUT /product/:id: Cập nhật sản phẩm trong đơn hàng.
routes.put('/product/:id', authMiddleware, orderController.updateProductsInOrder);

// PUT /address/:id: Cập nhật địa chỉ trong đơn hàng.
routes.put('/address/:id', authMiddleware, orderController.updateAddress);

// PUT /payment/:id: Cập nhật phương thức thanh toán trong đơn hàng.
routes.put('/payment/:id', authMiddleware, orderController.updatePaymentMethod);

// PUT /status/:id: Cập nhật trạng thái đơn hàng.
routes.put('/status/:id', authMiddleware, orderController.updateStatusOrder);

// DELETE /:id: Xóa đơn hàng.
routes.delete('/:id', authMiddleware, orderController.deleteOrder);

// DELETE /delete/all: Xóa tất cả các đơn hàng.
routes.delete('/delete/all', authMiddleware, orderController.deleteAllOrders);

module.exports = routes;
