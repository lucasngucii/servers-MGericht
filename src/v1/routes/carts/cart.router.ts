import { Router } from 'express';
const routes = Router();

import * as cartController from '../../controllers/carts/cart.controller';
import { authMiddleware } from '../../middlewares/auth/authMiddleware';

//GET /products: Lấy danh sách các sản phẩm có sẵn trong cửa hàng.
routes.get('/:id/products', authMiddleware);
//GET /products/{id}: Lấy thông tin chi tiết về một sản phẩm cụ thể dựa trên ID.
routes.get('/:id/products/:id', authMiddleware);
//GET /cart/items: Lấy thông tin chi tiết về các sản phẩm trong giỏ hàng.
routes.get('/:id/cart/items', authMiddleware);
//GET /orders: Lấy danh sách các đơn hàng đã được đặt.
routes.get('/:id/orders', authMiddleware);
//GET /orders/{id}: Lấy thông tin chi tiết về một đơn hàng cụ thể dựa trên ID.
routes.get('/:id/orders/:id', authMiddleware);
//GET /users/{id}/orders: Lấy danh sách các đơn hàng đã được đặt bởi một người dùng cụ thể dựa trên ID người dùng.
routes.get('/users/:id/orders', authMiddleware);
//GET /users/{id}: Lấy thông tin chi tiết về một người dùng cụ thể dựa trên ID.
routes.get('/users/:id', authMiddleware);
//GET /cart/items/count: Lấy số lượng sản phẩm hiện có trong giỏ hàng.
routes.get('/cart/items/count', authMiddleware);
//GET /cart/items/{id}: Lấy thông tin chi tiết về một sản phẩm trong giỏ hàng dựa trên ID.
routes.get('/cart/items/:id', authMiddleware);
//GET /users/{id}/wishlist: Lấy danh sách sản phẩm trong danh sách mong muốn của một người dùng.
routes.get('/users/:id/wishlist', authMiddleware);
//GET /cart/total: Lấy tổng giá trị của giỏ hàng, bao gồm cả các khoản giảm giá.
routes.get('/cart/total', authMiddleware);

//POST /: Tạo một giỏ hàng tương ứng người dùng mới.
routes.post('/:id/create', authMiddleware, cartController.createCart);
//POST /cart/items: Thêm một sản phẩm vào giỏ hàng.
routes.post('/:id/cart/items', authMiddleware);
//POST /cart/checkout: Xử lý thanh toán cho giỏ hàng và tạo đơn hàng.
routes.post('/:id/cart/checkout', authMiddleware);
//POST /cart/coupon: Áp dụng mã giảm giá hoặc phiếu quà tặng cho giỏ hàng.
routes.post('/:id/cart/coupon', authMiddleware);
//POST /cart/items/{id}/move-to-wishlist: Chuyển một sản phẩm từ giỏ hàng sang danh sách mong muốn.
routes.post('/:id/cart/items/:id/move-to-wishlist', authMiddleware);
//POST /cart/items/{id}/move-to-save-for-later: Chuyển một sản phẩm từ giỏ hàng sang danh sách lưu để dành sau này.
routes.post('/:id/cart/items/:id/move-to-save-for-later', authMiddleware);

//PATCH /cart/items/{id}: Cập nhật số lượng của một sản phẩm trong giỏ hàng.
routes.patch('/cart/items/:id', authMiddleware);
//PATCH /users/{id}: Cập nhật thông tin của một người dùng cụ thể dựa trên ID.
routes.patch('/users/:id', authMiddleware);
//PATCH /cart/items/{id}/quantity: Cập nhật số lượng của một sản phẩm trong giỏ hàng dựa trên ID
routes.patch('/cart/items/:id/quantity', authMiddleware);
//DELETE /cart/items/{id}: Xóa một sản phẩm khỏi giỏ hàng.
routes.delete('/cart/items/:id', authMiddleware);
//DELETE /cart: Xóa toàn bộ nội dung của giỏ hàng.
routes.delete('/cart', authMiddleware);

module.exports = routes;
