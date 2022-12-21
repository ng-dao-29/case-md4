import express from "express";
import bodyParser from "body-parser";
import * as mongoose from "mongoose";
import routerAuth from "./src/router/routerAuth";
import routerProduct from "./src/router/admin/routerProduct";
mongoose.set('strictQuery', true);

const port = 3000;
const app = express();
const DB_URL = 'mongodb://127.0.0.1:27017/case_md4'

mongoose.connect(DB_URL)
    .then(() => console.log("database ok"))
    .catch(err => console.log("database error: " + err.message));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static( 'public'));

app.use(bodyParser.json());
// app.use('/auth',routerAuth);
app.use('/admin/product',routerProduct);

app.get('/admin/dashboard', (req, res) => {
    res.render('admin/home')
})


app.listen(port, () => {
    console.log("app running on port: " + port)
})