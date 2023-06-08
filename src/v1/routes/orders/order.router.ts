import { Router } from 'express';
const routes = Router();
import * as orderController from '../../controllers/orders/order.controller';
import { authMiddleware } from '../../middlewares/auth/authMiddleware';

routes.get('/', authMiddleware, orderController.getAllOrders); // done
routes.get('/:id', authMiddleware, orderController.getOrderById); // done
routes.get('/user/:id', authMiddleware, orderController.getOrderByUserId); //done
routes.get('/product/:id', authMiddleware, orderController.getOrderByProductId); // fixing order

//post
routes.post('/:id/create', authMiddleware, orderController.createOrder);
//put
routes.put('/product/:id', authMiddleware, orderController.updateProductsInOrder); // 80% fixing order
routes.put('/address/:id', authMiddleware, orderController.updateAddress);
routes.put('/payment/:id', authMiddleware, orderController.updatePaymentMethod);
routes.put('/status/:id', authMiddleware, orderController.updateStatusOrder);
//delete
routes.delete('/:id', authMiddleware, orderController.deleteOrder);
routes.delete('/delete/all', authMiddleware, orderController.deleteAllOrders);

module.exports = routes;
