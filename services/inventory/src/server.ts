const mongoose = require('mongoose');
const express = require('express');
//import {errorHandler} from './middleware/errorHandler';
//import {logger} from './middleware/logger';
const { ProductController } = require('./productController');

const dotenv = require('dotenv');
dotenv.config();
const port = 3001;

const mongo_pass = process.env.mongo_password;
const mongodb_uri = process.env.mongo_uri as string;

mongoose.connect(mongodb_uri).then(() => {
    console.log('Connected to MongoDB for Products service');
}).catch((err:string) => {
    console.error('Error Connecting to MongoDB ', err);
});


const app = express();
const productController = new ProductController();


//implement middlewares
app.use(express.json());


app.post('/products', productController.createProduct.bind(productController));
app.get('/products', productController.getAllProducts.bind(productController));
app.get('/products/:id', productController.getProductById.bind(productController));
app.delete('/products/:id', productController.deleteProduct.bind(productController));
app.put('/products/:id', productController.updateProduct.bind(productController));

app.listen(port, () => {
    console.log(`Products service is running on port ${port}`)
})

