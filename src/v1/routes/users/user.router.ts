import { Router } from "express";
import * as userController from "../../controllers/users/user.controller"
const router = Router();

router.get("/login", userController.login)
router.post("/registers", userController.register)
router.get("/get-users", userController.getUsers)
router.get("/:id", userController.getUserById)
router.delete("/:id", userController.deleteUser)
module.exports = router;