import { Router } from "express";
const routes = Router();
const userRouter = require("./users/user.router");
routes.use("/users", userRouter);
module.exports = routes;
