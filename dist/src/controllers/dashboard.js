"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
class Dashboard {
    static showHome(req, res) {
        res.render('dashboard/home');
    }
    static formUpdate(req, res) {
        res.render('dashboard/update');
    }
}
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.js.map