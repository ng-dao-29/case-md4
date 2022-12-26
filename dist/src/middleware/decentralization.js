"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decentralization = void 0;
const decentralization = async (req, res, next) => {
    let user = req.user;
    if (user.role === 'admin') {
        next();
    }
    else {
        res.redirect('/error/404');
    }
};
exports.decentralization = decentralization;
//# sourceMappingURL=decentralization.js.map