"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productModel_1 = require("../schemas/productModel");
const userModel_1 = require("../schemas/userModel");
const categoryModel_1 = require("../schemas/categoryModel");
const cartModel_1 = require("../schemas/cartModel");
class ProductController {
    static async showFromCreate(req, res) {
        try {
            let message = req.flash('errName');
            const dataUser = await userModel_1.UserModel.findOne({ _id: req.user._id });
            let category = await categoryModel_1.CategoryModel.find();
            let errors = req.flash('errors');
            console.log();
            console.log(errors);
            res.render('products/create', {
                errors: errors,
                category: category,
                user: dataUser,
                errName: message
            });
        }
        catch (err) {
            console.log(err.message);
            res.redirect('/error/500');
        }
    }
    static async create(req, res) {
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
                    producer: req.body.producer,
                });
                productNew.save();
                req.flash("massage", "successfully added product");
                return res.redirect('/admin/product/list');
            }
            req.flash("errName", "product already exists");
            res.redirect('/admin/product/create');
        }
        catch (err) {
            res.redirect('/error/500');
        }
    }
    static async list(req, res) {
        try {
            let message = req.flash('message');
            const dataUser = await userModel_1.UserModel.findOne({ _id: req.user._id });
            let products = await productModel_1.ProductModel.find();
            if (products) {
                res.render('products/list', {
                    products: products,
                    user: dataUser,
                    message: message
                });
            }
        }
        catch (err) {
            console.log(err.message);
            res.redirect('/error/500');
        }
    }
    static async delete(req, res) {
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
            console.log(products);
            res.status(200).json({ data: products });
        }
        catch (e) {
            res.json({
                'error': e.message
            });
        }
    }
    static async getProductId(req, res) {
        try {
            let product = await productModel_1.ProductModel.findOne({ _id: req.query.id, });
            res.status(200).json({ data: product });
        }
        catch (e) {
            res.json({
                'error': e.message
            });
        }
    }
    static async addCart(req, res) {
        try {
            let produc = req.body.product.data;
            let quantity = req.body.quantity;
            let cart = await cartModel_1.CartModel.findOne({ user: req.user._id });
            if (!cart) {
                cart = new cartModel_1.CartModel({
                    items: [],
                    user: req.user._id,
                });
                await cart.save();
            }
            let productExist = true;
            console.log(cart.items.length);
            for (let i = 0; i < cart.items.length; i++) {
                console.log(cart.items[i]);
                if (cart.items[i].products.toString() === produc._id) {
                    cart.items[i].quantity += quantity;
                    productExist = false;
                    break;
                }
            }
            let productSave = {
                products: produc._id,
                quantity: quantity,
            };
            if (productExist) {
                cart.items.push(productSave);
            }
            let checkSave = await cart.save();
            if (checkSave) {
                res.status(200).json(cart);
            }
            else {
                res.statusCode(500);
            }
        }
        catch (err) {
            console.log(err);
            res.statusCode(500);
        }
    }
    static async showCart(req, res) {
        try {
            let user = req.user;
            let cartData = await cartModel_1.CartModel.findOne({ user: req.user._id }).populate("items.products");
            let itemsData = cartData.items;
            res.render("products/cart", {
                datas: itemsData,
                user: user
            });
        }
        catch (err) {
            console.log(err.message);
            res.redirect('/error/500');
        }
    }
    static async skipProduct(req, res) {
        try {
            let user = req.user;
            let product = await productModel_1.ProductModel.findOne({ _id: req.params.id });
            let cart = await cartModel_1.CartModel.findOne({ user: user._id }).populate("items.products");
            for (let i = 0; i < cart.items.length; i++) {
                if (cart.items[i].products.toString() == product.toString()) {
                    cart.items.splice(i, 1);
                }
            }
            await cart.save();
            res.redirect(`/${user.role}/product/cart`);
        }
        catch (err) {
            console.log(err.message);
            res.redirect('/error/500');
        }
    }
    static async oder(req, res) {
        let user = req.user;
        let cartId = req.params.id;
        let cart = cartModel_1.CartModel.findOne({ _id: cartId });
        console.log(cart);
        res.redirect(`/${user.role}/product/cart`);
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map