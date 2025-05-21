import express from 'express';
import mongoose from 'mongoose';
import { UserController } from './userController';
require('dotenv').config();

const mongodb_uri = process.env.mongo_uri as string;


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongodb_uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to MongoDB `, error);
        process.exit(1);
    }
}
connectDB();

const app = express();
const port = 3003;

const userController = new UserController();
app.use(express.json());

app.post('/users', userController.createUser.bind(userController));
app.get('/users', userController.getAllUsers.bind(userController));
app.get('/users/:id', userController.getUserById.bind(userController));
app.put('/users/:id', userController.updateUser.bind(userController));

app.listen(port, () => {
    console.log(`User service connected to port ${port}`);
});