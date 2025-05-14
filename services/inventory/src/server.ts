import mongoose from 'mongoose';
import express from 'express';
//import {errorHandler} from './middleware/errorHandler';
//import {logger} from './middleware/logger';
import { ProductController } from './productController';

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.port;
const mongo_pass = process.env.mongo_password;


mongoose.connect(`mongodb+srv://mlondiemchunu1:${mongo_pass}@cluster0.oveo9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    console.log('Connected to MongoDB for Products service');
}).catch((err) => {
    console.error('Error Connecting to MongoDB ', err);
});


const app = express();
const productController = new ProductController();


//implement middlewares
app.use(express.json());


app.post('/products', productController.createProduct.bind(productController));

app.listen(port, () => {
    console.log(`Products service is running on port ${port}`)
})

