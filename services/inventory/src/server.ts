import mongoose from 'mongoose';
import express from 'express';
//import {errorHandler} from './middleware/errorHandler';
//import {logger} from './middleware/logger';
import { ProductController } from './productController';

const dotenv = require('dotenv');
dotenv.config();
const port = 3000;

const mongo_pass = process.env.mongo_password;
const mongodb_uri = process.env.mongo_uri as string;


mongoose.connect(mongodb_uri).then(() => {
    console.log('Connected to MongoDB for Products service');
}).catch((err) => {
    console.error('Error Connecting to MongoDB ', err);
});


const app = express();
const productController = new ProductController();


//implement middlewares
app.use(express.json());


app.post('/products', productController.createProduct.bind(productController));
app.get('/products', productController.getAllProducts.bind(productController));

app.get('/products/:id', async (req: Request, res: Response) => {
    try {
      await productController.getProductById(req, res);
    } catch (error) {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  });

//app.delete('/products/:id',productController.deleteProduct.bind(productController));
//app.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));

app.listen(port, () => {
    console.log(`Products service is running on port ${port}`)
})

