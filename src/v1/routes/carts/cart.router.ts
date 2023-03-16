import { Router } from "express";
const router = Router();
import * as cartController from "../../controllers/carts/cart.controller";
// cart Router
router.post("/:id/", cartController.userCart);
/* router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder); 
router.get("/cart", authMiddleware, getUserCart);
router.delete("/empty-cart", authMiddleware, emptyCart);
*/
module.exports = router;
