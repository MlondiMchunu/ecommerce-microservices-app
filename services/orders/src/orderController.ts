import { Request, Response } from 'express';
const { OrderService } = require('./orderService');


class OrderController {
    private orderService = new OrderService();

    async createOrder(req: Request, res: Response): Promise<Response> {
        try {
            const newOrder = await this.orderService.createOrder(req.body);
            if (!newOrder) {
                return res.status(500).json({ message: 'Error creating the order' });
            }
            return res.status(201).json(newOrder);
        } catch (error) {
            console.error('Error creating order:', error);
            return res.status(500).json({ message: 'Error creating order' });
        }
    }

    async getAllOrders(req: Request, res: Response): Promise<void> {
        const orders = await this.orderService.getAllOrders();
        res.json(orders);
    }

    async getOrderById(req: Request, res: Response): Promise<void> {
        const order = await this.orderService.getOrderById(req.params.id);
        if (!order) {
            res.status(404).json({ message: 'Order not found!' });
        }
        res.json(order);
    }
}

export { OrderController };