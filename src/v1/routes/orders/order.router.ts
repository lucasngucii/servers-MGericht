import { Router } from 'express';
const routes = Router();
import * as orderController from '../../controllers/orders/order.controller';
import { authMiddleware } from '../../middlewares/auth/authMiddleware';

routes.get('/', authMiddleware, orderController.getAllOrders); // done
routes.get('/:id', authMiddleware, orderController.getOrderById); // done
routes.get('/user/:id', authMiddleware, orderController.getOrderByUserId); //done
routes.get('/product/:id', authMiddleware, orderController.getOrderByProductId); //



//post
routes.post('/:id/create', authMiddleware, orderController.createOrder);

routes.put('/:id', authMiddleware, orderController.updateProductsInOrder);

module.exports = routes;
