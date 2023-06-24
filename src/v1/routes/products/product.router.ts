import { Router } from 'express';
import * as productController from '../../controllers/products/product.controller';
import { authMiddleware } from '../../middlewares/auth/authMiddleware';
import { isAdmin } from '../../middlewares/auth/isAdmin';
const router = Router();
// GET /: Lấy tất cả sản phẩm.
router.get('/', productController.getAllProduct);

// GET /:id: Lấy sản phẩm bằng ID.
router.get('/:id', authMiddleware, productController.getProductById);

// POST /: Tạo một sản phẩm mới.
router.post('/', authMiddleware, isAdmin, productController.createProduct);

// PUT /:id: Cập nhật thông tin sản phẩm.
router.put('/:id', authMiddleware, isAdmin, productController.updateProduct);

// DELETE /:id: Xóa sản phẩm.
router.delete('/:id', authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;
