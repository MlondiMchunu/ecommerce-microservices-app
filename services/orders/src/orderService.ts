import { OrderEntity } from "./orderModel";
var { AppDataSource } = require('./data-source');

class OrderService {
    private orderRepository = AppDataSource.getRepository(OrderEntity);

    async createOrder(order: Partial<typeof OrderEntity>): Promise<typeof OrderEntity | null> {
        try {
            const newOrder = this.orderRepository.create(order);
            await this.orderRepository.save(newOrder);
            return newOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            return null;
        }
    }
    async getAllOrders(): Promise<OrderEntity[] | null> {
        try {
            return await this.orderRepository.find();
        } catch (error) {
            console.error('Error retrieving orders:', error);
            return null;
        }
    }
    async getOrderById(id: string): Promise<OrderEntity | null> {
        try {
            return await this.orderRepository.findOneBy({ id });
        } catch (error) {
            console.error('Error retireving order by ID:', error);
            return null;
        }
    }
}

export { OrderService };