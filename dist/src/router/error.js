"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_1 = require("../controllers/error");
const error = (0, express_1.Router)();
error.get('/500', error_1.Error.error500);
error.get('/404', error_1.Error.error404);
exports.default = error;
//# sourceMappingURL=error.js.map