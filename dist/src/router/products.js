"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const multer_1 = __importDefault(require("multer"));
const decentralization_1 = require("../middleware/decentralization");
const products = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
products.get('/create', decentralization_1.decentralization, product_controller_1.ProductController.showFromCreate);
products.post('/create', [upload.single("picture"), decentralization_1.decentralization], product_controller_1.ProductController.create);
products.get('/list', product_controller_1.ProductController.list);
products.get('/:id/delete', decentralization_1.decentralization, product_controller_1.ProductController.delete);
products.get('/:id/update', product_controller_1.ProductController.formUpdate);
products.post('/:id/update/', [upload.single("picture"), decentralization_1.decentralization], product_controller_1.ProductController.update);
products.get('/search', product_controller_1.ProductController.search);
products.post('/add-cart', product_controller_1.ProductController.addCart);
products.get('/cart', product_controller_1.ProductController.showCart);
products.get('/', product_controller_1.ProductController.getProductId);
products.get('/:id/skip-product', product_controller_1.ProductController.skipProduct);
products.post('/:id/order', product_controller_1.ProductController.oder);
exports.default = products;
//# sourceMappingURL=products.js.map