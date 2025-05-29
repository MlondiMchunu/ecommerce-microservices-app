import axios from 'axios';
import DataLoader from 'dataloader';
import { User, Order, Product } from './interface'; //import the interfaces



//Dataloader instances to batch and cache requests
const orderLoader = new DataLoader<string, Order[]>(async (userIds: readonly string[]) => {

    try {
        const response = await axios.get(`http://orders-service:3002`, {
            params: { userIds: userIds.join(',') }
        });
        console.log('Order Loader Response:', response.data);
        const orders = response.data || [];
        return userIds.map(userId => orders.filter((order: Order)=> order.userId === userId));

    }catch(error){
        console.error('Error fetching orders:', error);
        return userIds.map(()=> new Error('Error fetching orders'));
    }
})