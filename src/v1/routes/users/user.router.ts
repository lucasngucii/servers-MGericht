import { Router } from "express";
import * as userController from "../../controllers/users/user.controller";
const router = Router();

router.get("/login", userController.login);
router.post("/register", userController.register);
module.exports = router;