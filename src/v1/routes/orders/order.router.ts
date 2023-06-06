import { Router } from 'express';
const routes = Router();
import * as orderController from '../../controllers/orders/order.controller';
import { authMiddleware } from '../../middlewares/auth/authMiddleware';

//post
routes.post('/:id/create', authMiddleware, orderController.createOrder);

module.exports = routes;
