import {Schema, model} from "mongoose";

interface IUser {
    username: string;
    password: string;
    role: string;
    email: string;
    name: string;
    address: string;
    phone: number;
    order: [string];
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: "user"},
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: Number, required: true},
})

const UserModel = model<IUser>('User', userSchema);
export {UserModel};