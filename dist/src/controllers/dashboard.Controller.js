"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
class Dashboard {
    static showHome(req, res) {
        res.render('product/home');
    }
    static formUpdate(req, res) {
        res.render('product/userUpdate');
    }
}
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.Controller.js.map