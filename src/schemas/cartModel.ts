import {Schema, model} from "mongoose";

// export interface ICart {
//     user: object;
//     products: [object];
// }
//
// const cartSchema = new Schema<ICart>({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: "user"
//     },
//     products: [{
//         type: Schema.Types.ObjectId,
//         ref: "Products"
//     }]
// })
//
//
//
// const CartModel = model<ICart>('cart', cartSchema);
// export {CartModel}


const cartSchema = new Schema({
    items: [
        {
            products: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },

            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],

    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
});

const CartModel = model("cart", cartSchema);
export {CartModel}