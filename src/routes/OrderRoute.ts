import { Router } from 'express';
import orderController from '../controllers/OrderController';
import {authenticate,verifyAdmin} from '../middleware/authenticate';
const router = Router();

// Orders
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrder);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export default router;
