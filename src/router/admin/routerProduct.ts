import {Router} from "express";
import {ProductController} from "../../controllers/product.controller";

const multer = require("multer");
const path = require("path");

const routerProduct = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(path.join(__dirname, '/public/upload'))
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

routerProduct.get('/create', ProductController.showFromCreate);

routerProduct.post('/create', upload.single("picture"), (req, res) => {
    ProductController.create(req, res).catch(err => {
        err.message
    })
})

routerProduct.get('/', (req, res) => {
    ProductController.list(req, res).catch(err => {
        err.message
    })
})

routerProduct.get('/:id/delete', (req, res) => {
    ProductController.delete(req, res).catch(err => console.log(err.message));
})

routerProduct.get('/:id/update', (req, res) => {
    ProductController.formUpdate(req, res).catch(err => console.log(err.message));
})

routerProduct.post('/:id/update', upload.single("picture"), (req, res) => {
    ProductController.update(req, res).catch(err => console.log(err.message));
})
routerProduct.get('/search', ProductController.search);

routerProduct.post('/')

routerProduct.post('/addToCart', (req, res) => {
    ProductController.addToCart(req, res).catch(err => console.log(err.message));
})

export default routerProduct;