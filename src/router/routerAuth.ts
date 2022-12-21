import {Router} from "express";
import bodyParser from "body-parser";

const routerAuth = Router();

routerAuth.get('/login', (req, res) => {
    res.render('login');
})

routerAuth.get('/register',(req, res) => {

})

export default routerAuth;