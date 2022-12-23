"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productModel_1 = require("../schemas/productModel");
class ProductController {
    static showFormCreate(req, res) {
        res.render('products/create');
    }
    static async create(req, res) {
        try {
            let productNew = new productModel_1.ProductModel({
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
            }
        }
        catch (err) {
            console.log(err.message);
            res.redirect('/error/500');
        }
    }
    static async list(req, res) {
        try {
            console.log(req.user);
            let products = await productModel_1.ProductModel.find();
            if (products) {
                console.log(products);
                res.render('products/list', { products: products });
            }
        }
        catch (err) {
            console.log(err.message);
            res.redirect('/error/500');
        }
    }
    static async delete(req, res) {
        console.log(req.params.id);
        try {
            let product = await productModel_1.ProductModel.findOne({ _id: req.params.id });
            if (product) {
                await product.remove();
                res.redirect('/product/product/list');
            }
            else {
                res.send('error: product does not exist');
            }
        }
        catch (err) {
            console.log(err.message);
            res.redirect('/error/500');
        }
    }
    static async formUpdate(req, res) {
        console.log(req.params.id);
        try {
            let product = await productModel_1.ProductModel.findOne({ _id: req.params.id });
            if (product) {
                res.render('products/update', { product: product });
            }
            else {
                res.send('error: product does not exist');
            }
        }
        catch (err) {
            console.log(err.message);
            res.redirect('/error/500');
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
            console.log(err.message);
            res.redirect('/error/500');
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.js.map