import express from "express";
const bodyParser = require("body-parser");
import * as mongoose from "mongoose";
const flash = require('connect-flash');
import routerAuth from "./src/router/auth";
import products from "./src/router/products";
import flash from "connect-flash"
import session from "express-session"
import passport from './src/middleware/authPassport'
import {CheckOut} from "./src/middleware/checkOut";
import dashboard from "./src/router/dashboard";
import error from "./src/router/error";
mongoose.set('strictQuery', true);

const port = 3000;
const app = express();
const DB_URL = 'mongodb+srv://kenshin:hoangdaica121@cluster0.am5uqky.mongodb.net/ecommerce'

mongoose.connect(DB_URL)
    .then(() => console.log("database ok"))
    .catch(err => console.log("database error: " + err.message));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static( 'public'));
app.use(bodyParser.json());
app.use(flash())
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600 * 60 * 1000}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',routerAuth);
app.use(CheckOut.checkOut)

app.use('/admin/product',products);
app.use('/admin/dashboard', dashboard);
app.use('/error', error);

app.listen(port, () => {
    console.log("app running on port: " + port)
})