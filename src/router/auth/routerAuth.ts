import {Router} from "express";
import multer from "multer";
import {Auth} from "../../controllers/auth.Controller";
import passport from "../../middleware/authPassport";

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

const routerAuth = Router();


routerAuth.get('/login', Auth.formLogin)
routerAuth.post('/login', [upload.none(),  passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/auth/login'
})]);

routerAuth.get('/register',Auth.formRegister)
routerAuth.post('/register',upload.none(),Auth.register)

routerAuth.get('/logout', Auth.logOut)
export default routerAuth;