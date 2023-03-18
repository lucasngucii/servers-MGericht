import { Router } from "express";
import * as productController from "../../controllers/products/product.controller";
import { authMiddleware } from "../../middlewares/auth/authMiddleware";
import { isAdmin } from "../../middlewares/auth/isAdmin";
const router = Router();
// product Router
router.get("/", productController.getAllProduct);
router.get("/:id", authMiddleware, productController.getProductById);
router.post("/", authMiddleware, isAdmin , productController.createProduct);
router.put("/:id", authMiddleware,isAdmin ,productController.updateProduct);
router.delete("/:id", authMiddleware,isAdmin, productController.deleteProduct);
module.exports = router;
