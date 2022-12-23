import ProductModel from "../schemas/productModel";
import {UserModel} from "../schemas/userModel";


export class ProductController {


    static async showFromCreate(req, res, next) {
        try {
            let errors = req.flash('errors');
            console.log(errors)
            res.render('products/create', {
                errors: errors
            });
        } catch (e) {
            next(e)
        }
    }

    static async create(req, res) {
        console.log(req.body)
        try {
            let productNew = new ProductModel({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                description: req.body.description,
                picture: req.file.originalname,
                quantity: req.body.quantity,
                producer: req.body.producer
            });
            await productNew.save();
            res.redirect('/admin/product/list')
        } catch (e) {

            let messageValidation = {
                name: e.errors['name'].message,
                price: e.errors['price'].message,
                // picture: e.errors['picture'].message,
                category: e.errors['category'].message

            }
            console.log(messageValidation)
            req.flash('errors', messageValidation)
            res.redirect('/admin/product/create')
        }
    }

    static async list(req, res) {
        try {
            console.log(req.user)
            let products = await ProductModel.find();
            if (products) {
                console.log(products);
                res.render('products/list', {products: products});
            }
        } catch (err) {
            console.log(err.message)
            res.redirect('/error/500')
        }
    }


    static async delete(req, res) {
        console.log(req.params.id)
        try {
            let product = await ProductModel.findOne({_id: req.params.id});
            if (product) {
                await product.remove();

                res.redirect('/admin/product/list')
            } else {
                //thêm chuyển qua list và thêm message err
                res.send('error: product does not exist')
            }
        } catch (err) {
            console.log(err.message)
            res.redirect('/error/500')
        }
    }

    static async formUpdate(req, res) {
        console.log(req.params.id)
        try {
            let product = await ProductModel.findOne({_id: req.params.id});

                res.render('products/update', {product: product})

        } catch (err) {
            console.log(err.message)

        }
    }

    static async update(req, res) {
        try {
            let product = await ProductModel.findOne({_id: req.params.id});
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
                    res.redirect('/admin/product/list')
                } else {
                    res.send("update err")
                }
            } else {
                res.send('error: product does not exist');
            }
        } catch (err) {
            console.log(err.message)
            res.redirect('/error/500');
        }

    }
    static async search(req, res, next) {
        try {
            let products = await ProductModel.find(
                {
                    name: {$regex: req.query.keyword, $options: 'i'}
                }
            )

            res.status(200).json(products)
        } catch (e) {
            res.json({
                'error': e.message
            })
        }

    }
    static async addToCart(req, res) {
        const {productId} = req.body
        try {
            let product = await ProductModel.findOne(
                {
                    _id: productId
                }
            )
            if (product) {
                const newUser = new UserModel({})

                newUser.carts.push(product)
                await newUser.save()
            } else {
                res.status(400).json({
                    'error': 'Cant find product'
                })
            }

            res.status(200).json()
        } catch (e) {
            res.json({
                'error': e.message
            })
        }

    }
}