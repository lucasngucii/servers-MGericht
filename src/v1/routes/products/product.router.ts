import { Router } from "express";
import * as productController from "../../controllers/products/product.controller"
const router = Router();
// product Router
router.get("/", productController.getAllProduct)
router.post("/", productController.createProduct)


module.exports = router;