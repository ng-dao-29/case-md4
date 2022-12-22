"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCTL = void 0;
const productModel_1 = require("../schemas/productModel");
class ProductCTL {
    static async create(req, res) {
        console.log(req.file.originalname);
        console.log(req.body);
        console.log(req);
        try {
            let productNew = await productModel_1.ProductModel.findOne({ name: req.body.name });
            if (!productNew) {
                productNew = new productModel_1.ProductModel({
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category,
                    description: req.body.description,
                    picture: req.file.originalname,
                    quantity: req.body.quantity,
                    producer: req.body.producer
                });
                const product = await productNew.save();
                if (product) {
                    res.redirect('/admin/product/list');
                }
                else {
                    res.send('create product error');
                }
            }
            else {
                res.send('product already exists');
            }
        }
        catch (err) {
            console.log(err.message);
            res.send('500');
        }
    }
    static async list(req, res) {
        try {
            let products = await productModel_1.ProductModel.find();
            if (products) {
                console.log(products);
                res.render('products/productList', { products: products });
            }
        }
        catch (err) {
            console.log(err.message);
            res.send('500');
        }
    }
    static async delete(req, res) {
        console.log(req.params.id);
        try {
            let product = await productModel_1.ProductModel.findOne({ _id: req.params.id });
            if (product) {
                await product.remove();
                res.redirect('/admin/product/list');
            }
            else {
                res.send('error: product does not exist');
            }
        }
        catch (err) {
            console.log(err.message);
            res.send('500');
        }
    }
    static async formUpdate(req, res) {
        console.log(req.params.id);
        try {
            let product = await productModel_1.ProductModel.findOne({ _id: req.params.id });
            if (product) {
                res.render('products/productUpdate', { product: product });
            }
            else {
                res.send('error: product does not exist');
            }
        }
        catch (err) {
            res.send('err: ' + err.message);
        }
    }
    static async update(req, res) {
        console.log(req.body);
        console.log(req.params.id);
        console.log(req.fresh.originalname);
        try {
            let product = await productModel_1.ProductModel.findOne({ _id: req.params.id });
            if (product) {
                product.name = req.body.name;
                product.price = req.body.price;
                product.category = req.body.category;
                product.description = req.body.description;
                product.picture = req.file.originalname;
                product.quantity = req.body.quantity;
                product.producer = req.body.producer;
                await product.save();
                if (product) {
                    res.redirect('/admin/product/list');
                }
                else {
                    res.send("update err");
                }
            }
            else {
                res.send('error: product does not exist');
            }
        }
        catch (err) {
            res.send('error: ' + err.message);
        }
    }
}
exports.ProductCTL = ProductCTL;
//# sourceMappingURL=product.Controller.js.map