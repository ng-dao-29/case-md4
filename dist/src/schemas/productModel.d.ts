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
declare const ProductModel: mongoose.Model<IProduct, {}, {}, {}, any>;
export default ProductModel;
