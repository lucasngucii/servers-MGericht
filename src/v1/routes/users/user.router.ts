import { Router } from "express";
import * as userController from "../../controllers/users/user.controller";
import { isAdmin } from "../../middlewares/auth/isAdmin.mdl";
import { authenticationToken } from "../../middlewares/jwt/authenticate";
const router = Router();
// User Router
router.get("/login", userController.login);
router.post("/registers", userController.register);
router.post("/logout", userController.logout);
router.post("/:id/change-password", userController.changePassword);
// Admin Router
router.get("/get-users", authenticationToken, userController.getUsers);
router.get("/:id", isAdmin, userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
module.exports = router;
