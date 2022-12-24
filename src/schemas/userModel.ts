import {Schema, model} from "mongoose";
import {ICart} from "./cartModel";
import {IProduct} from "./productModel";

interface IUser {
    username: string;
    password: string;
    role: string;
    email: string;
    name: string;
    avatar: string;
    address: string;
    phone: number;
    gender: string;
    order: [string];
    carts: IProduct[];
    birthday: string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    name: {
        type: String,

        required: false
    },
    avatar:{
        type: String,
        required: false,
        default: 'avatar-default.jpg',
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    carts: [{type: Schema.Types.ObjectId, ref: 'Product'}],

    birthday: {
        type: String,
        required: false
    }

})

const UserModel = model<IUser>('User', userSchema);
export {UserModel};