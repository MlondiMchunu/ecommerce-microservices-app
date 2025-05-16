import {Request,Response} from 'express';
const {OrderService} = require('./orderService');


class OrderController{
private orderService = new OrderService();
}