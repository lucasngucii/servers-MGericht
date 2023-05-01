import { Router } from "express";
const routes = Router();
const userRouter = require("./users/user.router");
const productRouter = require("./products/product.router");

const cartRouter = require("./carts/cart.router");
const menuRouter = require("./menus/menu.router");
routes.use("/api/users", userRouter);
routes.use("/api/products", productRouter);

routes.use("/api/carts", cartRouter);
routes.use("/api/menus", menuRouter);
module.exports = routes;
