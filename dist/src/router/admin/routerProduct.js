"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../../controllers/product.controller");
const multer = require("multer");
const path = require("path");
const routerProduct = (0, express_1.Router)();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(path.join(__dirname, '/public/upload'));
        cb(null, './public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
routerProduct.get('/create', product_controller_1.ProductController.showFromCreate);
routerProduct.post('/create', upload.single("picture"), (req, res) => {
    product_controller_1.ProductController.create(req, res).catch(err => {
        err.message;
    });
});
routerProduct.get('/', (req, res) => {
    product_controller_1.ProductController.list(req, res).catch(err => {
        err.message;
    });
});
routerProduct.get('/:id/delete', (req, res) => {
    product_controller_1.ProductController.delete(req, res).catch(err => console.log(err.message));
});
routerProduct.get('/:id/update', (req, res) => {
    product_controller_1.ProductController.formUpdate(req, res).catch(err => console.log(err.message));
});
routerProduct.post('/:id/update', upload.single("picture"), (req, res) => {
    product_controller_1.ProductController.update(req, res).catch(err => console.log(err.message));
});
routerProduct.get('/search', product_controller_1.ProductController.search);
routerProduct.post('/');
routerProduct.post('/addToCart', (req, res) => {
    product_controller_1.ProductController.addToCart(req, res).catch(err => console.log(err.message));
});
exports.default = routerProduct;
//# sourceMappingURL=routerProduct.js.map