import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { OrderEntity } from './orderModel';
require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.db_host || "localhost",
    port: parseInt(process.env.db_port || '5432'),
    username: process.env.db_username || 'postgres',
    password: process.env.db_password || 'postgres',
    database: process.env.dbname,
    synchronize: true,
    logging: true,
    entities: [OrderEntity],
    migrations: [],
    subscribers: [],
});

//initialize the connection and handle errors
AppDataSource.initialize()
    .then(() => console.log(`Order service DB connected succesfully`))
    .catch((error) => console.log(`Order service database connection error`, error));