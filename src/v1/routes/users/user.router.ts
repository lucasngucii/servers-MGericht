import { Router } from "express";
import * as userController from "../../controllers/users/user.controller";
import { isAdmin } from "../../middlewares/auth/isAdmin";
import { authenticationToken } from "../../middlewares/auth/authenticationToken";
const router = Router();
// get
router.get("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/get-users", authenticationToken, userController.getUsers);
router.get("/:id", isAdmin, userController.getUserById);
router.get("/refresh", userController.handleRefreshToken);
// post
router.post("/registers", userController.register);
router.post("/logout", userController.logout);
router.post("/:id/change-password", userController.changePassword);
// put
router.put("/:id", userController.updateUser);
// delete
router.delete("/:id", userController.deleteUser);

module.exports = router;
