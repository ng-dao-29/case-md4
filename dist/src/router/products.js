"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const multer_1 = __importDefault(require("multer"));
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
products.get('/create', product_1.ProductController.showFormCreate);
products.post('/create', upload.single("picture"), product_1.ProductController.create);
products.get('/list', product_1.ProductController.list);
products.get('/:id/delete', product_1.ProductController.delete);
products.get('/:id/update', product_1.ProductController.formUpdate);
products.post('/:id/update/', upload.single("picture"), product_1.ProductController.update);
exports.default = products;
//# sourceMappingURL=products.js.map