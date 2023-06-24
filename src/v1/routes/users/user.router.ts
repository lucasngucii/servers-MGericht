import { Router } from 'express';
import * as userController from '../../controllers/users/user.controller';
import { isAdmin } from '../../middlewares/auth/isAdmin';
import { authMiddleware } from '../../middlewares/auth/authMiddleware';
const router = Router();
// User routes
// GET /login: Hiển thị trang đăng nhập.
router.get('/login', userController.login);

// GET /logout: Đăng xuất người dùng.
router.get('/logout', userController.logout);

// GET /: Lấy tất cả người dùng.
router.get('/', authMiddleware, userController.getUsers);

// GET /:id: Lấy thông tin người dùng bằng ID.
router.get('/:id', authMiddleware, userController.getUserById);

// GET /refresh: Xử lý làm mới mã thông báo truy cập.
router.get('/refresh', userController.handleRefreshToken);

// POST /verify-otp: Xác minh OTP của người dùng.
router.post('/verify-otp', userController.verifyOTP);

// POST /registers: Đăng ký người dùng mới.
router.post('/registers', userController.register);

// POST /reset-password: Đặt lại mật khẩu người dùng.
router.post('/reset-password', userController.resetPassword);

// POST /send-otp: Gửi mã OTP đến người dùng.
router.post('/send-otp', userController.sendOTP);

// PUT /:id/change-password: Thay đổi mật khẩu của người dùng.
router.put('/:id/change-password', userController.changePassword);

// PUT /forgot-password-token: Đặt lại mật khẩu người dùng.
router.put('/forgot-password-token', userController.resetPassword);

// PUT /:id: Cập nhật thông tin người dùng.
router.put('/:id', userController.updateUser);

// PUT /:id/activate: Kích hoạt người dùng.
router.put('/:id/activate', authMiddleware, isAdmin, userController.unblockUser);

// PUT /:id/deactivate: Vô hiệu hóa người dùng.
router.put('/:id/deactivate', authMiddleware, isAdmin, userController.blockUser);

// DELETE /:id: Xóa người dùng.
router.delete('/:id', isAdmin, userController.deleteUser);

// Customer routes
// GET /customer/:id: Lấy thông tin khách hàng bằng ID.
router.get('/customer/:id', authMiddleware, isAdmin, userController.getCustomerById);

// POST /customer: Tạo khách hàng mới.
router.post('/customer', authMiddleware, isAdmin, userController.createCustomer);

// PUT /customer/:id: Cập nhật thông tin khách hàng.
router.put('/customer/:id', authMiddleware, isAdmin, userController.updateCustomer);

// DELETE /customer/:id: Xóa khách hàng.
router.delete('/customer/:id', authMiddleware, isAdmin, userController.deleteCustomer);

module.exports = router;
