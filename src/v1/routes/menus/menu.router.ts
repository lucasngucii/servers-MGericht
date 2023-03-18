import { Router } from "express";
import { isAdmin } from "../../middlewares/auth/isAdmin";
import * as menuController from "../../controllers/menus/menu.controller";
const router = Router();

router.post("/", isAdmin, menuController.createMenu);
//router.get("/", )
module.exports = router;
