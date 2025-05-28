export declare interface User {
    id: string;
    name: string;
    orders: string[];
}

export declare interface Order {
    id: string;
    userId: string;
    products: string[];
    total: number;
    status: string;
}