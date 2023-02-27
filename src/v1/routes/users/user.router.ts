import { Router } from "express";
import * as userController from "../../controllers/users/user.controller";
const router = Router();

router.get("/login",userController.login);
module.exports = router;