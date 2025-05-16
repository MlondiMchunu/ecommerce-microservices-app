import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { OrderEntity } from './orderModel';
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.db_host || 'localhost',
    port: parseInt(process.env.db_port || '5432'),
    username: process.env.db_username || 'postgres',
    password: process.env.db_password ,
    database: process.env.dbname,
    synchronize: true,
    logging: false,
    entities: [OrderEntity],
    migrations: [],
    subscribers: [],
});


