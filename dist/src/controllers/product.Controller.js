"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productModel_1 = __importDefault(require("../schemas/productModel"));
const userModel_1 = require("../schemas/userModel");
class ProductController {
    static async showFromCreate(req, res, next) {
        try {
            let errors = req.flash('errors');
            console.log(errors);
            res.render('products/create', {
                errors: errors
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async create(req, res) {
        console.log(req.body);
        try {
            let productNew = new productModel_1.default({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description,
                picture: 'dfdsfdsf',
                quantity: req.body.quantity,
                producer: req.body.producer
            });
            await productNew.save();
            res.redirect('/admin/products');
        }
        catch (e) {
            let messageValidation = {
                name: e.errors['name'].message,
                price: e.errors['price'].message,
                category: e.errors['category'].message
            };
            console.log(messageValidation);
            req.flash('errors', messageValidation);
            res.redirect('/admin/products/create');
        }
    }
    static async list(req, res) {
        try {
            let products = await productModel_1.default.find();
            if (products) {
                console.log(products);
                res.render('products/list', { products: products });
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
            let product = await productModel_1.default.findOne({ _id: req.params.id });
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
            let product = await productModel_1.default.findOne({ _id: req.params.id });
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
            let product = await productModel_1.default.findOne({ _id: req.params.id });
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
    static async search(req, res, next) {
        try {
            let products = await productModel_1.default.find({
                name: { $regex: req.query.keyword, $options: 'i' }
            });
            res.status(200).json(products);
        }
        catch (e) {
            res.json({
                'error': e.message
            });
        }
    }
    static async addToCart(req, res) {
        const { productId } = req.body;
        try {
            let product = await productModel_1.default.findOne({
                _id: productId
            });
            if (product) {
                const newUser = new userModel_1.UserModel({});
                newUser.carts.push(product);
                await newUser.save();
            }
            else {
                res.status(400).json({
                    'error': 'Cant find product'
                });
            }
            res.status(200).json();
        }
        catch (e) {
            res.json({
                'error': e.message
            });
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map