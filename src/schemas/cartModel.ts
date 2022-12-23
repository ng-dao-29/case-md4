import {Schema, model} from "mongoose";
import {IProduct} from "./productModel";

export interface ICart {
    name: string;
    products: IProduct[]
}

const cartSchema = new Schema<ICart>({
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

export const CartModel = model<ICart>('Cart', cartSchema);
