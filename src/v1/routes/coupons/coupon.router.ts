import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth/authMiddleware";
import * as couponController from "../../controllers/coupons/coupon.controller";
const router = Router();
//GET /coupons: Lấy danh sách các mã giảm giá hiện có.
router.get("/", authMiddleware, couponController.getCoupons);
//GET /coupons/{id}: Lấy thông tin chi tiết về một mã giảm giá cụ thể dựa trên ID.
router.get("/:id", authMiddleware, couponController.getCouponById);
//GET /coupons/validate/{couponId}: Kiểm tra mã giảm giá có hợp lệ hay không.
router.get("/validate/:id", authMiddleware, couponController.validateCoupon);
//POST /coupons: Tạo một mã giảm giá mới.
router.post("/", authMiddleware, couponController.createCoupon);
//PUT /coupons/{id}: Cập nhật thông tin của một mã giảm giá cụ thể dựa trên ID.
router.put("/:couponId", authMiddleware, couponController.updateCoupon);
//DELETE /coupons/{id}: Xóa một mã giảm giá cụ thể dựa trên ID.
router.delete("/:couponId", authMiddleware, couponController.deleteCoupon);
module.exports = router; 