"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
class Error {
    static error500(req, res) {
        res.render('error/500');
    }
    static error404(req, res) {
        res.render('error/404');
    }
}
exports.Error = Error;
//# sourceMappingURL=error.js.map