"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckOut = void 0;
class CheckOut {
    static checkOut(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            return res.redirect('/auth/login');
        }
    }
}
exports.CheckOut = CheckOut;
//# sourceMappingURL=checkOut.js.map