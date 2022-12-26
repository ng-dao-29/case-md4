import {Schema} from "mongoose";
import * as mongoose from "mongoose";

export interface IProduct {
    name: string;
    price: number;
    category: string;
    description: string;
    picture: string;
    quantity: number;
    producer: string;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        unique: true,
        required: [true, 'name must be entered']
    },
    price: {
        type: Number,
        required: [true, 'price must be entered']
    },
    category: {
        type: String,
        required: [true, 'Category must be entered']
    },
    description: {
        type: String,
        required: false},
    picture: {
        type: String,
        required: [true, 'picture must be entered']
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    producer: {
        type: String,
        required: true,
        default : "no manufacturer"
    },
})

const ProductModel = mongoose.model<IProduct>('Product', productSchema);
export {ProductModel}