import { Router } from "express";
const routes = Router();
const userRouter = require("./users/user.router");
const productRouter = require("./products/product.router");
const tagRouter = require("./tags/tag.router");
routes.use("/api/users", userRouter);
routes.use('/api/products', productRouter)
routes.use('/api/tags', tagRouter);
module.exports = routes;
