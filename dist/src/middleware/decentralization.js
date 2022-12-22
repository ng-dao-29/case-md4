"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decentralization = void 0;
const decentralization = async (req, res, next) => {
    let user = req.decoded;
    if (user.role === 'admin') {
        next();
    }
    else {
        res.send('404');
    }
};
exports.decentralization = decentralization;
//# sourceMappingURL=decentralization.js.map