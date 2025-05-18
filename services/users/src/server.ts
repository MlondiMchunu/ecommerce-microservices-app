import express from 'express';
import mongoose from 'mongoose';
require('dotenv').config();

const app = express();
const port = 3003;

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


app.use(express.json());

app.listen(port, () => {
    console.log(`User service connected to port ${port}`);
});