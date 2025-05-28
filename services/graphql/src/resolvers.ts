import axios from axios;
import DataLoader from 'dataloader';
import {User, Order, Product} from './interface';



//Dataloader instances to batch and cache requests
const orderLoader = new DataLoader<string, Order[]>(async(userIds: readonly string[])=>{

})