"use strict";
exports.__esModule = true;
var express_1 = require("express");
var routerAuth = (0, express_1.Router)();
routerAuth.get('/login', function (req, res) {
    res.render('login');
});
routerAuth.get('/register', function (req, res) {
});
exports["default"] = routerAuth;
