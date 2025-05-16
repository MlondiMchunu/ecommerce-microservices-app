const { OrderEntity } = require('./orderModel');
var { AppDataSource } = require('./data-source');

class OrderService {
    private orderRepository = AppDataSource.getRepository(OrderEntity);

    async createOrder(order: Partial<typeof OrderEntity>): Promise<typeof OrderEntity | null> {

    }
}