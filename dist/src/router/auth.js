"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../controllers/auth");
const authPassport_1 = __importDefault(require("../middleware/authPassport"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const routerAuth = (0, express_1.Router)();
routerAuth.get('/login', auth_1.Auth.formLogin);
routerAuth.post('/login', [upload.none(), authPassport_1.default.authenticate('local', {
        successRedirect: '/admin/dashboard/home',
        failureRedirect: '/auth/login'
    })]);
routerAuth.get('/register', auth_1.Auth.formRegister);
routerAuth.post('/register', upload.none(), auth_1.Auth.register);
routerAuth.get('/logout', auth_1.Auth.logOut);
exports.default = routerAuth;
//# sourceMappingURL=auth.js.map