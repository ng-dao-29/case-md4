"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_Controller_1 = require("../../controllers/dashboard.Controller");
const routerDashboard = (0, express_1.Router)();
routerDashboard.get('/home', dashboard_Controller_1.Dashboard.showHome);
routerDashboard.get('/update', dashboard_Controller_1.Dashboard.formUpdate);
exports.default = routerDashboard;
//# sourceMappingURL=dashboard.js.map