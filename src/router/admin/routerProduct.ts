import {Router} from "express";
import {ProductCTL} from "../../controllers/product.Controller";
import multer from "multer";
import {decentralization} from "../../middleware/decentralization";

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


routerProduct.post('/create',upload.single("picture"), ProductCTL.create)

routerProduct.get('/list', ProductCTL.list)

routerProduct.get('/delete/:id', decentralization, ProductCTL.delete)

routerProduct.get('/update/:id', decentralization, ProductCTL.formUpdate)

routerProduct.post('/update/:id', upload.single("picture"), decentralization, ProductCTL.update)

// routerProduct.get('/search',(req, res) => {
//     ProductCTL.search(req, res).catch()
// })

export default routerProduct;