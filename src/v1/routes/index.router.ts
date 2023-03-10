import { Router } from "express";
const routes = Router();
const userRouter = require("./users/user.router");
const productRouter = require("./products/product.router");
const tagRouter = require("./tags/tag.router");
const cartRouter = require("./carts/cart.router");
routes.use("/api/users", userRouter);
routes.use('/api/products', productRouter)
routes.use('/api/tags', tagRouter);
routes.use('/api/carts', cartRouter);
module.exports = routes;
