"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function database(urlDB) {
    mongoose_1.default.connect(urlDB)
        .then(() => console.log("database ok"))
        .catch(err => console.log("database error: " + err.message));
}
exports.default = database;
e;
//# sourceMappingURL=connection.js.map