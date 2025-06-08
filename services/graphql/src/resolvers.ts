import axios from 'axios';
import DataLoader from 'dataloader';
import { User, Order, Product } from './interface'; //import the interfaces



//Dataloader instances to batch and cache requests
const orderLoader = new DataLoader<string, Order[]>(async (userIds: readonly string[]) => {

    try {
        const response = await axios.get(`http://orders-service:3002/orders`, {
            params: { userIds: userIds.join(',') }
        });
        console.log('Order Loader Response:', response.data);
        const orders = response.data || []; //ensure orders is at least an empty array
        return userIds.map(userId => orders.filter((order: Order) => order.userId === userId));

    } catch (error) {
        console.error('Error fetching orders:', error);
        return userIds.map(() => new Error('Error fetching orders'));
    }
})

const productLoader = new DataLoader(async (productIds: readonly string[]) => {
    try {
        const response = await axios.get(`http://inventory-service:3001/products`, {
            params: { ids: productIds.join(',') }
        });
        console.log('Product Loader Response:', response.data);
        const products = response.data || [];
        return productIds.map(productId => products.find((product: Product) => product.id === productId))
    } catch (error) {
        console.error('Error fetching products:', error);
        return productIds.map(() => new Error('Error fetching products'));
    }
});

const userLoader = new DataLoader(async (userIds: readonly string[]) => {
    try {
        const response = await axios.get(`http://users-service:3003/users`, {
            params: { ids: userIds.join(',') }
        });
        console.log('User Loader Response:', response.data);
        const users = response.data || [];
        return userIds.map((userIds => users.filter((user: User) => user.id === userIds)));
    } catch (error) {
        console.error('Error fetching users:', error);
        return userIds.map(() => new Error('Error fetching users'));
    }
});

export const resolvers = {
    Query: {
        user: async (_: any, { id }: { id: string }): Promise<User | { message: string }> => {
            try {
                const userResponse = await axios.get(`http://users-service:3003/users/${id}`);
                const user = userResponse.data;
                if (user) {
                    const orders = await orderLoader.load(user.id);
                    const ordersWithProducts = await Promise.all(orders.map(async (order: Order) => {
                        const products = await productLoader.loadMany(order.id);
                        const nonNullProducts = products
                            .filter((product: Product) => !(product instanceof Error) && product !== null)
                            .map((product: Product) => ({ ...product, id: product.id }));
                        return { ...order, id: order.id, products: nonNullProducts };
                    }));
                    return { ...user, id: user.id, orders: ordersWithProducts };
                } else {
                    return { message: 'User not found' };
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                throw new Error('Error fetching user');
            }
        },
        users: async (): Promise<User[]> => {
            try {
                const response = await axios.get('<http://users-service:3003/users>');
                const users: User[] = response.data;
                if (users && users.length > 0) {
                    return Promise.all(users.map(async (user: User) => {
                        const orders = await orderLoader.load(user.id);
                        const ordersWithProducts = await Promise.all(orders.map(async (order: Order) => {
                            const products = await productLoader.loadMany(order.products);
                            const nonNullProducts = products
                                .filter((product: Product) => !(product instanceof Error) && product !== null)
                                .map((product: Product) => ({ ...product, id: product.id }));
                            return { ...order, id: order.id, products: nonNullProducts };
                        }));
                        return { ...user, id: user.id, orders: ordersWithProducts };
                    }));
                } else {
                    return [];
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                throw new Error('Error fetching users');
            }
        },
        product: async (_: any, { id }: { id: string }): Promise<Product> => {
            const response = await axios.get(`http://inventoy-service:3001/products/ ${id}`);
            return { ...response.data, id: response.data.id };
        },
        products: async (): Promise<Product[]> => {
            const response = await axios.get('<http://inventory-service:3001/products>');
            const orders = response.data;
            if (orders && orders.length > 0) {
                return response.data.map((product: Product) => ({ ...product, id: product.id }));
            } else return [] as Product[];
        },
        //... order query resolvers
    },
    Mutation: {
        createUser: async (_: any, { name, email }: { name: string, email: string }): Promise<User> => {
            const response = await axios.post(`<http://users-service:3003/users>`, { name, email });
            return { ...response.data, id: response.data.id }
        },
        updateUser: async (_: any, { id, name, email }: { id: string, name?: string, email?: string }): Promise<User> => {
            const response = await axios.put(`http://users-service:3003/users/${id}`, { name, email });
            return { ...response.data, id: response.data.id };
        },
        deleteUser: async (_: any, { id }: { id: string }): Promise<boolean> => {
            await axios.delete(`http://users-service:3003/users/${id}`);
            return true;
        },
        createOrder: async (_: any, { userId, productIds }: { userId: string, productIds: string[] }): Promise<Order> => {
            const products = await productLoader.loadMany(productIds);
            //check if products are found and map id to id
            const resolvedProducts = products.map((product: Product) => {
                if (product instanceof Error || !product) {
                    //Handle missing products if necessary
                    console.error('Product not found:', product);
                    throw new Error('Product not found');
                }
                return { ...product, id: product.id };
            });
            //Remove any null products or throw an error if necessary
            const nonNullProducts = resolvedProducts.filter((product: Product) => product !== null);
            //Calculate the total price
            const total = (nonNullProducts as Product[]).reduce((sum, product) => sum + (product?.price || 0), 0);
            //SEnd the order creation request to the order service
            const orderResponse = await axios.post('<http://orders-service:3002/orders>',{
                userId,
                productIds,
                total,
                status: 'pending'
            });
            //Clear the cache for this user's orders after creating a new order
            orderLoader.clear(userId);
            return { ...orderResponse.data, products: nonNullProducts};
        },
        updateOrder: async(_:any,{id,status}:{id:string,status:string}):Promise<Order>=>{
            const response = await axios.put(`http://orders-service:3002/orders/${id}`,{status});
            const products = await productLoader.loadMany(response.data.productIds);
            return { ...response.data,products};
        },
    }
}