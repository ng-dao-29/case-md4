import {Router} from "express";
import {ProductCTL} from "../controllers/product.Controller";
import multer from "multer";
import passport from "passport";
const routerAdmin = Router();

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

routerAdmin.get('/product/create', (req, res) => {
    res.render('createProductTest');
})

routerAdmin.post('/product/create', upload.single("picture"),(req, res) => {
    ProductCTL.create(req, res).catch(err => {err.message})
})

routerAdmin.get('/product/list', (req, res) => {
    ProductCTL.list(req, res).catch(err => {err.message})
})

routerAdmin.get('/product/delete/:id', (req, res) => {
    ProductCTL.delete(req,res).catch(err => console.log(err.message));
})

routerAdmin.get('/product/update/:id', (req, res) => {
    ProductCTL.formUpdate(req,res).catch(err => console.log(err.message));
})

routerAdmin.post('/product/update/:id', upload.single("picture"), (req, res) => {
    ProductCTL.update(req, res).catch(err => console.log(err.message));
})

export default routerAdmin;