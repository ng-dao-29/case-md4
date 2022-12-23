"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_1 = require("../controllers/dashboard");
const dashboard = (0, express_1.Router)();
dashboard.get('/home', dashboard_1.Dashboard.showHome);
dashboard.get('/update', dashboard_1.Dashboard.formUpdate);
exports.default = dashboard;
//# sourceMappingURL=dashboard.js.map