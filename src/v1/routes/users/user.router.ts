import { Router } from "express";
import * as userController from "../../controllers/users/user.controller";
import { isAdmin } from "../../middlewares/auth/isAdmin";
import { authMiddleware } from "../../middlewares/auth/authMiddleware";
const router = Router();
// get
router.get("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/", authMiddleware, userController.getUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.get("/refresh", userController.handleRefreshToken);
// post
router.post("/registers", userController.register);
router.post("/:id/change-password", userController.changePassword);
// put
router.put("/:id", userController.updateUser);
// delete
router.delete("/:id", userController.deleteUser);

module.exports = router;
