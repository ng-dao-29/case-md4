import {Schema, model} from "mongoose";

interface IProduct {
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
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false,
        default: 0},
    producer: {
        type: String,
        required: false
    },
})

const ProductModel = model<IProduct>('Product', productSchema);
export {ProductModel};