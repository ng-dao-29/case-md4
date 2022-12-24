"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productModel_1 = require("../schemas/productModel");
const userModel_1 = require("../schemas/userModel");
const categoryModel_1 = require("../schemas/categoryModel");
class ProductController {
    static async showFromCreate(req, res, next) {
        try {
            const dataUser = await userModel_1.UserModel.findOne({ _id: req.user._id });
            let category = await categoryModel_1.CategoryModel.find();
            let errors = req.flash('errors');
            console.log(errors);
            res.render('products/create', {
                errors: errors,
                category: category,
                user: dataUser
            });
        }
        catch (e) {
            next(e);
        }
    }
    static async create(req, res) {
        try {
            let category = await categoryModel_1.CategoryModel.find();
            let productNew = new productModel_1.ProductModel({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description,
                picture: req.file.originalname,
                quantity: req.body.quantity,
                producer: req.body.producer
            });
            await productNew.save();
            res.redirect('/admin/product/list');
        }
        catch (e) {
            let messageValidation = {
                name: e.errors['name'].message,
                price: e.errors['price'].message,
                category: e.errors['category'].message
            };
            console.log(messageValidation);
            req.flash('errors', messageValidation);
            res.redirect('/admin/product/create');
        }
    }
    static async list(req, res) {
        try {
            const dataUser = await userModel_1.UserModel.findOne({ _id: req.user._id });
            let products = await productModel_1.ProductModel.find();
            if (products) {
                console.log(products);
                res.render('products/list', {
                    products: products,
                    user: dataUser
                });
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
                res.redirect('/admin/product/list');
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
        try {
            const dataUser = await userModel_1.UserModel.findOne({ _id: req.user._id });
            let category = await categoryModel_1.CategoryModel.find();
            let product = await productModel_1.ProductModel.findOne({ _id: req.params.id });
            res.render('products/update', {
                product: product,
                category: category,
                user: dataUser
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }
    static async update(req, res) {
        try {
            let picture = "";
            let product = await productModel_1.ProductModel.findOne({ _id: req.params.id });
            if (req.file) {
                picture = req.file.originalname;
            }
            else {
                picture = product.picture;
            }
            product.name = req.body.name;
            product.price = req.body.price;
            product.category = req.body.category;
            product.description = req.body.description;
            product.picture = picture;
            product.quantity = req.body.quantity;
            product.producer = req.body.producer;
            await product.save();
            res.redirect('/admin/product/list');
        }
        catch (err) {
            console.log(err.message);
            res.redirect('/error/500');
        }
    }
    static async search(req, res, next) {
        try {
            let products = await productModel_1.ProductModel.find({
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
            let product = await productModel_1.ProductModel.findOne({
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
//# sourceMappingURL=product.js.map