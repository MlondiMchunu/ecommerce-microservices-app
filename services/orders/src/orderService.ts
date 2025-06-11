import { OrderEntity } from "./orderModel";
import { Kafka } from 'kafkajs';
var { AppDataSource } = require('./data-source');

/**initialize a new kafka client**/
const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['kafka:9092'],
});
const producer = kafka.producer();
export const sendOrderCreatedEvent = async (order: OrderEntity): Promise<void> => {
    await producer.connect();
    try{
        const result = await producer.send({
            topic: 'order-created',
            messages: [{value: JSON.stringify(order)}],
        });
    }
}


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
    async updateOrderStatus(id: string, status: string): Promise<OrderEntity | null> {
        try {
            const order = await this.orderRepository.findOneBy({ id });
            if (order) {
                order.status = status;
                await this.orderRepository.save(order);
            }
            return order;
        } catch (error) {
            console.error(`Error updating order by ID: `, error);
            return null;
        }
    }
    async deleteOrder(id: string): Promise<boolean> {
        try {
            const result = await this.orderRepository.delete(id);
            return result.affected !== 0;
        } catch (error) {
            console.error('Eror deleting order by ID:', error);
            return false;
        }
    }
}

export { OrderService };