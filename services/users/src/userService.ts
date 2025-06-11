const { User, UserModel } = require('./userModel');
import {Kafka} from 'kafkajs';

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
const consumer = kafka.consumer({groupId:'user-group'});
const user = new UserService();

const consumeOrderCreatedEvent = async():Promise<void>=>{
    await consumer.connect();
}


export { UserService };