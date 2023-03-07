import { Router } from "express";
const routes = Router();
const userRouter = require("./users/user.router");
const productRouter = require("./products/product.router");
routes.use("/api/users", userRouter);
routes.use('/api/products', productRouter)
module.exports = routes;
