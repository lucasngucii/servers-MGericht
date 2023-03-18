import { Router } from "express";
import { isAdmin } from "../../middlewares/auth/isAdmin";
import * as menuController from "../../controllers/menus/menu.controller";
import { authMiddleware } from '../../middlewares/auth/authMiddleware';
const router = Router();

router.get("/", menuController.getAllMenus);
router.get("/:id", authMiddleware, menuController.getMenuById);
router.post("/", authMiddleware, isAdmin, menuController.createMenu);
router.put("/:id", authMiddleware, isAdmin, menuController.updateMenu);

module.exports = router;
