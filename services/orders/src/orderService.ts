const { OrderEntity } = require('./orderModel');
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
}