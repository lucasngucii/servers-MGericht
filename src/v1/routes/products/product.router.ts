import { Router } from "express";
import * as productController from "../../controllers/products/product.controller";
import { authMiddleware } from "../../middlewares/auth/authMiddleware";
const router = Router();
// product Router
router.get("/", productController.getAllProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.get("/:id", authMiddleware, productController.getProductById);
router.post("/", authMiddleware, productController.createProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);
module.exports = router;
