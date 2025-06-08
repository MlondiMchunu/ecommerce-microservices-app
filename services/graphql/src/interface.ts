export declare interface User {
    id: string;
    name: string;
    email: string;
    orders: string[];
}

export declare interface Order {
    id: string;
    userId: string;
    products: string[];
    total: number;
    status: string;
}

export declare interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}