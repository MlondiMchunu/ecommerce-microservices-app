import mongoose from 'mongoose';
import express from 'express';
//import {errorHandler} from './middleware/errorHandler';
//import {logger} from './middleware/logger';
//import {ProductController} from './productController';

const app = express();
const port = 3000;

//implement middlewares
app.use(express.json());

app.listen(port, () => {
    console.log(`Products service is running on port ${port}`)
})
