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
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose = __importStar(require("mongoose"));
mongoose.set('strictQuery', true);
const port = 3000;
const app = (0, express_1.default)();
const DB_URL = 'mongodb://127.0.0.1:27017/case_md4';
mongoose.connect(DB_URL)
    .then(() => console.log("database ok"))
    .catch(err => console.log("database error: " + err.message));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.json());
app.get('/admin/dashboard', (req, res) => {
    res.render('admin/home');
});
app.listen(port, () => {
    console.log("app running on port: " + port);
});
//# sourceMappingURL=index.js.map