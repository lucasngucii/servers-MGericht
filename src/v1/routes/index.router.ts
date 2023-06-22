import { Router } from 'express';
const routes = Router();
const userRouter = require('./users/user.router');
const productRouter = require('./products/product.router');
const orderRouter = require('./orders/order.router');
const menuRouter = require('./menus/menu.router');
const cartRouter = require('./carts/cart.router');
const couponRouter = require('./coupons/coupon.router');
routes.use('/api/users', userRouter);
routes.use('/api/products', productRouter);
routes.use('/api/orders', orderRouter);
routes.use('/api/menus', menuRouter);
routes.use('/api/carts', cartRouter);
routes.use('/api/coupons', couponRouter);

module.exports = routes;
