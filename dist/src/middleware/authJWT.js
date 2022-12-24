"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    try {
        let accessToken = req.body["access_token"];
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, "123654789", (err, decoded) => {
                if (err) {
                    res.send('401').status(401);
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            res.send('No token provided').status(404);
        }
    }
    catch (err) {
        return res.send('401 err').status(401);
    }
};
exports.auth = auth;
//# sourceMappingURL=authJWT.js.map