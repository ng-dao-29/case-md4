"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_Controller_1 = require("../controllers/product.Controller");
const multer_1 = __importDefault(require("multer"));
const routerAdmin = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
routerAdmin.get('/product/create', (req, res) => {
    res.render('createProductTest');
});
routerAdmin.post('/product/create', upload.single("picture"), (req, res) => {
    product_Controller_1.ProductCTL.create(req, res).catch(err => { err.message; });
});
routerAdmin.get('/product/list', (req, res) => {
    product_Controller_1.ProductCTL.list(req, res).catch(err => { err.message; });
});
routerAdmin.get('/product/delete/:id', (req, res) => {
    product_Controller_1.ProductCTL.delete(req, res).catch(err => console.log(err.message));
});
routerAdmin.get('/product/update/:id', (req, res) => {
    product_Controller_1.ProductCTL.formUpdate(req, res).catch(err => console.log(err.message));
});
routerAdmin.post('/product/update/:id', upload.single("picture"), (req, res) => {
    product_Controller_1.ProductCTL.update(req, res).catch(err => console.log(err.message));
});
exports.default = routerAdmin;
//# sourceMappingURL=routerProduct.js.map