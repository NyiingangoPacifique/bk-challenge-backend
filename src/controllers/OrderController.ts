import { Request, Response } from 'express';
import { Order, OrderProduct } from '../../models';
import calculateTotalAmount from './helper/calculateTotalAmount';

class OrderController {
  async getAllOrders(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      const orders = await Order.findAll();
      return res.json(orders);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      const orderId = parseInt(req.params.id);
      const order = await Order.findByPk(orderId, {
        include: OrderProduct,
      });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      } else {
        return res.json(order);
      }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      const { productId,seedFertilizerId, userId, quantity,land,orderAddress, status } = req.body;

      const totalCost = await calculateTotalAmount(seedFertilizerId, land, quantity);
      const totalAmount = totalCost;
      console.log("((((((((((()))))", totalCost);

      const order = await Order.create({
        productId,
        seedFertilizerId,
        userId,
        quantity,
        land,
        totalAmount,
        orderAddress,
        status,
      });
      return res.status(201).json(order);
    return res.status(400).json({ error: 'Internal server error' });
    } catch (error) {
        console.log("^^^^^^^^^^^^^^^",error)
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      const orderId = parseInt(req.params.id);
      const { productId, userId, quantity, totalAmount, productIds } = req.body;
      console.log("#####################",req.body)
      const order = await Order.findByPk(orderId);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        order.productId = productId;
        order.userId = userId;
        order.quantity = quantity;
        order.totalAmount = totalAmount;
        await order.save();

        if (productIds && Array.isArray(productIds)) {
          await OrderProduct.destroy({
            where: {
              orderId: order.id,
            },
          });

          await Promise.all(
            productIds.map(async (productId: number) => {
              await OrderProduct.create({
                orderId: order.id,
                productId,
              });
            })
          );
        }

        res.json(order);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

//   async statusOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
//     try {
//       const orderId = parseInt(req.params.id);
//       const { productId, userId, quantity, totalAmount, productIds } = req.body;
//       const order = await Order.findByPk(orderId);
//       if (!order) {
//         res.status(404).json({ error: 'Order not found' });
//       } else {
//         order.productId = productId;
//         order.userId = userId;
//         order.quantity = quantity;
//         order.totalAmount = totalAmount;
//         await order.save();

//         if (productIds && Array.isArray(productIds)) {
//           await OrderProduct.destroy({
//             where: {
//               orderId: order.id,
//             },
//           });

//           await Promise.all(
//             productIds.map(async (productId: number) => {
//               await OrderProduct.create({
//                 orderId: order.id,
//                 productId,
//               });
//             })
//           );
//         }

//         res.json(order);
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

  async deleteOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      const orderId = parseInt(req.params.id);
      const order = await Order.findByPk(orderId);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        await OrderProduct.destroy({
          where: {
            orderId: order.id,
          },
        });

        await order.destroy();
        res.json({ message: 'Order deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new OrderController();
