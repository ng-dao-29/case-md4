import {Router} from "express";
import {Dashboard} from "../controllers/dashboard.controller";
import multer from "multer";
import {decentralization} from "../middleware/decentralization";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname) //+ '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage });

const dashboard = Router();

dashboard.get('/home', Dashboard.showHome);
dashboard.get('/update',Dashboard.formUpdate);
dashboard.post('/update', upload.single("avatar") ,Dashboard.updateUser)
export default dashboard;