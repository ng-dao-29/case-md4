"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require("body-parser");
const mongoose = __importStar(require("mongoose"));
const flash = require('connect-flash');
const auth_1 = __importDefault(require("./src/router/auth"));
const products_1 = __importDefault(require("./src/router/products"));
const express_session_1 = __importDefault(require("express-session"));
const authPassport_1 = __importDefault(require("./src/middleware/authPassport"));
const checkOut_1 = require("./src/middleware/checkOut");
const dashboard_1 = __importDefault(require("./src/router/dashboard"));
const error_1 = __importDefault(require("./src/router/error"));
mongoose.set('strictQuery', true);
const port = 3000;
const app = (0, express_1.default)();
const DB_URL = 'mongodb+srv://kenshin:hoangdaica121@cluster0.am5uqky.mongodb.net/ecommerce';
mongoose.connect(DB_URL)
    .then(() => console.log("database ok"))
    .catch(err => console.log("database error: " + err.message));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express_1.default.static('public'));
app.use(bodyParser.json());
app.use(flash());
app.use((0, express_session_1.default)({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600 * 60 * 1000 }
}));
app.use(authPassport_1.default.initialize());
app.use(authPassport_1.default.session());
app.use('/auth', auth_1.default);
app.use(checkOut_1.CheckOut.checkOut);
app.use('/admin/product', products_1.default);
app.use('/admin/dashboard', dashboard_1.default);
app.use('/error', error_1.default);
app.listen(port, () => {
    console.log("app running on port: " + port);
});
//# sourceMappingURL=index.js.map