import { Router } from "express";
const routes = Router();
const userRouter = require("./users/user.router");
routes.use("/api/users", userRouter);
module.exports = routes;
