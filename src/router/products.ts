import {Router} from "express";
import {ProductController} from "../controllers/product";
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

const upload = multer({ storage: storage })

products.get('/create',ProductController.showFromCreate)


products.post('/create',upload.single("picture"), ProductController.create)

products.get('/list', ProductController.list)

products.get('/:id/delete', ProductController.delete)

products.get('/:id/update', ProductController.formUpdate)

products.post('/:id/update/', upload.single("picture"), ProductController.update)

products.get('/search', ProductController.search)



export default products;