import 'reflect-metadata';
const express = require('express');
const { OrderController } = require('./orderController');
var { AppDataSource } = require('./data-source');

const port = 3002;

const app = express();
const orderController = new OrderController();

app.use(express.json());

app.post('/orders', orderController.createOrder.bind(orderController));


AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Orders service is running on port ${port}`)
        });
    })
    .catch((error: Error) => console.log('Error during data Source initialization', error));
