import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    id: string;
    name: string;
    email: string;
    orderIds: string;
}

const UserSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
})

export const UserModel = mongoose.model('User', UserSchema);