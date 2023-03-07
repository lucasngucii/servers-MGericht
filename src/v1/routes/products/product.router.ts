import { Router } from "express";
import * as productController from "../../controllers/products/product.controller"
const router = Router();
// product Router
router.get("/", productController.getAllProduct)
router.get("/:id", productController.getProductById)
router.post("/", productController.createProduct)
router.put("/", productController.updateProduct)
module.exports = router;