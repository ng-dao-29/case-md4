import express from "express";
const bodyParser = require("body-parser");
import * as mongoose from "mongoose";
import routerProduct from "./src/router/admin/routerProduct";
const flash = require('connect-flash');
const session = require('express-session');

const port = 3000;
const app = express();

const DB_URL = 'mongodb+srv://kenshin:hoangdaica121@cluster0.am5uqky.mongodb.net/ecommerce'
mongoose.set('strictQuery', true);
mongoose.connect(DB_URL)
    .then(() => console.log("database ok"))
    .catch(err => console.log("database error: " + err.message));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(flash());
app.use(session({
    cookie: {maxAge: 60000},
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}))

app.use(bodyParser.json());

app.use('/admin/products', routerProduct);
app.get('/admin/dashboard', (req, res) => {
    res.render('admin/home')
})

app.listen(port, () => {
    console.log("app running on port: " + port)
})