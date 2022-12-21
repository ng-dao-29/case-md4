"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routerAuth = (0, express_1.Router)();
routerAuth.get('/login', (req, res) => {
    res.render('login');
});
routerAuth.get('/register', (req, res) => {
});
exports.default = routerAuth;
//# sourceMappingURL=routerAuth.js.map