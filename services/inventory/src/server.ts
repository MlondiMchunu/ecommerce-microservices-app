import mongoose from 'mongoose';
import express from 'express';
//import {errorHandler} from './middleware/errorHandler';
//import {logger} from './middleware/logger';
//import {ProductController} from './productController';


mongoose.connect("mongodb+srv://mlondiemchunu1:Maxingwane12@cluster0.oveo9.mongodb.net/?retryWrites=true&w=majority&ecommerce=Cluster0").then(() => {
    console.log('Connected to MongoDB for Products service');
}).catch((err) => {
    console.error('Error Connecting to MongoDB ', err);
});

const app = express();
const port = 3000;

//implement middlewares
app.use(express.json());

app.listen(port, () => {
    console.log(`Products service is running on port ${port}`)
})
