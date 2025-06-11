const { User, UserModel } = require('./userModel');
import { Kafka } from 'kafkajs';

class UserService {
    async createUser(user: typeof User): Promise<typeof User> {
        const newUser = new UserModel(user);
        return await newUser.save();
    }
    async getAllUsers(): Promise<typeof User[] | null> {
        return await UserModel.find().exec();
    }
    async getUserById(id: string): Promise<typeof User | null> {
        return await UserModel.findById(id).exec();
    }
    async updateUser(id: string, updatedData: Partial<typeof User>): Promise<typeof User> {
        return await UserModel.findByIdAndUpdate(id, updatedData, { new: true }).exec();
    }
    async deleteUser(id: string): Promise<boolean> {
        const result = await UserModel.findByIdAndDelete(id).exec();
        return result !== null;
    }
}


const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['kafka:9092'],
});
//groups allow multiple consumers to collaborate on processing messages from a topic
const consumer = kafka.consumer({ groupId: 'user-group' });
const userService = new UserService();

const consumeOrderCreatedEvent = async (): Promise<void> => {
    await consumer.connect();
    /*Subscribe to the 'order-created' topic.fromBeginning: true` means 
    start reading from the earliest message if no offset is committed*/
    await consumer.subscribe({ topic: 'order-created', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ message }) => {
            const decodedMessage = message.value?.toString();
            console.log(`Consumed message:`, decodedMessage);

            try {
                const order = JSON.parse(decodedMessage || '{}');
                if (order.userId && order.id) {
                    await userService.addOrderToUser(order.userId && order.id);
                } else {
                    console.warn('Invalid message: missing userId or orderId', order);
                }
            } catch (error) {
                console.error('Failed to process message : ', error);
            }
        }
    })

}


export { UserService, consumeOrderCreatedEvent };