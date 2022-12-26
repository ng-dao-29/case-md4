"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const dashboard = (0, express_1.Router)();
dashboard.get('/home', dashboard_controller_1.Dashboard.showHome);
dashboard.get('/update', dashboard_controller_1.Dashboard.formUpdate);
dashboard.post('/update', upload.single("avatar"), dashboard_controller_1.Dashboard.updateUser);
exports.default = dashboard;
//# sourceMappingURL=dashboard.js.map