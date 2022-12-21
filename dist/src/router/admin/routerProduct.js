"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_Controller_1 = require("../../controllers/product.Controller");
const multer_1 = __importDefault(require("multer"));
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
routerProduct.post('/create', upload.single("picture"), (req, res) => {
    product_Controller_1.ProductCTL.create(req, res).catch(err => { err.message; });
});
routerProduct.get('/list', (req, res) => {
    product_Controller_1.ProductCTL.list(req, res).catch(err => { err.message; });
});
routerProduct.get('/delete/:id', (req, res) => {
    product_Controller_1.ProductCTL.delete(req, res).catch(err => console.log(err.message));
});
routerProduct.get('/update/:id', (req, res) => {
    product_Controller_1.ProductCTL.formUpdate(req, res).catch(err => console.log(err.message));
});
routerProduct.post('/update/:id', upload.single("picture"), (req, res) => {
    product_Controller_1.ProductCTL.update(req, res).catch(err => console.log(err.message));
});
routerProduct.post('/');
exports.default = routerProduct;
//# sourceMappingURL=routerProduct.js.map