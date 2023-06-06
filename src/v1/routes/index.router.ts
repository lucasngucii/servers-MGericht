import { Router } from "express";
const routes = Router();
const userRouter = require("./users/user.router");
const productRouter = require("./products/product.router");
const orderRouter = require("./orders/order.router");

routes.use("/api/users", userRouter);
routes.use("/api/products", productRouter);
routes.use("/api/orders", orderRouter);



module.exports = routes;
