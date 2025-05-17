import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document{
    id:string;
    name:string;
    email:string;
    orderIds:string;
}