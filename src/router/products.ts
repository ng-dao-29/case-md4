import {Router} from "express";
import {ProductController} from "../controllers/product.controller";
import multer from "multer";
import {decentralization} from "../middleware/decentralization";

const products = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname) //+ '-' + uniqueSuffix)
    }
})

const upload = multer({storage: storage})

products.get('/create', decentralization, ProductController.showFromCreate)

products.post('/create', [upload.single("picture"), decentralization], ProductController.create)

products.get('/list', ProductController.list)

products.get('/:id/delete', decentralization, ProductController.delete)

products.get('/:id/update', ProductController.formUpdate)

products.post('/:id/update/', [upload.single("picture"), decentralization], ProductController.update)

products.get('/search', ProductController.search);

products.post('/add-cart', ProductController.addCart);

products.get('/cart', ProductController.showCart);

products.get('/',ProductController.getProductId)
products.get('/:id/skip-product', ProductController.skipProduct);

products.post('/:id/order', ProductController.oder);

export default products;