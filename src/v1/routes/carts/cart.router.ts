import { Router } from "express";
const router = Router();
import * as cartController from "../../controllers/carts/cart.controller";
// cart Router
router.post("/:id", cartController.createCart);
module.exports = router;
