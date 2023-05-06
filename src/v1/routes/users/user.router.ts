import { Router } from "express";
import * as userController from "../../controllers/users/user.controller";
import { isAdmin } from "../../middlewares/auth/isAdmin";
import { authMiddleware } from "../../middlewares/auth/authMiddleware";
const router = Router();
// get
router.get("/login", userController.login);//done
router.get("/logout", userController.logout); //done
router.get("/", authMiddleware, userController.getUsers); //done
router.get("/:id", authMiddleware, userController.getUserById); // done
router.get("/refresh", userController.handleRefreshToken);
// post
router.post("/registers", userController.register); // done
router.post("/:id/change-password", userController.changePassword);
router.post("/reset-password", userController.resetPassword);
// put
router.put("/:id", userController.updateUser);
// delete
router.delete("/:id", userController.deleteUser);

module.exports = router;
