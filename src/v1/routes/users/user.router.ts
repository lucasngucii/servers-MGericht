import { Router } from "express";
import * as userController from "../../controllers/users/user.controller"
const router = Router();
// User Router
router.get("/login", userController.login)
router.post("/registers", userController.register)
router.post("/logout", userController.logout)
// Admin Router
router.get("/get-users", userController.getUsers)
router.get("/:id", userController.getUserById)
router.delete("/:id", userController.deleteUser)
router.put("/:id", userController.updateUser)
module.exports = router;