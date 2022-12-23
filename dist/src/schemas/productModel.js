"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
        default: 0
    },
    producer: {
        type: String,
        required: false
    },
});
const ProductModel = (0, mongoose_1.model)('Product', productSchema);
exports.ProductModel = ProductModel;
//# sourceMappingURL=productModel.js.map