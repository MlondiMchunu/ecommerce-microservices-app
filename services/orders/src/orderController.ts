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
            return res.status(500).json({message:'Error creating order'});
        }
    }
}