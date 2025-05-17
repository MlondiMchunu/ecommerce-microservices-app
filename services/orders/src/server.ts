import 'reflect-metadata';
const express = require('express');
const { OrderController } = require('./orderController');
const { AppDataSource } = require('./data-source');

const port = 3002;

const app = express();
const orderController = new OrderController();

app.use(express.json());

app.post('/orders', orderController.createOrder.bind(orderController));
app.get('/orders', orderController.getAllOrders.bind(orderController));
app.get('/orders/:id', orderController.getOrderById.bind(orderController));
app.put('/orders/:id', orderController.updateOrderStatus.bind(orderController));


//initialize the connection and handle errors
AppDataSource.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Orders service is running on port ${port}`)
        });
    })
    .then(() => {
        console.log(`Order service DB connected succesfully`);
    })
    .catch((error: Error) => console.log(`Order service database connection error`, error));
