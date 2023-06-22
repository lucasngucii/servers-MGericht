import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth/authMiddleware";
//import * as couponController from "../../controllers/coupons/coupon.controller";
const router = Router();
//GET /coupons: Lấy danh sách các mã giảm giá hiện có.
router.get("/", authMiddleware);
//GET /coupons/{id}: Lấy thông tin chi tiết về một mã giảm giá cụ thể dựa trên ID.
router.get("/:id", authMiddleware);
//POST /coupons: Tạo một mã giảm giá mới.
router.post("/", authMiddleware);
//PATCH /coupons/{id}: Cập nhật thông tin của một mã giảm giá cụ thể dựa trên ID.
router.patch("/:id", authMiddleware);
//DELETE /coupons/{id}: Xóa một mã giảm giá cụ thể dựa trên ID.
router.delete("/:id", authMiddleware);
module.exports = router;