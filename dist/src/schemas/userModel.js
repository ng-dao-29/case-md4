"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
    avatar: {
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
    carts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }],
    birthday: {
        type: String,
        required: false
    }
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=userModel.js.map