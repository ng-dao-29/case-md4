import {Router} from "express";
import {ProductCTL} from "../../controllers/product.Controller";
import multer from "multer";
import express from "express";

import passport from "passport";
const routerProduct = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname) //+ '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

routerProduct.get('/create', (req, res) => {
    res.render('products/productCreate');
})

routerProduct.post('/create', upload.single("picture"),(req, res) => {
    ProductCTL.create(req, res).catch(err => {err.message})
})

routerProduct.get('/list', (req, res) => {
    ProductCTL.list(req, res).catch(err => {err.message})
})

routerProduct.get('/delete/:id', (req, res) => {
    ProductCTL.delete(req,res).catch(err => console.log(err.message));
})

routerProduct.get('/update/:id', (req, res) => {
    ProductCTL.formUpdate(req,res).catch(err => console.log(err.message));
})

routerProduct.post('/update/:id', upload.single("picture"), (req, res) => {
    ProductCTL.update(req, res).catch(err => console.log(err.message));
})

// routerProduct.get('/search',(req, res) => {
//     ProductCTL.search(req, res).catch()
// })

routerProduct.post('/')

export default routerProduct;