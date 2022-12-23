"use strict";
exports.__esModule = true;
var express_1 = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var routerProduct_1 = require("./src/router/admin/routerProduct");
mongoose.set('strictQuery', true);
var port = 3000;
var app = (0, express_1["default"])();
var DB_URL = 'mongodb+srv://kenshin:hoangdaica121@cluster0.am5uqky.mongodb.net/ecommerce';
mongoose.connect(DB_URL)
    .then(function () { return console.log("database ok"); })["catch"](function (err) { return console.log("database error: " + err.message); });
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express_1["default"].static('public'));
app.use(bodyParser.json());
// app.use('/auth',routerAuth);
app.use('/admin/product', routerProduct_1["default"]);
app.get('/admin/dashboard', function (req, res) {
    res.render('admin/home');
});
app.listen(port, function () {
    console.log("app running on port: " + port);
});
