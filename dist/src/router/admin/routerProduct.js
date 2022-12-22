"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_Controller_1 = require("../../controllers/product.Controller");
const multer_1 = __importDefault(require("multer"));
const decentralization_1 = require("../../middleware/decentralization");
const routerProduct = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
routerProduct.get('/create', (req, res) => {
    res.render('products/productCreate');
});
routerProduct.post('/create', upload.single("picture"), product_Controller_1.ProductCTL.create);
routerProduct.get('/list', product_Controller_1.ProductCTL.list);
routerProduct.get('/delete/:id', decentralization_1.decentralization, product_Controller_1.ProductCTL.delete);
routerProduct.get('/update/:id', decentralization_1.decentralization, product_Controller_1.ProductCTL.formUpdate);
routerProduct.post('/update/:id', upload.single("picture"), decentralization_1.decentralization, product_Controller_1.ProductCTL.update);
exports.default = routerProduct;
//# sourceMappingURL=routerProduct.js.map