import {Schema, model} from "mongoose";

interface IUser {
    username: string;
    password: string;
    role: string;
    name: string;
    email: string;
    gender: string;
    avatar: string;
    address: string;
    phone: number;
    dateOfBirth: Date;
}

const userSchema = new Schema<IUser>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: false, default: "user"},
    name: {type: String, required: false},
    email: {type: String, required: false},
    gender: {type: String, required: false},
    avatar: {type: String, required: false},
    address: {type: String, required: false},
    phone: {type: Number, required: false},
    dateOfBirth: {type: Date, required: false}
})

const UserModel = model<IUser>('User', userSchema);
export {UserModel};